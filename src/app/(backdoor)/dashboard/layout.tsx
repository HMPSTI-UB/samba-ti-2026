"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { getMe } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user.store";
import { ROLE_ROUTES } from "@/constant/roles";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
      getMe()
        .then((res) => {
          if (res.success) setUser(res.data);
        })
        .catch(() => {});
      return;
    }

    getMe()
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && user) {
      const role = user.role.toLowerCase();
      if (role === "mahasiswa") {
        router.replace(ROLE_ROUTES.mahasiswa);
      }
    }
  }, [loading, user, router]);

  if (loading && !user) {
    return (
      <div className="flex h-screen">
        <div className="w-60 animate-pulse bg-deep-space max-md:hidden" />
        <main className="flex-1 animate-pulse bg-slate-100 p-6" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className={cn(
        "flex-1 overflow-y-auto bg-white text-slate-900 p-6 transition-all duration-300",
        sidebarOpen && "max-md:translate-x-60",
      )}>
        {!sidebarOpen && (
          <div className="mb-6 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
