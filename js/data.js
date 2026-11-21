/* ===== Data & fungsi bersama =====
   Data ini hanya contoh statis. Di sistem asli, data diambil dari server. */

const MAHASISWA = [
  {
    nim: "352510104", password: "Sokhibin123",
    nama: "M. SOKHIBIN", prodi: "Teknik Industri", semester: 3, kelas: "J253P",
    jadwal: [
      { hari: "Senin",  jam: "08.00–09.40", matkul: "Pemrograman Web",          ruang: "Lab 2" },
      { hari: "Senin",  jam: "13.00–14.40", matkul: "Basis Data Lanjut",        ruang: "R. 305" },
      { hari: "Rabu",   jam: "10.00–11.40", matkul: "Jaringan Komputer",        ruang: "R. 210" },
      { hari: "Kamis",  jam: "08.00–10.30", matkul: "Rekayasa Perangkat Lunak", ruang: "R. 301" },
      { hari: "Jumat",  jam: "13.30–15.10", matkul: "Kecerdasan Buatan",        ruang: "Lab 1" }
    ],
    nilai: [
      { matkul: "Struktur Data",                  sks: 3, nilai: "A" },
      { matkul: "Basis Data",                     sks: 3, nilai: "A" },
      { matkul: "Sistem Operasi",                 sks: 3, nilai: "B+" },
      { matkul: "Pemrograman Berorientasi Objek", sks: 4, nilai: "A" },
      { matkul: "Statistika",                     sks: 2, nilai: "B" }
    ]
  },
  {
    nim: "2021002", password: "kuliah2026",
    nama: "Dimas Prakoso", prodi: "Sistem Informasi", semester: 5, kelas: "J253Q",
    jadwal: [
      { hari: "Selasa", jam: "09.00–10.40", matkul: "Analisis Proses Bisnis", ruang: "R. 204" },
      { hari: "Rabu",   jam: "13.00–15.30", matkul: "Pemrograman Web",        ruang: "Lab 2" },
      { hari: "Kamis",  jam: "10.00–11.40", matkul: "Manajemen Proyek TI",    ruang: "R. 302" }
    ],
    nilai: [
      { matkul: "Sistem Informasi Manajemen", sks: 3, nilai: "A" },
      { matkul: "Basis Data",                 sks: 3, nilai: "B+" },
      { matkul: "Akuntansi Dasar",            sks: 2, nilai: "B" },
      { matkul: "Algoritma dan Pemrograman",  sks: 4, nilai: "B+" }
    ]
  }
];

/* Penyimpanan di browser (dibungkus try/catch agar aman bila diblokir) */
function simpan(key, value, persist) {
  try {
    const s = persist ? localStorage : sessionStorage;
    if (value === null) s.removeItem(key); else s.setItem(key, value);
  } catch (e) { /* abaikan */ }
}

function ambil(key, persist) {
  try { return (persist ? localStorage : sessionStorage).getItem(key); }
  catch (e) { return null; }
}

function mahasiswaAktif() {
  const nim = ambil("mhs_login", false);
  return MAHASISWA.find((m) => m.nim === nim) || null;
}