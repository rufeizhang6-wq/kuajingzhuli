/**
 * localStorage 进度管理
 *
 * 存储 key: "kjzl-progress"
 * 记录每个步骤的完成状态和检查清单勾选状态
 */

const STORAGE_KEY = "kjzl-progress";

export interface ProgressData {
  completedSteps: string[];
  checklistState: Record<string, boolean[]>;
  lastVisit: string;
}

function getDefault(): ProgressData {
  return {
    completedSteps: [],
    checklistState: {},
    lastVisit: new Date().toISOString(),
  };
}

function read(): ProgressData {
  if (typeof window === "undefined") return getDefault();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefault();
    return JSON.parse(raw) as ProgressData;
  } catch {
    return getDefault();
  }
}

function write(data: ProgressData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    lastVisit: new Date().toISOString(),
  }));
}

/** Check if a step is completed */
export function isStepCompleted(stepId: string): boolean {
  return read().completedSteps.includes(stepId);
}

/** Mark step as completed */
export function completeStep(stepId: string): void {
  const data = read();
  if (!data.completedSteps.includes(stepId)) {
    write({ ...data, completedSteps: [...data.completedSteps, stepId] });
  }
}

/** Unmark step as completed */
export function uncompleteStep(stepId: string): void {
  const data = read();
  write({
    ...data,
    completedSteps: data.completedSteps.filter((id) => id !== stepId),
  });
}

/** Get checklist state for a step */
export function getChecklistState(stepId: string, length: number): boolean[] {
  const data = read();
  const stored = data.checklistState[stepId];
  if (stored && stored.length === length) return stored;
  return Array(length).fill(false);
}

/** Toggle a checklist item */
export function toggleChecklistItem(stepId: string, index: number, totalLength: number): boolean[] {
  const data = read();
  const current = data.checklistState[stepId] ?? Array(totalLength).fill(false);
  const updated = current.map((v, i) => (i === index ? !v : v));
  write({
    ...data,
    checklistState: { ...data.checklistState, [stepId]: updated },
  });
  return updated;
}

/** Get count of completed steps for a stage */
export function getStageCompletionCount(stepIds: string[]): number {
  const data = read();
  return stepIds.filter((id) => data.completedSteps.includes(id)).length;
}

/** Get all completed steps */
export function getAllCompletedSteps(): string[] {
  return read().completedSteps;
}

/** Reset all progress */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
