import Image from "next/image";
import Reveal from "@/components/common/reveal";

export default function Logo() {
  return (
    <section className="py-10 md:py-20">
      <Reveal from="bottom">
        <div className="grid gap-8 md:grid-cols-4 items-center px-6 md:px-10">
          <div className="md:col-span-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white font-poppins tracking-wide leading-9 md:leading-20">
              Filosofi Logo SAMBA TI Zenith 2026
            </h2>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={"/logo.png"}
              width={400}
              height={400}
              alt="Logo SAMBA TI"
              className="w-32 sm:w-40 md:w-56 lg:w-72"
            />
          </div>
        </div>
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-10 md:mt-25 space-y-6 md:space-y-10">
        <Reveal from="bottom">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="shrink-0 bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:p-10 flex items-center justify-center">
              <Image
                src={"/assets/hero/logos/part1.svg"}
                width={200}
                height={200}
                alt=""
                className="w-28 h-28 md:w-44 md:h-44"
              />
            </div>
            <div className="flex-1 w-full bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:px-20 text-center">
              <h5 className="text-blue-600 font-bold text-lg md:text-xl">
                BENTUK SEGITIGA UTAMA & PANAH PUTIH KE ATAS
              </h5>
              <p className="text-base md:text-lg text-white mt-4 md:mt-5">
                Menggambarkan “The Ascent to Zenith” atau pendakian menuju Zenith.
                Secara keseluruhan ini melambangkan proses, dorongan, serta ambisi
                mahasiswa baru untuk untuk menuju titik tertinggi.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal from="bottom" delay={150}>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="shrink-0 bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:p-10 flex items-center justify-center">
              <Image
                src={"/assets/hero/logos/part2.svg"}
                width={200}
                height={200}
                alt=""
                className="w-28 h-28 md:w-44 md:h-44"
              />
            </div>
            <div className="flex-1 w-full bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:px-20 text-center">
              <h5 className="text-blue-600 font-bold text-lg md:text-xl">
                LINGKARAN ORBITAL
              </h5>
              <p className="text-base md:text-lg text-white mt-4 md:mt-5">
                Melambangkan garis edar planet atau batasan atmosfer kosmis. Ini
                melambangkan ruang lingkup global dan fleksibilitas ilmu Teknologi
                Informasi yang sangat luas. Lingkaran ini menjaga agar evolusi
                mahasiswa tetap berada di jalur (orbit) yang benar.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal from="bottom" delay={300}>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="shrink-0 bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:p-10 flex items-center justify-center">
              <Image
                src={"/assets/hero/logos/part3.svg"}
                width={200}
                height={200}
                alt=""
                className="w-28 h-28 md:w-44 md:h-44"
              />
            </div>
            <div className="flex-1 w-full bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-6 md:px-20 text-center">
              <h5 className="text-blue-600 font-bold text-lg md:text-xl">
                BINTANG EMPAT SUDUT DI PUNCAK LINGKARAN
              </h5>
              <p className="text-base md:text-lg text-white mt-4 md:mt-5">
                Melambangkan pencapaian puncak (Zenith) sekaligus representasi
                dari “Supernova”. Keempat sudut bintang melambangkan empat arah
                mata angin. Artinya, bintang ini siap memancarkan dampak positif
                dan membawa pengaruh besar bagi dunia luar ke segala penjuru.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
