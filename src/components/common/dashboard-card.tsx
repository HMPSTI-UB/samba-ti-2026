import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; positive: boolean };
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {description && (
            <p className="text-xs text-slate-400">{description}</p>
          )}
          {trend && (
            <p
              className={`flex items-center gap-1 text-xs font-medium ${
                trend.positive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <span>{trend.positive ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="rounded-lg bg-cosmic-purple/10 p-3">
          <Icon className="h-5 w-5 text-cosmic-purple" />
        </div>
      </div>
    </div>
  );
}
