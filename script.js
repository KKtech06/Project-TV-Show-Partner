function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

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
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  for (let episode of episodeList) {
    const card = document.createElement("div");
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
