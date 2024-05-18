// Marvel API credentials
const publicKey = 'd0f87a7b512d5a65d2ba06b955aaf7e4';
const privateKey = '076cc2ea665fed4acf65d8ddfd2280405a7ce1b8';

// Generate the hash
const ts = new Date().getTime();
const hash = generateHash(ts, privateKey, publicKey);

// Base URL for Marvel API
const baseURL = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search-input');
    const heroesContainer = document.getElementById('heroes-container');

    // Function to fetch and display superheroes
    const fetchHeroes = async (query) => {
        const url = query ? `${baseURL}&nameStartsWith=${query}` : baseURL;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayHeroes(data.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to display heroes
    const displayHeroes = (heroes) => {
        heroesContainer.innerHTML = '';
        heroes.forEach(hero => {

            if (!hero.thumbnail.path.includes("image_not_available")) {
                const heroCard = document.createElement('div');
                heroCard.className = 'col-md-4 hero-card';
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                const img = document.createElement('img');
                img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
                img.className = 'card-img-top';
                img.alt = hero.name;
                cardDiv.appendChild(img);
                const cardBodyDiv = document.createElement('div');
                cardBodyDiv.className = 'card-body';
                cardDiv.appendChild(cardBodyDiv);
                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = hero.name;
                cardBodyDiv.appendChild(cardTitle);

                // Create the card-buttons div
                const cardButtonsDiv = document.createElement('div');
                cardButtonsDiv.className = 'card-buttons';
                cardBodyDiv.appendChild(cardButtonsDiv);

                const viewDetailsButton = document.createElement('button');
                viewDetailsButton.className = 'btn btn-primary';
                viewDetailsButton.innerHTML = 'View Details <i class="fa-regular fa-eye"></i>';
                viewDetailsButton.onclick = function () {
                    viewHero(hero.id);
                };
                cardButtonsDiv.appendChild(viewDetailsButton);

                const addToFavoritesButton = document.createElement('button');
                addToFavoritesButton.className = 'btn btn-success favorites';
                addToFavoritesButton.innerHTML = 'Add to Favorites <i class="fa-regular fa-heart"></i>';
                addToFavoritesButton.onclick = function () {
                    addToFavorites(hero.id, hero.name, `${hero.thumbnail.path}.${hero.thumbnail.extension}`);
                };
                cardButtonsDiv.appendChild(addToFavoritesButton);

                // Append the card to the container or body
                heroCard.appendChild(cardDiv);
                heroesContainer.appendChild(heroCard);
            }
        });
    };

    // Event listener for search input
    searchInput.addEventListener('keyup', () => {
        const query = searchInput.value.trim();
        fetchHeroes(query);
    });

    // Initial fetch to display heroes
    fetchHeroes();
});

// Function to view hero details
const viewHero = (id) => {
    window.location.href = `hero.html?id=${id}`;
};

// Function to add hero to favorites
const addToFavorites = (id, name, image) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(hero => hero.id === id)) {
        favorites.push({ id, name, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }
};
