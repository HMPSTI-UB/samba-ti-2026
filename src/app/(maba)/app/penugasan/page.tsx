"use client";

import TaskList from "./_components/task-list";

export default function MabaPenugasanPage() {
  return (
    <div className="space-y-6">
      <div className="border border-white rounded-2xl p-6 relative bg-gradient-to-br from-background to-background/50 flex flex-col justify-center min-h-[140px]">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-electric-blue via-cosmic-purple to-supernova-orange bg-clip-text text-transparent">
            Penugasan
          </span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300 font-medium">
          Selesaikan tugasmu sebelum deadline dan raih ZENITH 2026!
        </p>
      </div>
      <TaskList />
    </div>
  );
}