"use client";

import { useState } from "react";
import Hero from "../_components/hero";

export default function ComingSoonPage() {
  const [loaded, setLoaded] = useState(true);

  return (
    <Hero
      loaded={loaded}
      setLoaded={setLoaded}
      hideLoadingScreen
      eyebrow="SAMBA TI 2026"
      title="COMING"
      titleTail="SOON"
      titleClassName="text-5xl md:text-[120px] tracking-[2px] md:tracking-[6px]"
      hideSubtitle
      hideCta
    />
  );
}
