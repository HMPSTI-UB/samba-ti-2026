import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import type { PublicCluster } from "@/features/clusters/types";

export default function ClusterCard({ cluster }: { cluster: PublicCluster }) {
  return (
    <Link
      href={`/clusters/${cluster.slug}`}
      className="group relative flex aspect-square flex-col overflow-hidden rounded-[22px] border-2 border-[#2DD4BF]/70 bg-[#0B3C42] p-7 md:p-8 shadow-[0_0_30px_rgba(45,212,191,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2DD4BF] hover:shadow-[0_0_40px_rgba(45,212,191,0.28)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.12),transparent_60%)]" />

      <span className="text-xs font-bold uppercase tracking-widest text-white/90 md:text-sm">
        Cluster {cluster.clusterNumber ?? "?"}
      </span>

      <h3 className="mt-2 font-heading text-2xl font-bold uppercase tracking-wide text-[#F8B41D] md:text-3xl">
        {cluster.name}
      </h3>

      {cluster.clusterMeaning && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70 md:text-base">
          {cluster.clusterMeaning}
        </p>
      )}

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-[#2DD4BF]/30 pt-4">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70 md:text-sm">
            <Users size={16} className="text-[#2DD4BF]" />
            {cluster.memberCount ?? 0} Anggota
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F8B41D] px-4 py-1.5 text-xs font-bold text-[#F8B41D] transition-colors duration-300 group-hover:bg-[#F8B41D] group-hover:text-[#0B3C42]">
            Detail
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
