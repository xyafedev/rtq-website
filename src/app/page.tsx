import Image from "next/image";
import ProgramMembaca from "@/components/section/home/ProgramMembaca";
import ProgramKami from "@/components/section/home/ProgramKami";
import KenaliKami from "@/components/section/home/KenaliKami";
import ProgramUnggulan from "@/components/section/home/ProgramUnggulan";
import VisiMisi from "@/components/section/home/VisiMisi";
import Guru from "@/components/section/home/Guru";
import Berita from "@/components/section/home/Berita";

export default function Home() {
  return (
    <div className="mt-16 w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="container">
        <div className="flex w-full items-center">
          <div className="flex-1 grid gap-4">
            <p className="text-green-500 font-semibold text-xl">
              Yanbu&#39;a Islami
            </p>
            <p className="text-5xl font-bold">
              Membentuk Santri <br /> Cinta Al-Qur&#39;an <br /> Sejak Dini
            </p>
            <p className="text-gray-600 text-lg">
              Yuk, Bergabung Bersama Kami!
            </p>
            <button className="bg-yellow-400 text-black rounded-full w-fit p-3 px-6 hover:bg-yellow-500 transition-colors">
              Daftar Sekarang
            </button>
          </div>

          <div className="flex-1 relative w-full h-full min-h-[400px]">
            <Image
              src="/images/hero.svg"
              alt=""
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </section>
      {/* Program Unggulan Section */}
      <section className="container mt-32 overflow-hidden">
        <ProgramUnggulan />
      </section>
      {/* Program Kami Section */}
      <section className="container mt-32">
        <ProgramKami />
      </section>
      {/* Program Membaca Section */}
      <section className="container mt-32">
        <ProgramMembaca />
      </section>
      {/* Kenali Kami Section */}
      <section className="container mt-32">
        <KenaliKami />
      </section>
      {/* Visi Misi Section */}
      <section className="mt-32">
        <VisiMisi />
      </section>
      {/* Guru Section */}
      <section className="container mt-32">
        <Guru />
      </section>
      {/* Berita Section */}
      <section className="mt-12">
        <Berita />
      </section>
    </div>
  );
}
