// // let quotes = [];

// // fetch("quotes.json")
// //   .then(response => response.json())
// //   .then(data => {
// //     quotes = data;
// //     nextQuote();
// //   })
// //   .catch(error => {
// //     document.getElementById("quote").textContent = "Quotes failed to load.";
// //     console.error("Error loading quotes.json", error);
// //   });

// // function nextQuote() {
// //   if (quotes.length === 0) return;
// //   const randomIndex = Math.floor(Math.random() * quotes.length);
// //   const selected = quotes[randomIndex];

// //   const quoteBox = document.getElementById("quote");
// //   quoteBox.innerHTML = `
// //     <b>अध्याय ${selected.chapter}, श्लोक ${selected.verse}</b><br><br>
// //     <span style="font-size: 1.2rem;">${selected.text}</span><br><br>
// //     <span style="font-size: 1rem; color: #444;">अर्थ: ${selected.meaning}</span>
// //   `;
// // }

// let allShlokas = [];

// async function loadShlokas() {
//   const res = await fetch("selected_shlokas.json");
//   allShlokas = await res.json();
//   showRandomShloka();
// }

// function showRandomShloka() {
//   const rand = Math.floor(Math.random() * allShlokas.length);
//   const { chapter, verse, shloka, meaning } = allShlokas[rand];

//   document.getElementById("quote").innerHTML = `
//     <b>📜 अध्याय ${chapter}, श्लोक ${verse}</b><br><br>
//     <div style="font-size: 1.3rem;">${shloka}</div><br>
//     <div style="font-size: 1rem; color: #444;">🪷 अर्थ: ${meaning}</div>
//   `;
// }

// window.onload = loadShlokas;
// window.fetchRandomShloka = showRandomShloka;

let allShlokas = [];

async function loadShlokas() {
  try {
    const res = await fetch("selected_shlokas.json");
    if (!res.ok) throw new Error("selected_shlokas.json not found");
    allShlokas = await res.json();
  } catch (err) {
    console.warn("Falling back to all_shlokas_with_meaning.json", err);
    const res = await fetch("all_shlokas_with_meaning.json");
    allShlokas = await res.json();
  }
  showRandomShloka();
}

function showRandomShloka() {
  if (allShlokas.length === 0) {
    document.getElementById("quote").textContent = "No shlokas available.";
    return;
  }
  const rand = Math.floor(Math.random() * allShlokas.length);
  const s = allShlokas[rand];

  // support both data formats
  const chapter = s.chapter || s.chapter_number || "?";
  const verse = s.verse || s.verse_number || "?";
  const shloka = s.shloka || s.text || "";
  const meaning = s.meaning || s.verse_meaning_hindi || "";

  document.getElementById("quote").innerHTML = `
    <b>📜 अध्याय ${chapter}, श्लोक ${verse}</b><br><br>
    <div style="font-size: 1.3rem;">${shloka}</div><br>
    <div style="font-size: 1rem; color: #444;">🪷 अर्थ: ${meaning}</div>
  `;
}

window.onload = loadShlokas;
window.fetchRandomShloka = showRandomShloka;
