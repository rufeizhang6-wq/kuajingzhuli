import type { Metadata } from "next";
import { QuizWizard } from "@/components/assessment/quiz-wizard";

export const metadata: Metadata = {
  title: "适配测评",
  description: "花2分钟回答几个问题，找到最适合你的跨境电商平台。",
};

export default function AssessmentPage() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-neutral-50/50">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 20%, transparent 40%, rgb(252,252,252) 100%)",
        }}
      />
      <div className="relative">
        <QuizWizard />
      </div>
    </div>
  );
}
