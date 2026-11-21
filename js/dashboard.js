/* ===== Logika halaman dashboard (dashboard.html) ===== */
const $ = (id) => document.getElementById(id);

// Penjaga halaman: tanpa login, kembali ke halaman login
const mhs = mahasiswaAktif();
if (!mhs) location.replace("index.html");

function kelasNilai(n) {
  return n.charAt(0) === "A" ? "grade" : "grade mid";
}

function tampilkan() {
  $("nama").textContent = mhs.nama;
  $("info").textContent = mhs.nim + " · " + mhs.prodi;
  $("semester").textContent = mhs.semester;
  $("kelas").textContent = mhs.kelas;

  $("jadwalBody").innerHTML = mhs.jadwal.map((j) =>
    "<tr><td>" + j.hari + "</td><td>" + j.jam + "</td><td>" + j.matkul +
    "</td><td>" + j.ruang + "</td></tr>"
  ).join("");

  $("nilaiBody").innerHTML = mhs.nilai.map((n) =>
    "<tr><td>" + n.matkul + "</td><td>" + n.sks + '</td><td><span class="' +
    kelasNilai(n.nilai) + '">' + n.nilai + "</span></td></tr>"
  ).join("");
}

$("btnLogout").addEventListener("click", () => {
  simpan("mhs_login", null, false);
  location.href = "index.html";
});

if (mhs) tampilkan();