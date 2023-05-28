function onload() {
  let queryParam = { nomor_surah: 0 };
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    queryParam.nomor_surah = value;
  }

  fetch(`https://equran.id/api/v2/surat/${queryParam.nomor_surah}`)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;
      const surah = data.ayat;

      const listAyat = data.ayat;
      let namaDeskSurah = [data.namaLatin, data.arti, data.jumlahAyat];

      let columns = "";
      let ayat = "";
      let isiArti = surahNames(namaDeskSurah);

      // namaDeskSurah.forEach((e) => {
      //   isiArti += surahNames(e);
      // });
      surah.forEach((e) => {
        columns += showSurah(e);
      });
      listAyat.forEach((e) => {
        ayat += pilihAyat(e);
      });
      const isiNamaSurah = document.getElementById("surahNames");
      const isiAyat = document.getElementById("list-ayat");
      const ayatKey = document.querySelector(".surahDesc");
      ayatKey.innerHTML = columns;
      isiAyat.innerHTML = ayat;
      isiNamaSurah.innerHTML = isiArti;
    });

  fetch(`https:equran.id/api/v2/tafsir/${queryParam.nomor_surah}`)
    .then((response) => response.json())
    .then((response) => {
      const datas = response.data;
      const audioFiles = datas.audioFull;

      document.getElementById("myAudio").src = audioFiles["01"];
    });
}

function togglePlayPause() {
  const audio = document.getElementById("myAudio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function toggleTafsir() {
  let queryParam = { nomor_surah: 0 };
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    queryParam.nomor_surah = value;
  }

  fetch(`https:equran.id/api/v2/tafsir/${queryParam.nomor_surah}`)
    .then((response) => response.json())
    .then((response) => {
      const datas = response.data;
      console.log(datas);
      const tafsir = datas.tafsir;
      let isiTafsir = "";
      tafsir.forEach((e) => {
        isiTafsir += showTafsir(e);
      });
      const ayatKey = document.querySelector(".surahDesc");
      ayatKey.innerHTML = isiTafsir;
    });
}

function toggleQuran() {
  let queryParam = { nomor_surah: 0 };
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params) {
    queryParam.nomor_surah = value;
  }

  fetch(`https://equran.id/api/v2/surat/${queryParam.nomor_surah}`)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;
      const surah = data.ayat;

      let columns = "";
      surah.forEach((e) => {
        columns += showSurah(e);
      });
      const ayatKey = document.querySelector(".surahDesc");
      ayatKey.innerHTML = columns;
    });
}

function showSurah(e) {
  return `<div class="column border p-2 mt-2 rounded-2" id="${e.nomorAyat}">
              <p class="ms-2">${e.nomorAyat}</p>
              <span class="fs-3"><p class="me-2 text-end">${e.teksArab}</p></span>         
              <p class="me-2 text-end">${e.teksIndonesia}</p>
          </div>`;
}
function showTafsir(e) {
  return `<div class="column border p-2 mt-2 rounded-2" id="${e.ayat}">
              <p class="ms-2">${e.ayat}</p> 
              <p>${e.teks}</p>
          </div>`;
}

function pilihAyat(e) {
  return `<li><a class="dropdown-item-text" href="#${e.nomorAyat}">Ayat ${e.nomorAyat}</a></li>`;
}

function surahNames(data) {
  return `<h3 class="d-flex justify-content-center fs-2">${data[0]}</h3>
          <p class="d-flex justify-content-center">${data[1]} ${data[2]} ayat</p>`;
}
