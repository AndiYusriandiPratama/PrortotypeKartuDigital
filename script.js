const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRLf53AvAwXdnr134GFkwis_l7HDetkrIJkIaOPPeaXp_7d6ggHhUj0nsDTkSQ5n_Lu5JamHXxSO5Vn/pub?output=csv";

/* GANTI DENGAN URL APPS SCRIPT */
const apiURL = "https://script.google.com/macros/s/AKfycbx4Ys_gRrjzn7LqUiAtapyAE7-hsEoNc7b2ZcgU0gG3jA_tkj9cRP2gVyRaDpZn_Cdu/exec";

const params = new URLSearchParams(window.location.search);
const kodeQR = params.get("kode");

console.log("Kode QR:", kodeQR);

fetch(sheetURL)
.then(res => res.text())
.then(data => {

const rows = data.split("\n").slice(1);

rows.forEach(row => {

const col = row.split(",");

const kodeUnit = col[1].trim();

if(kodeUnit === kodeQR){

document.getElementById("kodeUnit").innerText = col[1];
document.getElementById("namaBarang").innerText = col[2];
document.getElementById("jenisBarang").innerText = col[3];
document.getElementById("merekBarang").innerText = col[4];
document.getElementById("nomorUnit").innerText = col[5];
document.getElementById("satuan").innerText = col[6];
document.getElementById("lokasi").innerText = col[7];
document.getElementById("petugas").innerText = col[11];
document.getElementById("tanggalInput").innerText = col[9];
document.getElementById("updateTerakhir").innerText = col[10];
document.getElementById("catatan").innerText = col[12];

let kondisi = col[8];

const badge = document.getElementById("statusBadge");

badge.innerText = kondisi;
badge.className = "status-badge";

if(kondisi === "Baik") badge.classList.add("baik");
if(kondisi === "Rusak") badge.classList.add("rusak");
if(kondisi === "perbaikan") badge.classList.add("perbaikan");

document.getElementById("tanggalCek").innerText = col[10];

if(col[13]){
document.getElementById("fotoBarang").src = col[13];
}

/* Disable tombol sesuai kondisi */

if(kondisi === "Baik"){
document.getElementById("btnBaik").disabled = true;
}

if(kondisi === "Rusak"){
document.getElementById("btnRusak").disabled = true;
}

if(kondisi === "perbaikan"){
document.getElementById("btnperbaikan").disabled = true;
}

}

});

});


/* FUNCTION UBAH STATUS */

function ubahStatus(status){

const password = prompt("Masukkan password admin");

if(password !== "admin123"){
alert("Password salah");
return;
}

fetch(apiURL,{
method:"POST",
body:JSON.stringify({
kode:kodeQR,
status:status
})
})
.then(res => res.text())
.then(data => {

alert("Status berhasil diperbarui");

location.reload();

})
.catch(err=>{
alert("Gagal update");
console.log(err);
});

}