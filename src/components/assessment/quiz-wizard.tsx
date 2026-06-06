"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  assessmentQuestions,
  getQuestionSequence,
  calculateRecommendation,
} from "@/lib/assessment-data";
import type { Answers, AssessmentQuestion } from "@/lib/assessment-data";
import { QuestionCard } from "./question-card";

const AUTO_ADVANCE_DELAY = 300;

export function QuizWizard() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Build dynamic question sequence based on current answers
  const sequence: AssessmentQuestion[] = useMemo(() => {
    return getQuestionSequence(answers);
  }, [answers]);

  const total = sequence.length;
  const question = sequence[currentIndex];
  const selectedValue = question ? answers[question.id] : undefined;

  const finishQuiz = useCallback(
    (finalAnswers: Answers) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("kjzl-assessment-answers", JSON.stringify(finalAnswers));
        const results = calculateRecommendation(finalAnswers);
        localStorage.setItem("kjzl-assessment-results", JSON.stringify(results));
      }
      router.push("/assessment/result");
    },
    [router]
  );

  const advance = useCallback(
    (updatedAnswers: Answers, fromIndex: number) => {
      // Recompute sequence with latest answers
      const seq = getQuestionSequence(updatedAnswers);
      const isLast = fromIndex >= seq.length - 1;

      if (isLast) {
        finishQuiz(updatedAnswers);
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(fromIndex + 1);
          setIsTransitioning(false);
        }, 150);
      }
    },
    [finishQuiz]
  );

  const handleSelect = useCallback(
    (value: string) => {
      const updated = { ...answers, [question.id]: value };

      // If user changes supply-chain away from have-supplier/own-product, clear product-type
      if (question.id === "supply-chain" && !["have-supplier", "own-product"].includes(value)) {
        delete updated["product-type"];
      }

      setAnswers(updated);

      setTimeout(() => {
        advance(updated, currentIndex);
      }, AUTO_ADVANCE_DELAY);
    },
    [answers, question, currentIndex, advance]
  );

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((i) => i - 1);
        setIsTransitioning(false);
      }, 150);
    }
  }, [currentIndex]);

  if (!question) return null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 sm:px-12">
      <div
        className={`mx-auto w-full max-w-xl transition-opacity duration-150 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Progress */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between" style={{ fontSize: "15px", color: "#525252" }}>
            <span>第 {currentIndex + 1}/{total} 题</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question header */}
        <div className="mb-10 space-y-3 animate-slide-up-fade">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: "#0a0a0a", letterSpacing: "0.01em" }}>
            {question.title}
          </h1>
          <p style={{ fontSize: "17px", color: "#525252", lineHeight: 1.6 }}>{question.subtitle}</p>
        </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <QuestionCard
                key={option.value}
                option={option}
                selected={selectedValue === option.value}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Back button */}
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-6 flex items-center gap-1.5 transition-colors hover:text-foreground"
              style={{ fontSize: "15px", color: "#737373" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              上一题
            </button>
          )}
      </div>
    </main>
  );
}
