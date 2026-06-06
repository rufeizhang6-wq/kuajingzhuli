"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Target, AlertTriangle } from "lucide-react";
import type { GuideStep, GuidePath } from "@/lib/guide-types";
import { resolveOperations, loadProgress, saveProgress, countConfirmable, countCompleted } from "@/lib/guide-types";
import { PreparationList } from "./preparation-list";
import { OperationCard } from "./operation-card";
import { RiskAlert } from "./risk-alert";
import { Footer } from "@/components/layout/footer";

interface StepPageClientProps {
  path: GuidePath;
  step: GuideStep;
  stepIndex: number;
}

export function StepPageClient({ path, step, stepIndex }: StepPageClientProps) {
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<string[]>([]);
  const [expandedOp, setExpandedOp] = useState<string | null>(null);

  useEffect(() => {
    const progress = loadProgress(path.id);
    setDecisions(progress.decisions);
    setCompleted(progress.completed);
  }, [path.id]);

  const resolvedOps = resolveOperations(step, decisions);

  useEffect(() => {
    if (!expandedOp) {
      const firstIncomplete = resolvedOps.find(
        (op) => (op.type === "action" && op.confirmText && !completed.includes(op.id)) ||
                (op.type === "decision" && !decisions[op.id])
      );
      setExpandedOp(firstIncomplete?.id ?? resolvedOps[0]?.id ?? null);
    }
  }, [resolvedOps, completed, decisions, expandedOp]);

  const persist = useCallback(
    (newDecisions: Record<string, string>, newCompleted: string[]) => {
      saveProgress({ pathId: path.id, decisions: newDecisions, completed: newCompleted, currentStep: step.id });
    },
    [path.id, step.id]
  );

  const handleDecision = useCallback(
    (operationId: string, optionId: string) => {
      const updated = { ...decisions, [operationId]: optionId };
      setDecisions(updated);
      setExpandedOp(null);
      persist(updated, completed);
    },
    [decisions, completed, persist]
  );

  const handleConfirm = useCallback(
    (operationId: string) => {
      let updated: string[];
      if (completed.includes(operationId)) {
        updated = completed.filter((id) => id !== operationId);
      } else {
        updated = [...completed, operationId];
      }
      setCompleted(updated);
      persist(decisions, updated);

      if (!completed.includes(operationId)) {
        const currentIdx = resolvedOps.findIndex((op) => op.id === operationId);
        const next = resolvedOps.slice(currentIdx + 1).find(
          (op) => (op.type === "action" && op.confirmText && !updated.includes(op.id)) ||
                  (op.type === "decision" && !decisions[op.id])
        );
        if (next) setExpandedOp(next.id);
      }
    },
    [completed, decisions, resolvedOps, persist]
  );

  const confirmableCount = countConfirmable(resolvedOps);
  const completedCount = countCompleted(resolvedOps, completed);
  const allDone = confirmableCount > 0 && completedCount === confirmableCount;
  const pendingDecisions = resolvedOps.filter((op) => op.type === "decision" && !decisions[op.id]);
  const canProceed = allDone && pendingDecisions.length === 0;

  const prevStep = stepIndex > 0 ? path.steps[stepIndex - 1] : null;
  const nextStep = stepIndex < path.steps.length - 1 ? path.steps[stepIndex + 1] : null;

  let opDisplayIndex = 0;

  return (
    <>
      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-lg space-y-6">
          {/* Back link */}
          <Link
            href={`/guide/${path.id}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            style={{ fontSize: "15px", color: "#737373" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回步骤总览
          </Link>

          {/* Step header */}
          <div className="space-y-3">
            <p style={{ fontSize: "13px", color: "#737373" }}>
              步骤{stepIndex + 1}/{path.totalSteps}
            </p>
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>
              {step.title}
            </h1>
            <div className="flex items-center gap-3" style={{ fontSize: "15px", color: "#737373" }}>
              <span>⏱ {step.estimatedTime}</span>
              {confirmableCount > 0 && (
                <span>{completedCount}/{confirmableCount} 项已完成</span>
              )}
            </div>

            {/* Progress bar */}
            {confirmableCount > 0 && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(completedCount / confirmableCount) * 100}%` }}
                />
              </div>
            )}

            {/* Completion criteria */}
            <div className="flex items-start gap-2 rounded-xl bg-accent/50 p-3">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-medium" style={{ fontSize: "13px", color: "#737373" }}>完成条件</p>
                <p style={{ fontSize: "15px", color: "#404040" }}>{step.completionCriteria}</p>
              </div>
            </div>
          </div>

          {/* Preparations */}
          <PreparationList items={step.preparations} />

          {/* Operations */}
          {resolvedOps.length > 0 && (
            <div className="space-y-3">
              {resolvedOps.map((op) => {
                const displayIdx = opDisplayIndex++;
                return (
                  <OperationCard
                    key={op.id}
                    operation={op}
                    index={displayIdx}
                    total={resolvedOps.length}
                    isCompleted={completed.includes(op.id)}
                    isExpanded={expandedOp === op.id}
                    selectedDecision={decisions[op.id]}
                    onToggle={() => setExpandedOp(expandedOp === op.id ? null : op.id)}
                    onConfirm={handleConfirm}
                    onDecision={handleDecision}
                  />
                );
              })}
            </div>
          )}

          {/* Placeholder for empty steps */}
          {resolvedOps.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center">
              <p style={{ fontSize: "15px", color: "#737373" }}>这一步的内容正在编写中</p>
            </div>
          )}

          {/* Warnings */}
          {step.warnings.length > 0 && (
            <RiskAlert title="注意事项">
              <ul className="space-y-1.5">
                {step.warnings.map((w) => (
                  <li key={w} className="flex items-start gap-1.5">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </RiskAlert>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {prevStep ? (
              <Link
                href={`/guide/${path.id}/${prevStep.id}`}
                className="flex flex-1 items-center gap-2 rounded-xl border border-border p-3 transition-colors hover:bg-muted"
                style={{ fontSize: "15px" }}
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <p style={{ fontSize: "13px", color: "#737373" }}>上一步</p>
                  <p className="truncate font-medium" style={{ color: "#0a0a0a" }}>{prevStep.title}</p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextStep ? (
              canProceed ? (
                <Link
                  href={`/guide/${path.id}/${nextStep.id}`}
                  className="flex flex-1 items-center justify-end gap-2 rounded-xl bg-primary p-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  style={{ fontSize: "15px" }}
                >
                  <div className="min-w-0 text-right">
                    <p className="text-primary-foreground/70" style={{ fontSize: "13px" }}>下一步</p>
                    <p className="truncate">{nextStep.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              ) : (
                <div className="flex flex-1 items-center justify-end gap-2 rounded-xl border border-border/60 bg-muted/30 p-3 cursor-not-allowed" style={{ fontSize: "15px", color: "#a3a3a3" }}>
                  <div className="min-w-0 text-right">
                    <p style={{ fontSize: "13px" }}>完成所有操作后解锁</p>
                    <p className="truncate font-medium">{nextStep.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </div>
              )
            ) : canProceed ? (
              /* Last step completed — congratulations */
              <div className="flex-1 space-y-4">
                <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6 text-center space-y-3">
                  <p className="text-3xl">🎉</p>
                  <h3 className="text-lg font-medium text-green-800">你的店铺已经开好了！</h3>
                  <p className="text-green-700" style={{ fontSize: "15px" }}>
                    下一步前往「运营学堂」，学习选品上架
                  </p>
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    style={{ fontSize: "15px" }}
                  >
                    进入运营学堂
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                href={`/guide/${path.id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary p-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                style={{ fontSize: "15px" }}
              >
                返回步骤总览
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
