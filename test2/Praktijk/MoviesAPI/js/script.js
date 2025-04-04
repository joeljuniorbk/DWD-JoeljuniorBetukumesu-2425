// === CONFIG ===
const API_KEY = "399151bbd54ead216aa5ddfa43c4b606";
const BASE_URL = "https://api.themoviedb.org/3";

// === DOM ELEMENTEN ===
const form = document.getElementById("search-form");
const input = document.getElementById("title-input");
const movieResult = document.getElementById("movie-result");
const actorResult = document.getElementById("actor-result");

// === EVENT ===
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showMovieMessage("❗ Geef een titel in.");
    showActorMessage("❗ Geen zoekopdracht uitgevoerd.");
    return;
  }

  try {
    const movie = await zoekFilm(query);
    if (!movie) {
      showMovieMessage("❌ Geen resultaten gevonden.");
      showActorMessage("❌ Geen acteurinfo beschikbaar.");
      return;
    }

    toonFilm(movie);
    const actor = await haalHoofdacteurOp(movie.id);
    toonActeur(actor);
  } catch (err) {
    showMovieMessage("⚠️ Fout bij het ophalen van de film.");
    showActorMessage("⚠️ Fout bij het ophalen van acteurs.");
    console.error(err);
  }
});

// === FUNCTIES ===

// Zoek de film via TMDB Search API
async function zoekFilm(titel) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: titel,
    language: "nl-BE"
  });

  const response = await fetch(`${BASE_URL}/search/movie?${params}`);
  const data = await response.json();
  return data.results[0]; // pak de eerste match
}

// Toon de filminformatie
function toonFilm(film) {
  movieResult.innerHTML = `
    <h3>${film.title} (${film.release_date?.split("-")[0] || "?"})</h3>
    <p>${film.overview || "Geen omschrijving beschikbaar."}</p>
  `;
}

// Geef een melding in de filmsectie
function showMovieMessage(msg) {
  movieResult.innerHTML = `<p class="placeholder">${msg}</p>`;
}

// Haal de hoofdacteur op via credits endpoint
async function haalHoofdacteurOp(filmId) {
  const response = await fetch(`${BASE_URL}/movie/${filmId}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data.cast[0]; // eerste persoon in cast-array
}

// Toon de acteurinformatie
function toonActeur(actor) {
  if (!actor) {
    showActorMessage("❌ Geen acteur gevonden.");
    return;
  }

  actorResult.innerHTML = `
    <h3>${actor.name}</h3>
    <p>Rol: ${actor.character}</p>
  `;
}

// Melding tonen in acteursectie
function showActorMessage(msg) {
  actorResult.innerHTML = `<p class="placeholder">${msg}</p>`;
}
