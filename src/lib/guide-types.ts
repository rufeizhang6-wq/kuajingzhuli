/**
 * 引导路径类型定义
 *
 * 核心概念：
 *   - GuidePath: 一条完整路径（东南亚10步 / 美区14步）
 *   - GuideStep: 路径中的一步（如"办执照"）
 *   - Operation: 步骤内的子操作，分两种：
 *     - action: 具体操作（带内容和确认勾选）
 *     - decision: 选择点（用户选一个分支，展开对应后续操作）
 */

export interface GuidePath {
  id: "tiktok-sea" | "tiktok-us" | "shopee" | "temu" | "amazon";
  name: string;
  description: string;
  totalSteps: number;
  estimatedDuration: string;
  steps: GuideStep[];
}

export interface GuideStep {
  id: string;
  title: string;
  estimatedTime: string;
  completionCriteria: string;
  preparations: PreparationItem[];
  operations: Operation[];
  warnings: string[];
}

export interface PreparationItem {
  text: string;
  note?: string;
}

export interface Operation {
  id: string;
  title: string;
  estimatedTime: string;
  type: "action" | "decision";

  // type="action"
  content?: string;
  confirmText?: string;

  // type="decision"
  options?: DecisionOption[];
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  followUpOperations: Operation[];
}

// ============ localStorage progress ============

export interface GuideProgress {
  pathId: "tiktok-sea" | "tiktok-us" | "shopee" | "temu" | "amazon";
  decisions: Record<string, string>;
  completed: string[];
  currentStep: string;
}

const PROGRESS_KEY_PREFIX = "kjzl-guide-";

function getKey(pathId: string): string {
  return PROGRESS_KEY_PREFIX + pathId;
}

export function loadProgress(pathId: string): GuideProgress {
  if (typeof window === "undefined") {
    return { pathId: pathId as GuideProgress["pathId"], decisions: {}, completed: [], currentStep: "1" };
  }
  try {
    const raw = localStorage.getItem(getKey(pathId));
    if (raw) return JSON.parse(raw);
  } catch {}
  return { pathId: pathId as GuideProgress["pathId"], decisions: {}, completed: [], currentStep: "1" };
}

export function saveProgress(progress: GuideProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(progress.pathId), JSON.stringify(progress));
}

/**
 * Flatten a step's operations into the effective sequence,
 * resolving decision points based on user's stored decisions.
 */
export function resolveOperations(
  step: GuideStep,
  decisions: Record<string, string>
): Operation[] {
  const result: Operation[] = [];

  for (const op of step.operations) {
    result.push(op);

    if (op.type === "decision" && op.options) {
      const selectedId = decisions[op.id];
      if (selectedId) {
        const selected = op.options.find((o) => o.id === selectedId);
        if (selected) {
          // Recursively resolve follow-up operations (they may contain nested decisions)
          for (const followUp of selected.followUpOperations) {
            result.push(followUp);
            if (followUp.type === "decision" && followUp.options) {
              const nestedSelectedId = decisions[followUp.id];
              if (nestedSelectedId) {
                const nestedSelected = followUp.options.find((o) => o.id === nestedSelectedId);
                if (nestedSelected) {
                  result.push(...nestedSelected.followUpOperations);
                }
              }
            }
          }
        }
      }
    }
  }

  return result;
}

/**
 * Count total confirmable operations in a resolved sequence.
 */
export function countConfirmable(ops: Operation[]): number {
  return ops.filter((op) => op.type === "action" && op.confirmText).length;
}

/**
 * Count completed confirmable operations.
 */
export function countCompleted(ops: Operation[], completed: string[]): number {
  return ops.filter((op) => op.type === "action" && op.confirmText && completed.includes(op.id)).length;
}
