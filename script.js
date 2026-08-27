// RPTS — Rated Pets
// Sistema de valores, variantes, imágenes y buscador


// ⭐ PETS DESTACADAS

const featuredPets = [
  {
    name: "Bat Dragon",
    id: "bat-dragon-value",
    imageId: "bat-dragon-image"
  },
  {
    name: "Shadow Dragon",
    id: "shadow-dragon-value",
    imageId: "shadow-dragon-image"
  },
  {
    name: "Giraffe",
    id: "giraffe-value",
    imageId: "giraffe-image"
  },
  {
    name: "Frost Dragon",
    id: "frost-dragon-value",
    imageId: "frost-dragon-image"
  }
];


featuredPets.forEach(featured => {

  const pet = pets.find(p => p.name === featured.name);

  const valueElement = document.getElementById(featured.id);
  const imageElement = document.getElementById(featured.imageId);

  if (pet && valueElement) {
    valueElement.textContent = `Valor: ${pet.value}`;
  }

  if (pet && imageElement && pet.image) {
    imageElement.src = pet.image;
    imageElement.alt = pet.name;
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
// ⚖️ CALCULADORA RPTS

let givePets = [];
let receivePets = [];


// 🔎 BUSCAR PETS PARA "TÚ DAS"

const giveSearch = document.getElementById("give-search");
const giveResults = document.getElementById("give-results");

giveSearch.addEventListener("input", () => {
  showCalculatorResults(giveSearch, giveResults, "give");
});


// 🔎 BUSCAR PETS PARA "TÚ RECIBES"

const receiveSearch = document.getElementById("receive-search");
const receiveResults = document.getElementById("receive-results");

receiveSearch.addEventListener("input", () => {
  showCalculatorResults(receiveSearch, receiveResults, "receive");
});


// 🐾 MOSTRAR RESULTADOS

function showCalculatorResults(input, resultsBox, side) {

  const text = input.value.toLowerCase().trim();

  if (text === "") {
    resultsBox.innerHTML = "";
    return;
  }

  const results = pets.filter(pet =>
    pet.name.toLowerCase().includes(text)
  );

  if (results.length === 0) {
    resultsBox.innerHTML = "<p>No encontramos esa mascota 🐾</p>";
    return;
  }

  resultsBox.innerHTML = results.map((pet, index) => `
    <div class="calculator-pet-result"
         onclick="addPetToTrade('${side}', '${pet.name.replace(/'/g, "\\'")}')">
      🐾 ${pet.name} — ${pet.value}
    </div>
  `).join("");
}


// ➕ AGREGAR PET AL INTERCAMBIO

function addPetToTrade(side, petName) {

  const pet = pets.find(p => p.name === petName);

  if (!pet) return;

  const newPet = {
    ...pet,
    variant: "Normal",
    calculatedValue: pet.value
  };

  if (side === "give") {
    givePets.push(newPet);
    giveSearch.value = "";
    giveResults.innerHTML = "";
    renderTradeList("give");
  }

  if (side === "receive") {
    receivePets.push(newPet);
    receiveSearch.value = "";
    receiveResults.innerHTML = "";
    renderTradeList("receive");
  }

  updateTradeResult();
}


// 📋 MOSTRAR PETS AGREGADAS

function renderTradeList(side) {

  const list = side === "give"
    ? document.getElementById("give-list")
    : document.getElementById("receive-list");

  const petList = side === "give"
    ? givePets
    : receivePets;

  list.innerHTML = petList.map((pet, index) => `
    <div class="trade-pet">

      <div>
        <strong>${pet.name}</strong>
        <span>${pet.variant}</span>
      </div>

      <strong>${pet.calculatedValue}</strong>

      <button onclick="removeTradePet('${side}', ${index})">
        ✕
      </button>

    </div>
  `).join("");

  updateTradeTotal(side);
}


// ❌ ELIMINAR PET

function removeTradePet(side, index) {

  if (side === "give") {
    givePets.splice(index, 1);
    renderTradeList("give");
  }

  if (side === "receive") {
    receivePets.splice(index, 1);
    renderTradeList("receive");
  }

  updateTradeResult();
}


// 💰 ACTUALIZAR TOTAL

function updateTradeTotal(side) {

  const petList = side === "give"
    ? givePets
    : receivePets;

  const total = petList.reduce(
    (sum, pet) => sum + pet.calculatedValue,
    0
  );

  const totalElement = side === "give"
    ? document.getElementById("give-total")
    : document.getElementById("receive-total");

  totalElement.textContent = formatValue(total);
}


// ⚖️ COMPARAR TRADE

function updateTradeResult() {

  const giveTotal = givePets.reduce(
    (sum, pet) => sum + pet.calculatedValue,
    0
  );

  const receiveTotal = receivePets.reduce(
    (sum, pet) => sum + pet.calculatedValue,
    0
  );

  const result = document.getElementById("trade-result");

  if (giveTotal === 0 || receiveTotal === 0) {
    result.textContent = "Agrega mascotas para comparar ⚖️";
    return;
  }

  const difference = receiveTotal - giveTotal;
  const percentage = Math.abs(difference / giveTotal) * 100;

  if (percentage <= 5) {
    result.textContent = "⚖️ FAIR — El intercambio parece justo.";
  } 
  else if (difference > 0) {
    result.textContent = "🎉 WIN — Recibes más valor.";
  } 
  else {
    result.textContent = "😢 LOSE — Das más valor.";
  }
}


// 🔢 FORMATO DE VALORES

function formatValue(value) {

  if (Number.isInteger(value)) {
    return value;
  }

  return parseFloat(value.toFixed(2));
}
