"use client";

import { useState } from "react";
import Hero from "./_components/hero";

export default function NotFound() {
  const [loaded, setLoaded] = useState(true);

  return (
    <Hero
      loaded={loaded}
      setLoaded={setLoaded}
      hideLoadingScreen
      eyebrow="SAMBA TI 2026"
      title="404"
      titleClassName="text-6xl md:text-[130px] tracking-[2px] md:tracking-[6px]"
      subtitle="Halaman Tidak Ditemukan"
      ctaLabel="Kembali ke Beranda"
      ctaHref="/"
    />
  );
}
