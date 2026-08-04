import Link from "next/link";
import { FaBell } from "react-icons/fa6";
import type { MabaDashboardTask } from "@/features/maba/api/dashboard";
import { cn } from "@/lib/cn";

type QuickActionsProps = {
  tasks: MabaDashboardTask[];
};

const CARD_COLORS = [
  "from-red-600 to-red-900 border-red-500",
  "from-orange-500 to-orange-800 border-orange-500",
  "from-purple-600 to-purple-900 border-purple-500",
];

export default function QuickActions({ tasks }: QuickActionsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x pr-4 custom-scrollbar">
      {tasks.length === 0 ? (
        <p className="text-sm text-slate-400 py-4">Belum ada tugas terdekat.</p>
      ) : (
        tasks.map((task, index) => {
          const colorClass = CARD_COLORS[index % CARD_COLORS.length];
          return (
            <div
              key={task.id}
              className={cn(
                "min-w-[220px] max-w-[260px] shrink-0 snap-start rounded-2xl border p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b shadow-lg transition-transform hover:-translate-y-1",
                colorClass
              )}
            >
              {/* Decorative Icon */}
              <div className="absolute top-4 right-4 opacity-50">
                <FaBell className="h-5 w-5 text-white" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <h3 className="font-bold text-white text-sm leading-snug pr-6 min-h-[40px]">
                  {task.title}
                </h3>
                
                <div className="space-y-0.5">
                  <p className="text-[10px] text-white/70">Deadline</p>
                  <p className="text-xs font-bold text-white">
                    {new Date(task.deadline).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <Link
                href="/app/penugasan"
                className="mt-6 w-full py-2 bg-black/40 hover:bg-black/60 transition-colors rounded-lg text-xs font-bold text-white text-center inline-block backdrop-blur-sm"
              >
                Kerjakan
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}