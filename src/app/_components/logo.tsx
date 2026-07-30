import Image from "next/image";

export default function Logo() {
  return (
    <section className="">
      <div className="grid grid-cols-4 px-50 place-items-center gap-20">
        <div className="col-span-3">
          <h2 className="text-6xl font-bold  text-white font-poppins tracking-wide leading-20">
            Filosofi Logo SAMBA TI Zenith 2026
          </h2>
        </div>
        <div className="col-span-1">
          <Image
            src={"/logo.png"}
            width={400}
            height={400}
            alt=""
            className="mx-auto scale-120"
          />
        </div>
      </div>
      <div className=" mx-auto px-50 mt-25 space-y-10">
        <div className="flex gap-10">
          <div className="bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-10">
            <Image
              src={"/assets/hero/logos/part1.svg"}
              width={200}
              height={200}
              alt=""
            />
          </div>
          <div className=" bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-5 px-20 w-full text-center">
            <h5 className="text-blue-600 font-bold text-xl">
              BENTUK SEGITIGA UTAMA & PANAH PUTIH KE ATAS
            </h5>
            <p className="text-lg text-white mt-5">
              Menggambarkan “The Ascent to Zenith” atau pendakian menuju Zenith.
              Secara keseluruhan ini melambangkan proses, dorongan, serta ambisi
              mahasiswa baru untuk untuk menuju titik tertinggi.
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-10">
            <Image
              src={"/assets/hero/logos/part2.svg"}
              width={200}
              height={200}
              alt=""
            />
          </div>
          <div className=" bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-5 px-20 w-full text-center">
            <h5 className="text-blue-600 font-bold text-xl">
              LINGKARAN ORBITAL
            </h5>
            <p className="text-lg text-white mt-5">
              Melambangkan garis edar planet atau batasan atmosfer kosmis. Ini
              melambangkan ruang lingkup global dan fleksibilitas ilmu Teknologi
              Informasi yang sangat luas. Lingkaran ini menjaga agar evolusi
              mahasiswa tetap berada di jalur (orbit) yang benar.
            </p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-10">
            <Image
              src={"/assets/hero/logos/part3.svg"}
              width={200}
              height={200}
              alt=""
            />
          </div>
          <div className=" bg-[#145B73]/25 border-1 border-blue-600 rounded-4xl p-5 px-20 w-full text-center">
            <h5 className="text-blue-600 font-bold text-xl">
              BINTANG EMPAT SUDUT DI PUNCAK LINGKARAN
            </h5>
            <p className="text-lg text-white mt-5">
              Melambangkan pencapaian puncak (Zenith) sekaligus representasi
              dari “Supernova”. Keempat sudut bintang melambangkan empat arah
              mata angin. Artinya, bintang ini siap memancarkan dampak positif
              dan membawa pengaruh besar bagi dunia luar ke segala penjuru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
