//  FORMATTING FUNCTIONS

function formatFavorite(fav) {
    return {
        cityLabel: `${fav.city} (${fav.country})`,
        temperatureLabel: `${fav.temperature ?? '--'}°C`
    };
}

//  DOM CREATION FUNCTIONS

function createFavoriteItem(fav, formatted) {
    const li = document.createElement("li");

    const city = document.createElement("span");
    city.className = "fav-city";
    city.innerHTML = `<strong>${formatted.cityLabel}</strong>`;

    const temp = document.createElement("span");
    temp.className = "fav-temp";
    temp.textContent = formatted.temperatureLabel;

    const del = document.createElement("button");
    del.className = "delete-fav";
    del.dataset.id = fav.id;
    del.textContent = "X";

    li.appendChild(city);
    li.appendChild(temp);
    li.appendChild(del);

    return li;
}

//  RENDERING FUNCTIONS

function renderFavorites(favorites) {
    const list = document.getElementById("favorites-list");
    const title = document.getElementById("favorites-title");
    const excelBtn = document.getElementById("excel-btn");

    list.innerHTML = "";

    if (!Array.isArray(favorites)) {
        title.textContent = "Devi eseguire l'accesso";
        excelBtn.style.display = "none";
        return;
    }

    if (favorites.length === 0) {
        title.textContent = "Nessun preferito";
        excelBtn.style.display = "none";
    } else {
        title.textContent = "I tuoi preferiti";
        excelBtn.style.display = "block";
    }

    favorites.forEach(fav => {
        const formatted = formatFavorite(fav);
        const li = createFavoriteItem(fav, formatted);

        updateTemperatureFromAPI(fav, li.querySelector(".fav-temp"));

        li.addEventListener("click", () => {
            hideError();

            fillForm({
                city: fav.city,
                country: fav.country,
                temperature: fav.temperature,
                description: fav.description,
                latitude: fav.latitude,
                longitude: fav.longitude
            });

            updateMap(fav.latitude, fav.longitude);
            document.getElementById("weather-result").style.display = "block";

            document.getElementById("weather-result").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        li.querySelector(".delete-fav").addEventListener("click", ev => {
            ev.stopPropagation();
            deleteFavorite(fav.id);
        });

        list.appendChild(li);
    });
}

//  API FUNCTIONS

async function loadFavorites() {
    const res = await fetch("/cities");

    if (!res.ok) {
        renderFavorites([]);
        return;
    }

    const data = await res.json();
    renderFavorites(data);
}

async function updateTemperatureFromAPI(fav, tempSpan) {
    const res = await fetch("/meteo/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ city: fav.city })
    });

    if (!res.ok) return;

    const data = await res.json();

    if (!data.error) {
        tempSpan.textContent = data.temperature + "°C";

        fav.temperature = data.temperature;
        fav.description = data.description;

        updateFavorite(fav.id, fav.temperature, fav.description);
    }
}

function addFavorite(city, country, lat, lon, temperature, description) {
    fetch("/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            city,
            country,
            latitude: lat,
            longitude: lon,
            temperature,
            description
        })
    })
        .then(res => res.json())
        .then(() => loadFavorites());
}

function updateFavorite(id, temperature, description) {
    fetch(`/cities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperature, description })
    });
}

function deleteFavorite(id) {
    fetch(`/cities/${id}`, { method: "DELETE" })
        .then(() => loadFavorites());
}

//  SHOW/HIDE FAVORITES

document.addEventListener("DOMContentLoaded", () => {
    loadFavorites();

    const toggle = document.getElementById("toggle-favorites");
    const box = document.getElementById("favorites-box");

    toggle.addEventListener("click", () => {
        box.classList.toggle("hidden");

        toggle.textContent = box.classList.contains("hidden")
            ? "⭐ Mostra Preferiti"
            : "⭐ Nascondi Preferiti";
    });
});
