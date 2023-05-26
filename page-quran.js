// // hit data dari API
// const search = document.querySelector(".inputUser");
// const suratContainer = document.querySelector(".isiSurat");
// const showList = () => {
//   fetch("https://equran.id/api/v2/surat")
//     .then((response) => response.json())
//     .then((response) => {
//       const semuaSurat = response.data;
//       console.log(semuaSurat);

//       let container = "";
//       semuaSurat.forEach((s) => {
//         container += showSurat(s);
//       });

//       suratContainer.innerHTML = container;
//     });
// };
// showList();

// search.addEventListener("input", (event) => {
//   search_term = event.target.value.toLowerCase();
//   showList();
// });
// hit data dari API
const search = document.querySelector(".inputUser");
let suratContainer = document.querySelector(".isiSurat");
let search_term = "";

const showList = () => {
  fetch("https://equran.id/api/v2/surat")
    .then((response) => response.json())
    .then((response) => {
      const semuaSurat = response.data;
      let result = "";
      semuaSurat

        .filter((item) => {
          return item.namaLatin.toLowerCase().includes(search_term);
        })
        .forEach((s) => {
          result += showSurat(s);
        });
      suratContainer.innerHTML = result;
    });
};
showList();

search.addEventListener("input", (event) => {
  search_term = event.target.value.toLowerCase();
  showList();
});

// jika link di click
const clickLink = document.querySelectorAll(".isiNoSurah");
clickLink.forEach((link) => {
  link.addEventListener("click", function (columns) {
    const isiNo = this.dataset.isiNoSurah;
    fetch("https://equran.id/api/v2/surat" + isiNo)
      .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        const surah = data.ayat;
      });
  });
});

function showSurat(s) {
  return `<div onmouseover="hover(this)" onmouseout="normal(this)" class="my-width border my-1 mx-2">
            <a class="isiNoSurah" id="link-surah" data-noSurah="${s.nomor}" href="surah/surah.html?nomor_surah=${s.nomor}">
              <p class="ms-2">${s.nomor}. ${s.namaLatin}</p>
              <h3 class="me-2 text-end">${s.nama}</h3>
              <p class="me-2 text-end">${s.arti}</p>
            </a>
        </div>`;
}

function hover(x) {
  x.style.backgroundColor = "#23DC64";
}
function normal(x) {
  x.style.backgroundColor = "#ffffff";
}
