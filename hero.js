// Marvel API credentials
const publicKey = 'd0f87a7b512d5a65d2ba06b955aaf7e4';
const privateKey = '076cc2ea665fed4acf65d8ddfd2280405a7ce1b8';

// Generate the hash
const ts = new Date().getTime();
const hash = generateHash(ts, privateKey, publicKey);

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('id');
    const heroDetails = document.getElementById('hero-details');



    // Function to fetch hero details
    const fetchHeroDetails = async (id) => {
        const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayHeroDetails(data.data.results[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (heroId) {
        fetchHeroDetails(heroId);
    }

    // Function to display hero details
    const displayHeroDetails = (hero) => {
        const imageContainer = document.querySelector(".image-container");
        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.alt = `${hero.name}`;
        img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
        imageContainer.append(img);
        const content = document.querySelector(".content");
        const heading = document.createElement("h3");
        heading.textContent = `${hero.name}`;
        content.append(heading);
        const ul = document.createElement("ul");
        ul.classList.add("list-group");
        ul.classList.add("list-group-flush");
        const li = document.createElement("li");
        li.classList.add("list-group-item")
        li.textContent = `${hero.description || 'No description available'}`;
        ul.appendChild(li);
        content.append(ul);
        const div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML = `
            <div class="col-md-6">
                ${generateDetailsSection('Comics', hero.comics.items)}
                ${generateDetailsSection('Series', hero.series.items)}
            </div>
            <div class="col-md-6">
                ${generateDetailsSection('Stories', hero.stories.items)}
                ${generateDetailsSection('Events', hero.events.items)}
            </div>
        `

        heroDetails.appendChild(div);
    };

    // Function to generate details section
    const generateDetailsSection = (title, items) => {
        if (items.length === 0) {
            return `<h3>${title}:</h3>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item shadow"> 
                            No ${title.toLowerCase()} available.
                        </li>
                    </ul>`;
        }
        return `
            <h3 class="text-uppercase">${title}:</h3>
            <ul class="list-group list-group-flush">
                ${items.map(item => `<li class="list-group-item shadow">${item.name}</li>`).join('')}
            </ul>
        `;
    };
    const imageContainer = document.querySelector('.image-container');
    const content = document.querySelector('.content');

    imageContainer.addEventListener('mouseenter', () => {
        content.style.opacity = 1;
    });

    imageContainer.addEventListener('mouseleave', () => {
        content.style.opacity = 0;
    });

});


