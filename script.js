//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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
