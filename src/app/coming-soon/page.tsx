import Image from "next/image";
import StarBackground from "@/components/common/star-background";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StarBackground />
      <div className="absolute bottom-0 left-0 w-full h-[800px] pointer-events-none scale-80 -translate-x-[60px] translate-y-[180px] rotate-[9.48deg] origin-bottom-left">
        <Image
          src="/assets/hero/mars-ground.svg"
          alt="Mars Ground"
          fill
          className="object-cover object-left-bottom"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none scale-[2.5] origin-bottom-right translate-y-[400px] translate-x-[100px]">
        <div className="absolute inset-[50px] rounded-full animate-rotate-glow blur-lg"
          style={{
            background: "conic-gradient(from 0deg, #38BDF8, #ffffff, #38BDF8, #ffffff, #38BDF8)",
          }}
        />
        <Image
          src="/assets/hero/earth.svg"
          alt="Earth"
          fill
          className="object-contain object-right-bottom relative z-10"
        />
      </div>
      <div className="absolute top-0 left-0 w-[500px] h-[300px] pointer-events-none scale-75 -rotate-[15deg] origin-top-left translate-y-[100px]">
        <div
          className="absolute inset-[-20%] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, #ec4899, transparent 70%)",
          }}
        />
        <Image
          src="/assets/hero/galaxy.svg"
          alt="Galaxy"
          fill
          className="object-contain object-top-left relative z-10"
        />
      </div>
      <div className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none -translate-y-[200px] translate-x-[100px]">
        <div
          className="absolute inset-[-20%] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, #a855f7, transparent 70%)",
          }}
        />
        <Image
          src="/assets/hero/purple-planet.svg"
          alt="Purple Planet"
          fill
          className="object-contain object-top-right relative z-10"
        />
      </div>
      <div className="absolute right-0 w-[250px] h-[180px] pointer-events-none top-1/2 -translate-y-1/2 -translate-x-[30px] origin-right">
        <div className="relative w-full h-full animate-float scale-150 origin-right">
          <Image
            src="/assets/hero/maskot.svg"
            alt="Maskot"
            fill
            className="object-contain object-right"
          />
        </div>
      </div>
      <div className="flex flex-col items-center leading-none gap-[10px]">
        <span
          className="text-[160px] text-star-gold uppercase tracking-[10px]"
          style={{
            fontFamily: "var(--font-display)",
            textShadow:
              "3px 3px 0 #ff0000, 6px 6px 0 #cc0000, 9px 9px 0 #aa0000, 12px 12px 0 #880000, 15px 15px 0 #660000",
          }}
        >
          Coming
        </span>
        <span
          className="text-[160px] text-star-gold uppercase tracking-[10px]"
          style={{
            fontFamily: "var(--font-display)",
            textShadow:
              "3px 3px 0 #ff0000, 6px 6px 0 #cc0000, 9px 9px 0 #aa0000, 12px 12px 0 #880000, 15px 15px 0 #660000",
          }}
        >
          Soon
        </span>
      </div>
    </main>
  );
}
