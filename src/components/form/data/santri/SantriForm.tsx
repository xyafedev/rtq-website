/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SantriData {
  nama_lengkap: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: Date | null;
  jenis_kelamin: string;
  jumlah_saudara: number;
  anak_ke: number;
  cita_cita: string;
  nomor_hp: string;
  has_no_hp: boolean;
  email: string;
  hobi: string;
  sumber_pembiayaan: string;
  nomor_kip: string;
  kebutuhan_khusus: string;
  kebutuhan_disabilitas: string;
  nomor_kk: string;
  nama_kepala_keluarga: string;
  unggah_kk: File | null;
  unggah_kip: File | null;
}

export default function SantriForm() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [santriData, setSantriData] = useState<SantriData>({
    nama_lengkap: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: null,
    jenis_kelamin: "",
    jumlah_saudara: 0,
    anak_ke: 0,
    cita_cita: "",
    nomor_hp: "",
    has_no_hp: false,
    email: "",
    hobi: "",
    sumber_pembiayaan: "",
    nomor_kip: "",
    kebutuhan_khusus: "",
    kebutuhan_disabilitas: "",
    nomor_kk: "",
    nama_kepala_keluarga: "",
    unggah_kk: null,
    unggah_kip: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchSantriData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: santri, error } = await supabase
        .from("santri")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      if (error) {
        console.error("Error fetching santri data:", error.message);
        setHasData(false);
      } else {
        setSantriData(santri);
        setHasData(true);
      }
    };

    fetchSantriData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast.error("Anda harus login terlebih dahulu.");
        return;
      }

      let kkUrl = null;
      let kipUrl = null;

      if (santriData.unggah_kk) {
        const { data: kkData, error: kkError } = await supabase.storage
          .from("files")
          .upload(`kk/${santriData.unggah_kk.name}`, santriData.unggah_kk);
        if (kkError) throw kkError;
        kkUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/kk/${santriData.unggah_kk.name}`;
      }

      if (santriData.unggah_kip) {
        const { data: kipData, error: kipError } = await supabase.storage
          .from("files")
          .upload(`kip/${santriData.unggah_kip.name}`, santriData.unggah_kip);
        if (kipError) throw kipError;
        kipUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/files/kip/${santriData.unggah_kip.name}`;
      }

      const { error } = await supabase.from("santri").insert({
        user_id: userData.user.id,
        nama_lengkap: santriData.nama_lengkap,
        nik: santriData.nik,
        tempat_lahir: santriData.tempat_lahir,
        tanggal_lahir: santriData.tanggal_lahir?.toISOString(),
        jenis_kelamin: santriData.jenis_kelamin,
        jumlah_saudara: santriData.jumlah_saudara,
        anak_ke: santriData.anak_ke,
        cita_cita: santriData.cita_cita,
        nomor_hp: santriData.has_no_hp ? null : santriData.nomor_hp,
        email: santriData.email,
        hobi: santriData.hobi,
        sumber_pembiayaan: santriData.sumber_pembiayaan,
        nomor_kip: santriData.nomor_kip,
        kebutuhan_khusus: santriData.kebutuhan_khusus,
        kebutuhan_disabilitas: santriData.kebutuhan_disabilitas,
        nomor_kk: santriData.nomor_kk,
        nama_kepala_keluarga: santriData.nama_kepala_keluarga,
        unggah_kk: kkUrl,
        unggah_kip: kipUrl,
      });

      if (error) {
        console.error("Error inserting data:", error.message);
        toast.error("Gagal menyimpan data santri.");
      } else {
        toast.success("Data santri berhasil disimpan!");
        setHasData(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Terjadi kesalahan saat mendaftar.");
    }
  };

  const handleUpdate = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { error } = await supabase
        .from("santri")
        .update({
          nama_lengkap: santriData.nama_lengkap,
          nik: santriData.nik,
          tempat_lahir: santriData.tempat_lahir,
          tanggal_lahir: santriData.tanggal_lahir?.toISOString(),
          jenis_kelamin: santriData.jenis_kelamin,
          jumlah_saudara: santriData.jumlah_saudara,
          anak_ke: santriData.anak_ke,
          cita_cita: santriData.cita_cita,
          nomor_hp: santriData.has_no_hp ? null : santriData.nomor_hp,
          email: santriData.email,
          hobi: santriData.hobi,
          sumber_pembiayaan: santriData.sumber_pembiayaan,
          nomor_kip: santriData.nomor_kip,
          kebutuhan_khusus: santriData.kebutuhan_khusus,
          kebutuhan_disabilitas: santriData.kebutuhan_disabilitas,
          nomor_kk: santriData.nomor_kk,
          nama_kepala_keluarga: santriData.nama_kepala_keluarga,
        })
        .eq("user_id", userData.user.id);

      if (error) {
        toast.error("Gagal menyimpan perubahan.");
      } else {
        toast.success("Perubahan berhasil disimpan!");
        setIsEditMode(false); // Kembali ke mode read-only
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast.error("Terjadi kesalahan saat menyimpan perubahan.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap*
            </label>
            <input
              type="text"
              required
              disabled={!isEditMode}
              placeholder="Masukkan nama lengkap"
              className="p-2 mt-1 block w-full outline-none rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nama_lengkap}
              onChange={(e) =>
                setSantriData({ ...santriData, nama_lengkap: e.target.value })
              }
            />
          </div>

          {/* NIK */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIK*
            </label>
            <input
              type="text"
              required
              disabled={!isEditMode}
              placeholder="Masukkan NIK"
              className="mt-1 outline-none p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nik}
              onChange={(e) =>
                setSantriData({ ...santriData, nik: e.target.value })
              }
            />
          </div>

          {/* Tempat Lahir */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tempat Lahir*
            </label>
            <input
              type="text"
              required
              disabled={!isEditMode}
              placeholder="Masukkan tempat lahir"
              className="mt-1 p-2 outline-none block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400"
              value={santriData.tempat_lahir}
              onChange={(e) =>
                setSantriData({ ...santriData, tempat_lahir: e.target.value })
              }
            />
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Lahir*
            </label>
            <DatePicker
              selected={santriData.tanggal_lahir}
              disabled={!isEditMode}
              onChange={(date) =>
                setSantriData({ ...santriData, tanggal_lahir: date! })
              }
              className="mt-1 outline-none p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400"
              placeholderText="Pilih tanggal lahir"
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jenis Kelamin
            </label>
            <select
              required
              disabled={!isEditMode}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.jenis_kelamin}
              onChange={(e) =>
                setSantriData({ ...santriData, jenis_kelamin: e.target.value })
              }
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Jumlah Saudara */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jumlah Saudara*
            </label>
            <input
              type="number"
              required
              disabled={!isEditMode}
              placeholder="Masukkan jumlah saudara"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.jumlah_saudara}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  jumlah_saudara: parseInt(e.target.value),
                })
              }
            />
          </div>

          {/* Anak Ke */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Anak Ke*
            </label>
            <input
              type="number"
              required
              disabled={!isEditMode}
              placeholder="Masukkan urutan anak"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.anak_ke}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  anak_ke: parseInt(e.target.value),
                })
              }
            />
          </div>

          {/* Cita-cita */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cita-cita
            </label>
            <select
              required
              disabled={!isEditMode}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.cita_cita}
              onChange={(e) =>
                setSantriData({ ...santriData, cita_cita: e.target.value })
              }
            >
              <option value="Dokter">Dokter</option>
              <option value="PNS">PNS</option>
              <option value="TNI/POLRI">TNI/POLRI</option>
              <option value="Guru/Dosen">Guru/Dosen</option>
              <option value="Politikus">Politikus</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="Seniman/Artis">Seniman/Artis</option>
              <option value="Ilmuwan">Ilmuwan</option>
              <option value="Agamawan">Agamawan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Nomor HP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nomor HP
            </label>
            <input
              type="text"
              required={!santriData.has_no_hp}
              disabled={santriData.has_no_hp}
              placeholder="Masukkan nomor HP"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nomor_hp}
              onChange={(e) =>
                setSantriData({ ...santriData, nomor_hp: e.target.value })
              }
            />
            <div className="flex items-center mt-2">
              <input
                disabled={!isEditMode}
                type="checkbox"
                checked={santriData.has_no_hp}
                onChange={(e) =>
                  setSantriData({ ...santriData, has_no_hp: e.target.checked })
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Tidak memiliki nomor HP
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              disabled={!isEditMode}
              type="email"
              required
              placeholder="Masukkan email"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.email}
              onChange={(e) =>
                setSantriData({ ...santriData, email: e.target.value })
              }
            />
          </div>

          {/* Hobi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hobi
            </label>
            <select
              disabled={!isEditMode}
              required
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.hobi}
              onChange={(e) =>
                setSantriData({ ...santriData, hobi: e.target.value })
              }
            >
              <option value="Olahraga">Olahraga</option>
              <option value="Kesenian">Kesenian</option>
              <option value="Membaca">Membaca</option>
              <option value="Menulis">Menulis</option>
              <option value="Jalan-jalan">Jalan-jalan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Sumber Pembiayaan */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sumber Pembiayaan
            </label>
            <select
              disabled={!isEditMode}
              required
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.sumber_pembiayaan}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  sumber_pembiayaan: e.target.value,
                })
              }
            >
              <option value="Orang Tua">Orang Tua</option>
              <option value="Beasiswa">Beasiswa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Nomor KIP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nomor KIP
            </label>
            <input
              disabled={!isEditMode}
              type="text"
              placeholder="Masukkan nomor KIP"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nomor_kip}
              onChange={(e) =>
                setSantriData({ ...santriData, nomor_kip: e.target.value })
              }
            />
          </div>

          {/* Kebutuhan Khusus */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kebutuhan Khusus
            </label>
            <select
              disabled={!isEditMode}
              required
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.kebutuhan_khusus}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  kebutuhan_khusus: e.target.value,
                })
              }
            >
              <option value="Tidak Ada">Tidak Ada</option>
              <option value="Lamban Belajar">Lamban Belajar</option>
              <option value="Kesulitan Belajar Spesifik">
                Kesulitan Belajar Spesifik
              </option>
              <option value="Gangguan Komunikasi">Gangguan Komunikasi</option>
              <option value="Berbakat / Memiliki Kecerdasan Luar Biasa">
                Berbakat / Memiliki Kecerdasan Luar Biasa
              </option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Kebutuhan Disabilitas */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kebutuhan Disabilitas
            </label>
            <select
              disabled={!isEditMode}
              required
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.kebutuhan_disabilitas}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  kebutuhan_disabilitas: e.target.value,
                })
              }
            >
              <option value="Tidak Ada">Tidak Ada</option>
              <option value="Tuna Netra">Tuna Netra</option>
              <option value="Tuna Rungu">Tuna Rungu</option>
              <option value="Tuna Daksa">Tuna Daksa</option>
              <option value="Tuna Grahita">Tuna Grahita</option>
              <option value="Tuna Laras">Tuna Laras</option>
              <option value="Tuna Wicara">Tuna Wicara</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Nomor KK */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nomor KK*
            </label>
            <input
              disabled={!isEditMode}
              type="text"
              required
              placeholder="Masukkan nomor KK"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nomor_kk}
              onChange={(e) =>
                setSantriData({ ...santriData, nomor_kk: e.target.value })
              }
            />
          </div>

          {/* Nama Kepala Keluarga */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Kepala Keluarga*
            </label>
            <input
              disabled={!isEditMode}
              type="text"
              required
              placeholder="Masukkan nama kepala keluarga"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              value={santriData.nama_kepala_keluarga}
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  nama_kepala_keluarga: e.target.value,
                })
              }
            />
          </div>

          {/* Unggah KK */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unggah KK
            </label>
            <input
              disabled={!isEditMode}
              type="file"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  unggah_kk: e.target.files ? e.target.files[0] : null,
                })
              }
            />
          </div>

          {/* Unggah KIP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unggah KIP
            </label>
            <input
              disabled={!isEditMode}
              type="file"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm outline-none p-2 focus:border-gray-400 focus:ring-gray-400"
              onChange={(e) =>
                setSantriData({
                  ...santriData,
                  unggah_kip: e.target.files ? e.target.files[0] : null,
                })
              }
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          {/* Tombol Daftar */}
          {!hasData && (
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Daftar
            </button>
          )}

          {/* Tombol Edit Data */}
          {hasData && !isEditMode && (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Edit Data
            </button>
          )}

          {/* Tombol Simpan Perubahan */}
          {hasData && isEditMode && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
