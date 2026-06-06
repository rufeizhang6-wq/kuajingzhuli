import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopeeGuide } from "@/lib/guide-data-shopee";
import { StepPageClient } from "@/components/guide/step-page-client";

interface PageProps {
  params: Promise<{ step: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { step: stepId } = await params;
  const step = shopeeGuide.steps.find((s) => s.id === stepId);
  if (!step) return { title: "步骤未找到" };
  return {
    title: `${step.title} — Shopee开店引导`,
    description: `Shopee开店 · 第${stepId}步：${step.title}`,
  };
}

export function generateStaticParams() {
  return shopeeGuide.steps.map((s) => ({ step: s.id }));
}

export default async function ShopeeStepPage({ params }: PageProps) {
  const { step: stepId } = await params;
  const stepIndex = shopeeGuide.steps.findIndex((s) => s.id === stepId);
  if (stepIndex === -1) notFound();
  const step = shopeeGuide.steps[stepIndex];

  return <StepPageClient path={shopeeGuide} step={step} stepIndex={stepIndex} />;
}
