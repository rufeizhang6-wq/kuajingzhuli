"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isStepCompleted,
  completeStep,
  uncompleteStep,
  getChecklistState,
  toggleChecklistItem,
  getStageCompletionCount,
  getAllCompletedSteps,
} from "@/lib/progress";

/** Hook: track a single step's completion and checklist */
export function useStepProgress(stepId: string, checklistLength: number) {
  const [completed, setCompleted] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>([]);

  useEffect(() => {
    setCompleted(isStepCompleted(stepId));
    setChecklist(getChecklistState(stepId, checklistLength));
  }, [stepId, checklistLength]);

  const toggleComplete = useCallback(() => {
    if (completed) {
      uncompleteStep(stepId);
      setCompleted(false);
    } else {
      completeStep(stepId);
      setCompleted(true);
    }
  }, [stepId, completed]);

  const toggleItem = useCallback(
    (index: number) => {
      const updated = toggleChecklistItem(stepId, index, checklistLength);
      setChecklist(updated);
    },
    [stepId, checklistLength]
  );

  return { completed, toggleComplete, checklist, toggleItem };
}

/** Hook: track stage-level completion counts */
export function useStageProgress(stepIds: string[]) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(getStageCompletionCount(stepIds));
  }, [stepIds]);

  // Re-read on focus (user may have changed progress on another step page)
  useEffect(() => {
    const handleFocus = () => setCompletedCount(getStageCompletionCount(stepIds));
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [stepIds]);

  return { completedCount, total: stepIds.length };
}

/** Hook: get all completed step IDs */
export function useAllProgress() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    setCompletedSteps(getAllCompletedSteps());
  }, []);

  useEffect(() => {
    const handleFocus = () => setCompletedSteps(getAllCompletedSteps());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return completedSteps;
}
