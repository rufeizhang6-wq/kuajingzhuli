import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { temuGuide } from "@/lib/guide-data-temu";
import { StepPageClient } from "@/components/guide/step-page-client";

interface PageProps {
  params: Promise<{ step: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step: stepId } = await params;
  const step = temuGuide.steps.find((s) => s.id === stepId);
  if (!step) return { title: "步骤未找到" };
  return {
    title: `${step.title} — Temu全托管开店引导`,
    description: `Temu开店 · 第${stepId}步：${step.title}`,
  };
}

export function generateStaticParams() {
  return temuGuide.steps.map((s) => ({ step: s.id }));
}

export default async function TemuStepPage({ params }: PageProps) {
  const { step: stepId } = await params;
  const stepIndex = temuGuide.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) notFound();
  const step = temuGuide.steps[stepIndex];

  return <StepPageClient path={temuGuide} step={step} stepIndex={stepIndex} />;
}
