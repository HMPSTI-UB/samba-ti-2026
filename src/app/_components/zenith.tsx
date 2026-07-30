import Image from "next/image";

export default function Zenith() {
  return (
    <section className="min-h-screen ">
      <div className="relative  pt-120">
        <div className="relative w-fit mx-auto z-30">
          <Image
            src={"/assets/hero/about-card.png"}
            width={900}
            height={600}
            alt=""
            className="mx-auto  "
          />
          <h2 className="font-poppins text-3xl text-white absolute left-1/2 -translate-x-1/2 top-2 font-bold">
            FILOSOFI
          </h2>
          <p className="font-poppins text-white absolute left-1/2 -translate-x-1/2 top-20 text-2xl tracking-wide text-justify w-7/10">
            Dalam astronomi, Zenith adalah titik tertinggi di langit. Dalam
            konteks SAMBA TI, Zenith adalah komitmen kolektif untuk membawa maba
            dari titik nol (ground level) menuju performa dan pencapaian
            tertinggi mereka. Mereka adalah individu dengan potensi besar yang
            akan berkembang menjadi para inovator, pemecah masalah, dan
            penggerak teknologi di masa depan “The New IT Heroes”.
          </p>
        </div>
        <Image
          src={"/assets/hero/rocks.png"}
          width={2100}
          height={645}
          alt=""
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-10 scale-115"
        />
        <Image
          src={"/assets/hero/starwar-ship.png"}
          width={252}
          height={252}
          alt=""
          className="absolute top-50 right-0 z-10 scale-115"
        />
      </div>
      <div className="relative w-full ">
        <div className="absolute -top-40 -right-190 -rotate-10">
          <h3 className="text-white absolute text-2xl font-bold left-93 top-65 z-99">
            Visi
          </h3>
          <p className="text-white absolute text-md font-bold left-62  top-95 z-99 w-100 text-justify">
            Mewujudkan SAMBA TI sebagai ruang inkubasi yang visioner demi
            mengantarkan mahasiswa baru menuju ”Zenith” (titik tertinggi)
            potensi mereka, membentuk IT heroes baru yang adaptif,
            berintegritas, dan siap menjadi navigator arah perkembangan
            teknologi di masa depan.
          </p>

          <Image
            src={"/assets/hero/station.png"}
            width={1600}
            height={100}
            alt=""
            className="-rotate-5"
          />
        </div>
        <div className="absolute top-20 -left-200 rotate-5">
          <h3 className="text-white absolute text-2xl font-bold right-114 top-67 z-99">
            Misi
          </h3>
          <ol className="text-white absolute text-sm font-bold right-62  top-100 z-99 w-100 text-justify list-decimal">
            <li className="">
              Menyambut dan menyatukan keberagaman latar belakang mahasiswa baru
              ke dalam satu ekosistem TI yang suportif dan inklusif.
            </li>
            <li>
              Memperkenalkan Program Studi Teknologi Informasi kepada mahasiswa
              baru angkatan 26.
            </li>
            <li>
              Menanamkan nilai-nilai kreatifitas, respect, solidaritas, dan
              kemampuan problem solving kepada mahasiswa baru.
            </li>
          </ol>

          <Image
            src={"/assets/hero/station.png"}
            width={1600}
            height={100}
            alt=""
            className="-rotate-5"
          />
        </div>
      </div>
    </section>
  );
}
