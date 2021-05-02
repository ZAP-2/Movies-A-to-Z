//   Make namespace object
const movieApp = {}; 
// Create init function/call at the bottom of the page.
movieApp.init = () => {
  console.log("this is the init function")
  
}
// Cache existing html selectors we will need for appending
movieApp.defaultMovieSelection = document.querySelector('.default-movie');
movieApp.userMovieSelection = document.querySelector('.user-movie');
movieApp.startButton = document.querySelector('.start-button')
console.log(movieApp.defaultMovieSelection);
console.log(movieApp.userMovieSelection);
console.log(movieApp.startButton);

// Add event listener to submit button
movieApp.startButton.addEventListener('click', function(){
  console.log('boop');
  // RETURN VALUES:
  // Poster url to give us image
  // Title of the movie
  // Plot text content
  const currentMovie = movieApp.getMovieTitle();
  // console.log(currentMovie);
  movieApp.getMovieInfo(currentMovie); //calls the API using the currentMovie name from our array
  // hides button upon game initiation 
  this.classList.add('hide');
})

// (1) NAMESPACE VARIABLES GLOBAL SCOPE
const url = new URL('http://www.omdbapi.com/');
const key = 'ba8abefc';
const favMovies = ["Teen Wolf", "Fateful Findings", "The Lighthouse", "Old Boy", "Harold and Maude", "Sicario", "The Room", "Hot Fuzz", "The Big Lebowski", "No Country For Old Men", "Alien", "The Bourne Identity"];
// use this to filter what the user can search for (naughty naughty)
const forbiddenGenre = "Adult";

// THIS WILL BE THE FUNCTION THAT WILL PRINT THE INITIAL MOVIE POSTER (using the array of movie titles we've created)

// GET MOVIE TITLE
movieApp.getMovieTitle = () => {
  let i = 0;
  const currentMovieTitle = favMovies[i];
  // const info = movieApp.getMovieInfo(currentMovieTitle);
  // console.log(info);
  return currentMovieTitle;
}
// (2) GET MOVIE POSTER
movieApp.getMovieInfo = (title, imdbCode) => {

  url.search = new URLSearchParams({
    apikey: key,
    t: title,
    i: imdbCode,
    type: 'movie'
  })

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonResult) => {
      // console.log(jsonResult.Genre); 
      if (jsonResult.Genre === forbiddenGenre) {
        console.log('naughty naughty');
      } else {
        console.log('It worked!', jsonResult);
        // call the print function to 
        movieApp.printMovieInfo(jsonResult);
      }
    })
}

movieApp.printMovieInfo = (currentMovieObj) => {
  //destructuring for readability
  const { Title, Year, Plot, Poster } = currentMovieObj;

  const posterContainer = document.createElement('div');
  posterContainer.setAttribute('class', 'img-container')
  //creating image for poster content
  const poster = document.createElement('img');
  poster.src = Poster;
  poster.alt = Title;
  posterContainer.appendChild(poster);

  const infoContainer = document.createElement('div');
  infoContainer.setAttribute('class', 'info-container');
  infoContainer.innerHTML =  `<h3>${Title}<span>${Year}</span></h3><p>${Plot}</p>`;


  movieApp.defaultMovieSelection.appendChild(posterContainer);
  movieApp.defaultMovieSelection.appendChild(infoContainer);
  // console.log(currentMovieObj);
}



//      on topbutton click:
// clear html to repopulate the section
//   fetch the movie poster via the imdbID# using the random number variable. 
// 	create img and div elements to store the image data within
//   append container div / img to section along with movie title and plot below
//     button is replaced by text input which placeholder text prompting the user to “name a BETTER movie.”  (They should write a movie title here….”)

// When user submits their movie choice:
// fetch the data from the api using the title parameter
//   create img and div elements to store the image data within
//     append container div / img to section along with movie title and plot below, along side the randomly generated movie poster to compare
//       text input disappears, is placed by button which says “are you sure ?”

// When “are you sure ?” Button is clicked
//   a prompt will appear telling them if their movie is BETTER or WORSE(subject to change) than the DEFAULT movie based on IMDB rating score along with the text stating which one is the WINNER. 
// 	the above will be decided via conditionals based on the imdb rating property from within the objects returned from the api
//   the winning poster will scale slightly bigger to give a visual cue as to which one is the winner
//     topbutton reappears to restart the game





// (3) GENERATE imdbID#
// (3a) Create math.random function to generate a three digit # which will be used to randomize 3 digits within 7 digit imdbID
// const generateMovieID = () => {
//   const lastThreeDigits = Math.floor(Math.random() * (300) + 600); 
//   return `tt0500${lastThreeDigits}`
// }
// console.log(generateMovieID());

// getMoviePoster('', generateMovieID());

// 3(b)
// const generateMovieID = () => {
//   const sixDigits = Math.floor(Math.random() * (10000) + 280000);
//   return `tt0${sixDigits}`
// }
// console.log(generateMovieID());

// getMoviePoster('', generateMovieID());

// CREATE MATH.RANDOM FUNCTION TO SELECT MOVIE BASED ON imdbID#




// // DISPLAY POSTER FUNCTION
// function displayPoster(jsonResult) {
//   // const poster = document.createElement('img');
//   // const para = document.querySelector('p');
//   // poster.src = jsonResult.Poster;
//   // console.log(jsonResult.Poster);
//   // para.appendChild(poster);
//   console.log(jsonResult);
// }

// function displayUserPoster(jsonResult) {
//   movieApp.posterContainer = document.createElement('div.img-container')
//   movieApp.poster = document.createElement('img');
//   // const para = document.querySelector('p');
//   poster.src = jsonResult.Poster;
//   // console.log(jsonResult.Poster);
//   // para.appendChild(poster);
//   console.log(jsonResult);
// }
// displayUserPoster();


movieApp.init();