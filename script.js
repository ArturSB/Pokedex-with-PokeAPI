const nomePokemon = document.querySelector(".poke-name");
const numPokemon = document.querySelector(".poke-number");
const pokeImg = document.querySelector(".pokeIMG");
const form = document.querySelector(".form");
const input = document.querySelector(".input-busca");
const btnPrev = document.querySelector(".prev-btn");
const btnNext = document.querySelector(".next-btn");
let searchPokemon = 1;

const buscaPokemon = async (pokemon) => {
  const respostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (respostaAPI.status === 200) {
    const info = await respostaAPI.json();
    return info;
  }
};

const renderPokemon = async (pokemon) => {
  nomePokemon.innerHTML = "Buscando...";
  numPokemon.innerHTML = ``;

  const info = await buscaPokemon(pokemon);

  if (info) {
    pokeImg.style.display = "block";
    nomePokemon.innerHTML = info.name;
    numPokemon.innerHTML = info.id;
    pokeImg.src =
      info["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = info.id;
  } else {
    pokeImg.style.display = "none";
    nomePokemon.innerHTML = "Não encontrado";
    numPokemon.innerHTML = "";
  }
};

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
