/* ===== Logika halaman login (index.html) ===== */
const $ = (id) => document.getElementById(id);

if (typeof MAHASISWA === "undefined") {
  $("formMsg").textContent = "File js/data.js tidak terbaca. Periksa nama dan lokasinya.";
  throw new Error("js/data.js gagal dimuat");
}

const form = $("loginForm");
const nimInput = $("nim");
const pwInput = $("password");

// Jika sudah login, langsung ke dashboard
if (mahasiswaAktif()) location.replace("dashboard.html");

function setError(input, msgEl, text) {
  input.classList.toggle("error", !!text);
  input.classList.toggle("valid", !text && input.value !== "");
  msgEl.textContent = text || "";
  return !text;
}

function cekNim() {
  const v = nimInput.value.trim();
  let err = "";
  if (!v) err = "NIM wajib diisi.";
  else if (!/^\d+$/.test(v)) err = "NIM hanya boleh berisi angka.";
  else if (v.length < 7) err = "NIM minimal 7 digit.";
  return setError(nimInput, $("nimMsg"), err);
}

function cekPassword() {
  const v = pwInput.value;
  let err = "";
  if (!v) err = "Kata sandi wajib diisi.";
  else if (v.length < 6) err = "Kata sandi minimal 6 karakter.";
  return setError(pwInput, $("pwMsg"), err);
}

nimInput.addEventListener("input", () => {
  nimInput.value = nimInput.value.replace(/\D/g, "");
  $("formMsg").textContent = "";
  if (nimInput.classList.contains("error")) cekNim();
});
pwInput.addEventListener("input", () => {
  $("formMsg").textContent = "";
  if (pwInput.classList.contains("error")) cekPassword();
});
nimInput.addEventListener("blur", () => { if (nimInput.value) cekNim(); });

$("togglePw").addEventListener("click", function () {
  const tampil = pwInput.type === "password";
  pwInput.type = tampil ? "text" : "password";
  this.classList.toggle("on", tampil);
  this.setAttribute("aria-label", tampil ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  $("formMsg").style.color = "";
  $("formMsg").textContent = "";

  const nimOk = cekNim();
  const pwOk = cekPassword();
  if (!nimOk || !pwOk) return;

  const nim = nimInput.value.trim();
  const mhs = MAHASISWA.find((m) => m.nim === nim && m.password === pwInput.value);

  if (!mhs) {
    $("formMsg").textContent = "NIM atau kata sandi salah. Periksa kembali lalu coba lagi.";
    pwInput.value = "";
    pwInput.focus();
    return;
  }

  simpan("mhs_login", mhs.nim, false);
  location.replace("dashboard.html");
});