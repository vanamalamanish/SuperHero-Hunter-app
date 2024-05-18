document.addEventListener("DOMContentLoaded", () => {
    const favoritesContainer = document.getElementById('favorites-container');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // display all the favorites exists in the localStorage
    const displayFavorites = () => {
        favoritesContainer.innerHTML = '';
        favorites.forEach(hero => {
            const heroCard = document.createElement('div');
            heroCard.className = 'col-md-4 hero-card';
            heroCard.innerHTML = `
                <div class="card">
                    <img src="${hero.image}" class="card-img-top" alt="${hero.name}">
                    <div class="card-body">
                        <h5 class="card-title">${hero.name}</h5>
                        <button class="btn btn-primary my-3" onclick="viewHero(${hero.id})">View Details <i class="fa-regular fa-eye"></i></button>
                        <button class="btn btn-danger my-2" onclick="removeFromFavorites(${hero.id})">Remove from Favorites <i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(heroCard);
        });
    };

    // Function to remove hero from favorites
    window.removeFromFavorites = (id) => {
        favorites = favorites.filter(hero => hero.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    };

    // Initial display of favorites
    displayFavorites();

    window.viewHero = (id) => {
        window.location.href = `hero.html?id=${id}`;
    };
});
