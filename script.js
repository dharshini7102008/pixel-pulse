const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const status = document.getElementById("status");
const results = document.getElementById("results");

searchForm.addEventListener("submit", searchImages);

async function searchImages(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === "") {
    status.textContent = "Please enter something to search.";
    return;
  }

  status.textContent = "Searching...";
  results.innerHTML = "";

  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=20`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    console.log(data);

    if (data.results.length === 0) {
      status.textContent = `No images found for "${query}".`;
      return;
    }

    status.textContent = `Showing ${data.results.length} results for "${query}".`;

    data.results.forEach((image) => {
      const card = document.createElement("article");

      card.innerHTML = `
        <img 
          src="${image.thumbnail || image.url}" 
          alt="${image.title || query}"
        >

        <h3>${image.title || "Untitled"}</h3>

        <p>By ${image.creator || "Unknown"}</p>
      `;

      results.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    status.textContent = "Something went wrong. Please try again.";
  }      }