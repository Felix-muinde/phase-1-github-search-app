const movieDetailsContainer = document.getElementById('movieDetails');
const moviesList = document.getElementById('moviesList');

// Fetch movie data from the local JSON DB server
async function fetchMovies() {
  try {
    const response = await fetch('/films');
    const moviesData = await response.json();
    return moviesData.films;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
}

// Display the movie details
function displayMovieDetails(movie) {
  const { title, poster, runtime, showtime, capacity, tickets_sold, description } = movie;
  const ticketsAvailable = capacity - tickets_sold;
  const movieDetailsHTML = `
    <img src="${poster}" alt="${title}">
    <h2>${title}</h2>
    <p>Runtime: ${runtime} minutes</p>
    <p>Showtime: ${showtime}</p>
    <p>Description: ${description}</p>
    <p>Tickets Available: ${ticketsAvailable}</p>
    <button id="buyTicketButton">Buy Ticket</button>
  `;
  movieDetailsContainer.innerHTML = movieDetailsHTML;

  // Add event listener to the "Buy Ticket" button
  const buyTicketButton = document.getElementById('buyTicketButton');
  buyTicketButton.addEventListener('click', () => {
    if (ticketsAvailable > 0) {
      movie.tickets_sold++;
      displayMovieDetails(movie); // Update the ticket count
    } else {
      alert('Sorry, this showing is sold out!');
    }
  });
}

// Display the movies list
function displayMoviesList(movies) {
  moviesList.innerHTML = '';
  movies.forEach((movie) => {
    const { title, id, tickets_sold, capacity } = movie;
    const ticketsAvailable = capacity - tickets_sold;
    const movieItem = document.createElement('li');
    movieItem.textContent = title;
    movieItem.classList.add('film', 'item');
    if (ticketsAvailable === 0) {
      movieItem.classList.add('sold-out');
    }
    movieItem.addEventListener('click', () => displayMovieDetails(movie));
    moviesList.appendChild(movieItem);
  });
}

// Main function to initialize the app
async function initializeApp() {
  const movies = await fetchMovies();
  if (movies.length > 0) {
    displayMoviesList(movies);
    displayMovieDetails(movies[0]); // Display the details of the first movie by default
  } else {
    console.error('No movies found.');
  }
}

// Initialize the app
initializeApp();
