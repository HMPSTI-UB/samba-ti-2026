import Link from "next/link";
import { cn } from "@/lib/cn";
import type { DashboardNavItem } from "@/constant/dashboard-nav";

export default function NavItem({
  item,
  isActive,
  badge,
  onNavigate,
}: {
  item: DashboardNavItem;
  isActive: boolean;
  badge?: number;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex h-[42px] items-center gap-3 rounded-xl px-3.5 text-sm text-soft-white transition-all duration-200",
        isActive
          ? "bg-sun-gold font-semibold text-black shadow-md shadow-sun-gold/30"
          : "hover:translate-x-1 hover:bg-white/6 hover:text-white",
      )}
    >
      <item.icon
        size={20}
        className={cn("shrink-0", !isActive && "text-muted-text group-hover:text-soft-white")}
      />
      <span className="md:hidden lg:inline">{item.label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={cn(
            "ml-auto hidden h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white md:hidden lg:flex",
            isActive && "bg-black/20 text-black",
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}
