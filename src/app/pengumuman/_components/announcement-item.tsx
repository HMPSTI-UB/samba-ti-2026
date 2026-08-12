import { Clock, Megaphone } from "lucide-react";
import type { PublicAnnouncement } from "@/features/pengumuman/types";

export default function AnnouncementItem({ item }: { item: PublicAnnouncement }) {
  return (
    <article className="rounded-2xl border border-[#2DD4BF]/30 bg-[#0B3C42] p-6 shadow-[0_0_30px_rgba(45,212,191,0.1)] transition-all hover:border-[#2DD4BF]/60">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2DD4BF]/40 bg-[#2DD4BF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">
          <Megaphone size={12} />
          {item.targetType === "MABA" ? "MABA" : "Umum"}
        </span>
        <span className="flex items-center gap-1 text-xs text-white/50">
          <Clock size={12} />
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <h3 className="mt-4 font-poppins text-lg font-bold leading-snug text-soft-white md:text-xl">
        {item.title}
      </h3>

      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/80">
        {item.desc}
      </p>
    </article>
  );
}
