"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/cn";
import { getMe } from "@/lib/api/auth";
import { useUserStore } from "@/stores/user.store";
import { getUnreadCount } from "@/features/pengumuman/api/announcements";
import AppSidebar from "./app-sidebar";
import Topbar from "./topbar";
import PostLoginAlert from "../common/post-login-alert";
import type { DashboardNavItem } from "@/constant/dashboard-nav";

export default function AppShell({
  children,
  navItems,
  contentClassName,
}: {
  children: React.ReactNode;
  navItems: DashboardNavItem[];
  contentClassName?: string;
}) {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        if (res.success) setUser(res.data);
      })
      .catch(() => {});
  }, [setUser]);

  const { data: unreadData } = useQuery({
    queryKey: ["announcements", "unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30_000,
  });
  const unreadCount = unreadData?.data?.unreadCount ?? 0;

  return (
    <div className="flex h-screen overflow-hidden bg-deep-space font-poppins" data-lenis-prevent>
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} navItems={navItems} unreadCount={unreadCount} />

      <main className="flex flex-1 flex-col overflow-hidden p-3 pl-0 md:pl-3">
        <div className={cn("flex flex-1 flex-col overflow-hidden rounded-2xl", contentClassName)}>
          <div className="flex-none p-3">
            <Topbar onOpenSidebar={() => setSidebarOpen(true)} unreadCount={unreadCount} />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl p-8">
            {user ? children : null}
          </div>
        </div>
      </main>

      <PostLoginAlert />
    </div>
  );
}
