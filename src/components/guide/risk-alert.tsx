import { AlertTriangle } from "lucide-react";

interface RiskAlertProps {
  children: React.ReactNode;
  title?: string;
}

export function RiskAlert({ children, title = "风险提示" }: RiskAlertProps) {
  return (
    <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
        <div className="space-y-1">
          <p className="font-medium text-warning-foreground" style={{ fontSize: "15px" }}>{title}</p>
          <div className="text-warning-foreground/80" style={{ fontSize: "15px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
