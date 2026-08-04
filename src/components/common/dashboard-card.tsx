import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; positive: boolean };
  iconBgClass?: string;
  iconColorClass?: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconBgClass = "bg-cosmic-purple/20",
  iconColorClass = "text-electric-blue",
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-card-bg p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-text">{title}</p>
          <p className="text-3xl font-bold text-soft-white">{value}</p>
          {description && (
            <p className="text-xs text-muted-text">{description}</p>
          )}
          {trend && (
            <p
              className={`flex items-center gap-1 text-xs font-medium ${
                trend.positive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span>{trend.positive ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={cn("rounded-lg p-3", iconBgClass)}>
          <Icon className={cn("h-5 w-5", iconColorClass)} />
        </div>
      </div>
    </div>
  );
}
