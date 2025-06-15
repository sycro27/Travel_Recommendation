async function searchRecommendation() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const response = await fetch("travel_recommendation_api.json");
  const data = await response.json();


  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results

  const allPlaces = [];


  // Extract cities from each country
  data.countries.forEach(country => {
    country.cities.forEach(city => {
      allPlaces.push({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description
      });
    });
  });

  // Add temples
  data.temples.forEach(temple => {
    allPlaces.push({
      name: temple.name,
      imageUrl: temple.imageUrl,
      description: temple.description
    });
  });

  // Add beaches
  data.beaches.forEach(beach => {
    allPlaces.push({
      name: beach.name,
      imageUrl: beach.imageUrl,
      description: beach.description
    });
  });

  // Filter results by name or description
  const matches = allPlaces.filter(place =>
    place.name.toLowerCase().includes(query) ||
    place.description.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = "<p>No matching destinations found.</p>";
    return;
  }

matches.forEach(place => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-text">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
    </div>
    <img src="${place.imageUrl}" alt="${place.name}">
  `;
  resultsContainer.appendChild(card);
});
}
