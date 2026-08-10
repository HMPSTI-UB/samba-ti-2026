import Link from "next/link";
import { Star, Users, ArrowRight } from "lucide-react";
import type { PublicCluster } from "@/features/clusters/types";

export default function ClusterCard({ cluster }: { cluster: PublicCluster }) {
  return (
    <Link
      href={`/clusters/${cluster.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#B95C00]/25 bg-gradient-to-b from-[#3A1E0F] to-[#241007] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B95C00]/50 hover:shadow-[0_12px_32px_rgba(185,92,0,0.18)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#EFA15B]/10 blur-2xl transition-all duration-300 group-hover:bg-[#EFA15B]/25" />

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#B95C00]/30 bg-[#B95C00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EFA15B]">
        <Star size={12} className="fill-current" />
        Cluster {cluster.clusterNumber ?? "?"}
      </span>

      <h3 className="mt-5 text-2xl font-sonsie italic leading-snug text-[#B95C00]">
        {cluster.name}
      </h3>

      {cluster.clusterMeaning && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70">
          {cluster.clusterMeaning}
        </p>
      )}

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-[#B95C00]/15 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50">
            <Users size={14} />
            {cluster.memberCount ?? 0} anggota
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B95C00]/15 px-4 py-2 text-xs font-bold text-[#EFA15B] transition-all duration-300 group-hover:bg-[#B95C00]/30 group-hover:gap-2.5">
            Lihat Detail
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
