import type { IconType } from "react-icons";
import { cn } from "@/lib/cn";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: IconType;
  description?: string;
  progress?: number;
  iconBgClass?: string;
  iconColorClass?: string;
  progressClass?: string;
  variant?: "stacked" | "inline";
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  progress,
  iconColorClass = "text-electric-blue",
  progressClass = "bg-supernova-orange",
  variant = "stacked",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-white bg-background/50 p-4 flex flex-col justify-between h-full gap-3 relative overflow-hidden transition-colors hover:border-white">
      {variant === "inline" ? (
        <div className="flex flex-col h-full justify-between">
          <p className="text-[11px] uppercase tracking-wider font-medium text-slate-400">{title}</p>
          <div className="flex items-end justify-between mt-2">
            <span className="text-5xl font-black text-white">{value}</span>
            <Icon className={cn("h-10 w-10 shrink-0", iconColorClass)} />
          </div>
          {progress !== undefined && (
            <div className="mt-4 w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-700 ease-out", progressClass)}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Icon className={cn("h-8 w-8 mb-3", iconColorClass)} />
          <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400 leading-tight">{title}</p>
          <p className="text-4xl font-black text-white mt-1">{value}</p>
        </div>
      )}
    </div>
  );
}