// RPTS — Rated Pets
// Funciones principales de la plataforma

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
      <span>Valor: ${pet.value}</span>
    </div>
  `).join("");
});
