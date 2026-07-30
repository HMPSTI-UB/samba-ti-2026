import Image from "next/image";

export default function ZenithPhases() {
  return (
    <section className="pt-200 pb-50 relative">
      <h2 className="text-6xl font-bold text-right w-1/2 absolute right-20 text-white font-poppins tracking-wide leading-20 top-1/2 -translate-y-20">
        Rangkaian SAMBA TI Zenith 2026
      </h2>
      <div className="relative mx-auto">
        <Image
          src={"/assets/hero/aurora-trail.png"}
          width={1000}
          height={500}
          alt=""
          className="mx-auto"
        />
        <div className="absolute left-40  top-60">
          <Image
            src={"/assets/hero/obama.png"}
            width={200}
            height={100}
            alt=""
            className="mx-auto"
          />
          <div className="absolute right-15 -bottom-5 text-center">
            <h5 className="font-bold">OBAMA</h5>
            <p className="text-[#BB5AFA]">Nebula</p>
          </div>
        </div>
        <div className="absolute right-40  top-140">
          <Image
            src={"/assets/hero/fusion.png"}
            width={200}
            height={100}
            alt=""
            className="mx-auto"
          />
          <div className="absolute right-15 -bottom-5 text-center">
            <h5 className="font-bold">SAMBA TI</h5>
            <p className="text-[#BB5AFA]">Fusion</p>
          </div>
        </div>
        <div className="absolute left-120  bottom-0">
          <Image
            src={"/assets/hero/m2m.png"}
            width={200}
            height={100}
            alt=""
            className="mx-auto"
          />
          <div className="absolute right-15 -bottom-5 text-center">
            <h5 className="font-bold">M2M & WP</h5>
            <p className="text-[#BB5AFA]">Supernova</p>
          </div>
        </div>
      </div>
    </section>
  );
}
