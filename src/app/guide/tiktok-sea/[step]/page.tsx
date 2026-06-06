import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tiktokSeaGuide } from "@/lib/guide-data-sea";
import { StepPageClient } from "@/components/guide/step-page-client";

interface PageProps {
  params: Promise<{ step: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step: stepId } = await params;
  const step = tiktokSeaGuide.steps.find((s) => s.id === stepId);
  if (!step) return { title: "步骤未找到" };
  return {
    title: `${step.title} — 东南亚开店引导`,
    description: `TikTok东南亚开店 · 第${stepId}步：${step.title}`,
  };
}

export function generateStaticParams() {
  return tiktokSeaGuide.steps.map((s) => ({ step: s.id }));
}

export default async function SeaStepPage({ params }: PageProps) {
  const { step: stepId } = await params;
  const stepIndex = tiktokSeaGuide.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) notFound();
  const step = tiktokSeaGuide.steps[stepIndex];

  return <StepPageClient path={tiktokSeaGuide} step={step} stepIndex={stepIndex} />;
}
