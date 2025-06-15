async function searchRecommendation() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results

  let matches = data.places.filter(place =>
    place.keyword.toLowerCase().includes(query) ||
    place.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = "<p>No matching destinations found.</p>";
    return;
  }

  matches.forEach(place => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}" style="width:100%;max-width:400px;">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
