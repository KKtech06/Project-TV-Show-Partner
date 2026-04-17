function setup() {
  const message = document.getElementById("message");

  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(function (response) {
      return response.json();
    })
    .then(function (allEpisodes) {
      message.textContent = "";

      const selector = document.getElementById("show-select");
      for (const episode of allEpisodes) {
        const option = document.createElement("option");
        const code =
          "S" +
          String(episode.season).padStart(2, "0") +
          "E" +
          String(episode.number).padStart(2, "0");
        option.value = episode.id;
        option.textContent = code + " - " + episode.name;
        selector.appendChild(option);
      }

      selector.addEventListener("change", function () {
        const card = document.getElementById("episode-" + selector.value);
        card.scrollIntoView({ behavior: "smooth" });
      });

      const searchInput = document.getElementById("search");
      searchInput.addEventListener("input", function () {
        const term = searchInput.value.toLowerCase();
        const filtered = allEpisodes.filter(function (episode) {
          return (
            episode.name.toLowerCase().includes(term) ||
            episode.summary.toLowerCase().includes(term)
          );
        });
        makePageForEpisodes(filtered);
      });

      makePageForEpisodes(allEpisodes);
    })
    .catch(function () {
      message.textContent = "Something went wrong. Please try again.";
    });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  for (let episode of episodeList) {
    const card = document.createElement("div");
    card.classList.add("episode-card");
    card.id = "episode-" + episode.id;

    const title = document.createElement("h2");
    const image = document.createElement("img");
    const summary = document.createElement("p");

    title.textContent =
      episode.name +
      " - S" +
      episode.season.toString().padStart(2, "0") +
      "E" +
      episode.number.toString().padStart(2, "0");
    image.src = episode.image.medium;
    summary.innerHTML = episode.summary;

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(summary);
    rootElem.appendChild(card);
  }
}

window.onload = setup;
