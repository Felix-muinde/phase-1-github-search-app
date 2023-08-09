document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById("films");
  const movieDetails = document.getElementById("movie-details");

  // Fetch movies data from JSON file
  fetch("http://localhost:3000/films") // Replace with the actual JSON server endpoint
      .then(response => response.json())
      .then(data => {
          data.forEach(movie => {
              const listItem = document.createElement("li");
              listItem.className = "film item";
              listItem.textContent = movie.title;
              listItem.addEventListener("click", () => displayMovieDetails(movie));
              filmsList.appendChild(listItem);
          });
      });

  // Display movie details
  function displayMovieDetails(movie) {
      const availableTickets = movie.capacity - movie.tickets_sold;

      movieDetails.innerHTML = `
          <div>
              <img src="${movie.poster}" alt="${movie.title}" />
              <h2>${movie.title}</h2>
              <p>Runtime: ${movie.runtime} minutes</p>
              <p>Showtime: ${movie.showtime}</p>
              <p>Available Tickets: ${availableTickets}</p>
              <button id="buy-ticket">Buy Ticket</button>
          </div>
      `;

      const buyButton = document.getElementById("buy-ticket");
      buyButton.addEventListener("click", () => buyTicket(movie));
  }

  // Buy ticket
  function buyTicket(movie) {
      const availableTickets = movie.capacity - movie.tickets_sold;

      if (availableTickets > 0) {
          movie.tickets_sold++;
          const updatedAvailableTickets = movie.capacity - movie.tickets_sold;
          const availableTicketsElement = document.querySelector("#movie-details p:nth-child(4)");
          availableTicketsElement.textContent = `Available Tickets: ${updatedAvailableTickets}`;
      } else {
          alert("Sorry, this show is sold out.");
      }
  }
});
