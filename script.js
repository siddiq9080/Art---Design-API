document.addEventListener("DOMContentLoaded", () => {
  const artContainer = document.getElementById("art-container");
  const socialContainer = document.getElementById("social-container");

  /**
   * Fetches data from the Art Institute of Chicago API.
   * @returns {Promise<Array>} A promise that resolves to an array of art objects.
   */
  async function fetchArtData() {
    try {
      const response = await fetch("https://api.artic.edu/api/v1/artworks");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching art data:", error);
      return [];
    }
  }

  /**
   * Fetches data from a Social Media API.
   * @returns {Promise<Array>} A promise that resolves to an array of social media posts.
   */
  async function fetchSocialData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching social media data:", error);
      return [];
    }
  }

  /**
   * Creates a Bootstrap card element for an art piece.
   * @param {Object} art The art data object.
   */
  function createArtCard(art) {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12 mb-4";

    const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;

    const cardContent = `
        <div class="card">
          <div class="card-header text-center ">
            ${art.title}
          </div>
          <div class="card-body">
            <img src="${imageUrl}" class="card-img-top" alt="${art.title}">
            <p class="card-text mt-4"><strong>Artist:</strong> ${
              art.artist_title
            }</p>
            <p class="card-text"><strong>Category:</strong> ${art.category_titles.join(
              ", "
            )}</p>
            <p class="card-text"><strong>Medium:</strong> ${
              art.medium_display
            }</p>
          </div>
        </div>
      `;

    card.innerHTML = cardContent;
    artContainer.appendChild(card);
  }

  /**
   * Initializes the app by fetching art and social media data and displaying it.
   */
  async function init() {
    try {
      const [artData] = await Promise.all([fetchArtData()]);

      artData.forEach((art) => createArtCard(art));
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }

  // Initialize the app
  init();
});
