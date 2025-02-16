"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function KenaliKami() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const items = [
    {
      title: "Membangun Generasi Qur'ani Sejak Dini",
      content:
        "Di RTQ Al-Hikmah, kami percaya setiap anak punya potensi besar. Kami bimbing mereka dengan kasih sayang agar bisa mengenal dan mencintai Al-Qur'an sejak kecil. Belajar jadi lebih menyenangkan dengan cara yang mudah dimengerti.",
    },
    {
      title: "Pendidikan dengan Metode Yanbu'a",
      content:
        "Kami menggunakan metode Yanbu'a untuk mengajarkan Al-Qur'an. Anak-anak belajar secara bertahap sesuai usia mereka. Cara ini membuat mereka semakin percaya diri dan semangat dalam belajar.",
    },
    {
      title: "Mengasah Potensi Anak dengan Kurikulum Islami Terbaik",
      content:
        "Setiap anak berhak mendapatkan pendidikan terbaik. Di RTQ Al-Hikmah, kami menggabungkan kurikulum islami dengan cara belajar yang seru. Anak-anak tidak hanya pintar, tapi juga punya akhlak yang baik.",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8 px-4 py-8 sm:px-0 sm:container">
      {/* Text Section */}
      <div className="flex-1 flex flex-col gap-6">
        <p className="text-2xl lg:text-3xl font-semibold text-gray-800">
          Kenali Kami Lebih Dekat
        </p>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className={`w-full flex justify-between items-center p-4 transition-colors ${
                  activeIndex === index ? "bg-yellow-400" : "hover:bg-gray-50"
                }`}
              >
                <h3
                  className={`text-lg lg:text-xl font-medium text-start ${
                    activeIndex === index ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <ChevronDown
                  className={`text-gray-600 transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="p-4">
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
        <Image
          src="/images/hero-3.svg"
          alt=""
          fill
          className="object-center"
          priority
        />
      </div>
    </div>
  );
}
