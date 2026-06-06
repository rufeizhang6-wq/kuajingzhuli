import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tiktokUsGuide } from "@/lib/guide-data-us";
import { StepPageClient } from "@/components/guide/step-page-client";

interface PageProps {
  params: Promise<{ step: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step: stepId } = await params;
  const step = tiktokUsGuide.steps.find((s) => s.id === stepId);
  if (!step) return { title: "步骤未找到" };
  return {
    title: `${step.title} — 美区开店引导`,
    description: `TikTok美区开店 · 第${stepId}步：${step.title}`,
  };
}

export function generateStaticParams() {
  return tiktokUsGuide.steps.map((s) => ({ step: s.id }));
}

export default async function UsStepPage({ params }: PageProps) {
  const { step: stepId } = await params;
  const stepIndex = tiktokUsGuide.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) notFound();
  const step = tiktokUsGuide.steps[stepIndex];

  return <StepPageClient path={tiktokUsGuide} step={step} stepIndex={stepIndex} />;
}
