import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { amazonGuide } from "@/lib/guide-data-amazon";
import { StepPageClient } from "@/components/guide/step-page-client";

interface PageProps {
  params: Promise<{ step: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step: stepId } = await params;
  const step = amazonGuide.steps.find((s) => s.id === stepId);
  if (!step) return { title: "步骤未找到" };
  return {
    title: `${step.title} — Amazon开店引导`,
    description: `Amazon开店 · 第${stepId}步：${step.title}`,
  };
}

export function generateStaticParams() {
  return amazonGuide.steps.map((s) => ({ step: s.id }));
}

export default async function AmazonStepPage({ params }: PageProps) {
  const { step: stepId } = await params;
  const stepIndex = amazonGuide.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) notFound();
  const step = amazonGuide.steps[stepIndex];

  return <StepPageClient path={amazonGuide} step={step} stepIndex={stepIndex} />;
}
