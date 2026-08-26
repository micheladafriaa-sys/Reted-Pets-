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


// 💊 CALCULAR VALOR SEGÚN POCIÓN

function getPotionValue(pet, potion = "none") {

  const base = pet.value;

  // Pets donde las pociones disminuyen el valor
  if (pet.potionException) {

    if (potion === "R") {
      return base - 1;
    }

    if (potion === "F") {
      return base - 1;
    }

    if (potion === "FR") {
      return base - 2;
    }

    return base;
  }


  // Regla normal de RPTS

  if (potion === "R") {
    return base + 1;
  }

  if (potion === "F") {
    return base + 1.5;
  }

  if (potion === "FR") {
    return base + 2.5;
  }

  return base;
}


// ✨ CALCULAR NEON

function getNeonValue(pet) {

  return pet.value * 3.5;

}


// 🌈 CALCULAR MEGA NEON

function getMegaValue(pet) {

  return getNeonValue(pet) * 3.5;

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


  searchResults.innerHTML = results.map(pet => `

    <div class="search-result">

      <strong>${pet.name}</strong>

      <span>
        Valor: ${pet.value}
      </span>

    </div>

  `).join("");

});
