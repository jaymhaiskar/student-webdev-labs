const pokemonColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#ea7ce8',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const container = document.getElementById('pokemon-container');
const navbar = document.querySelector('.navbar');

const searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.placeholder = 'Search Pokémon...';
searchBox.classList.add('search-box');
navbar.appendChild(searchBox);

let allPokemon = [];

async function fetchPokemon() {
  container.innerHTML = `
    <div class="loading-container">
      <img src="images/loader.gif" class="loader" alt="Loading">
      <p>Fetching data...</p>
    </div>
  `;

  try {
    const requests = [];

    for (let i = 1; i <= 25; i++) {
      requests.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch Pokémon');
            }
            return response.json();
          })
      );
    }

    allPokemon = await Promise.all(requests);

    displayPokemon(allPokemon);

  } catch (error) {
    container.innerHTML = '<p class="no-results">Error loading Pokémon.</p>';
    console.error(error);
  }
}

function displayPokemon(pokemonList) {
  container.innerHTML = '';

  if (pokemonList.length === 0) {
    container.innerHTML = '<p class="no-results">No Pokémon found.</p>';
    return;
  }

  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const name = document.createElement('h2');
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;

    const image = document.createElement('img');
    image.classList.add('pokemon-image');
    image.src = pokemon.sprites.other['official-artwork'].front_default;
    image.alt = pokemon.name;

    const typesContainer = document.createElement('div');
    typesContainer.classList.add('pokemon-types');

    pokemon.types.forEach(typeInfo => {
      const type = document.createElement('span');
      type.classList.add('pokemon-type');

      const typeName = typeInfo.type.name;
      type.textContent = typeName;
      type.style.backgroundColor = pokemonColors[typeName];

      typesContainer.appendChild(type);
    });

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(typesContainer);

    container.appendChild(card);
  });
}

searchBox.addEventListener('input', () => {
  const query = searchBox.value.toLowerCase().trim();

  const filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query)
  );

  displayPokemon(filteredPokemon);
});

fetchPokemon();
