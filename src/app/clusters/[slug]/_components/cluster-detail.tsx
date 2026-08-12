"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { Phone, Star } from "lucide-react";
import type { PublicClusterDetail } from "@/features/clusters/types";
import MemberList from "./member-list";

export default function ClusterDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["public-cluster", slug],
    queryFn: () =>
      clientApi.get<PublicClusterDetail>(`/public/clusters/${slug}`),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2DD4BF]/30 border-t-[#2DD4BF]" />
        <p className="mt-4 text-sm text-muted-text">Memuat data cluster...</p>
      </div>
    );
  }

  if (isError || !data) {
    const isNotFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="font-heading text-4xl font-bold uppercase text-[#F8B41D]">
          {isNotFound ? "404" : "Ups!"}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-text md:text-base">
          {isNotFound
            ? "Cluster tidak ditemukan."
            : "Gagal memuat data cluster. Coba muat ulang halaman atau hubungi panitia."}
        </p>
      </div>
    );
  }

  const { cluster, members } = data.data;

  return (
    <>
      <div className="text-center">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F8B41D]/40 bg-[#F8B41D]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#F8B41D]">
          <Star size={12} className="fill-current" />
          Cluster {cluster.clusterNumber ?? "?"}
        </span>

        <h2 className="mt-5 font-heading text-4xl font-bold uppercase tracking-wide text-[#F8B41D] md:text-[70px] md:leading-none">
          {cluster.name}
        </h2>

        {cluster.clusterMeaning && (
          <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed text-muted-text md:text-lg">
            {cluster.clusterMeaning}
          </p>
        )}
      </div>

      <div className="mt-14">
        <MemberList members={members} />

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#F8B41D]/40 bg-[#F8B41D]/5 p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8B41D]/15">
            <Phone size={18} className="text-[#F8B41D]" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#F8B41D]">
              Kendala / Nama Tidak Ada?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Jika nama kamu tidak ada di daftar anggota atau mengalami kendala
              lain, silakan hubungi CP:{" "}
              <a
                href="https://wa.me/6285883590837"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#F8B41D] underline-offset-4 hover:underline"
              >
                0858-8359-0837
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
