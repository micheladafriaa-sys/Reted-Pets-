// RPTS — Rated Pets
// Sistema de valores, variantes y buscador


// ⭐ PETS DESTACADAS

const featuredPets = [
  {
    name: "Bat Dragon",
    id: "bat-dragon-value"
  },
  {
    name: "Shadow Dragon",
    id: "shadow-dragon-value"
  },
  {
    name: "Giraffe",
    id: "giraffe-value"
  },
  {
    name: "Frost Dragon",
    id: "frost-dragon-value"
  }
];

featuredPets.forEach(featured => {

  const pet = pets.find(p => p.name === featured.name);
  const element = document.getElementById(featured.id);

  if (pet && element) {
    element.textContent = `Valor: ${pet.value}`;
  }

});


// 💊 VALOR DE POCIÓN

function getPotionValue(value, potion, exception = false) {

  if (exception) {

    if (potion === "R") return value - 1;
    if (potion === "F") return value - 1;
    if (potion === "FR") return value - 2;

  } else {

    if (potion === "R") return value + 1;
    if (potion === "F") return value + 1.5;
    if (potion === "FR") return value + 2.5;

  }

  return value;
}


// ✨ NEON

function getNeonValue(value) {
  return value * 3.5;
}


// 🌈 MEGA

function getMegaValue(value) {
  return value * 3.5;
}


// 🔎 BUSCADOR

const searchInput = document.getElementById("pet-search");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {

  const searchText = searchInput.value.toLowerCase().trim();

  if (searchText === "") {
    searchResults.innerHTML = "";
    return;
  }


  const results = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchText)
  );


  if (results.length === 0) {

    searchResults.innerHTML =
      "<p>No encontramos esa mascota 🐾</p>";

    return;
  }


  searchResults.innerHTML = results.map(pet => {

    const normal = pet.value;

    const neon = getNeonValue(normal);

    const mega = getMegaValue(neon);

    const r = getPotionValue(normal, "R", pet.potionException);
    const f = getPotionValue(normal, "F", pet.potionException);
    const fr = getPotionValue(normal, "FR", pet.potionException);

    const neonR = getPotionValue(neon, "R", pet.potionException);
    const neonF = getPotionValue(neon, "F", pet.potionException);
    const neonFR = getPotionValue(neon, "FR", pet.potionException);

    const megaR = getPotionValue(mega, "R", pet.potionException);
    const megaF = getPotionValue(mega, "F", pet.potionException);
    const megaFR = getPotionValue(mega, "FR", pet.potionException);


    return `

      <div class="search-result">

        <h3>🐾 ${pet.name}</h3>

        <p>💎 Normal: <strong>${normal}</strong></p>

        <p>💊 R: <strong>${r}</strong></p>
        <p>💊 F: <strong>${f}</strong></p>
        <p>💊 FR: <strong>${fr}</strong></p>

        <p>✨ Neon: <strong>${neon}</strong></p>

        <p>✨ Neon R: <strong>${neonR}</strong></p>
        <p>✨ Neon F: <strong>${neonF}</strong></p>
        <p>✨ Neon FR: <strong>${neonFR}</strong></p>

        <p>🌈 Mega Neon: <strong>${mega}</strong></p>

        <p>🌈 Mega R: <strong>${megaR}</strong></p>
        <p>🌈 Mega F: <strong>${megaF}</strong></p>
        <p>🌈 Mega FR: <strong>${megaFR}</strong></p>

      </div>

    `;

  }).join("");

});
