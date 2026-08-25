// RPTS — Rated Pets
// Funciones principales de la plataforma

const batDragon = pets.find(pet => pet.name === "Bat Dragon");

if (batDragon) {
  document.getElementById("bat-dragon-value").textContent =
    `Valor: ${batDragon.value}`;
}
