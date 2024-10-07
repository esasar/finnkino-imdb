const config = {
  apiKey: 'YOUR_KEY_HERE',
  apiBaseUrl: 'https://www.omdbapi.com/',
};

/*
* Fetches the IMDB score of a movie from the OMDB API
*
* This function is not very robust, since it assumes that the result given by the API is always correct.
* The API also does not support Finnish movie titles, so translated titles or domestic movies
* will not work.
*
* @param {String} title - The title of the movie
* @return {String} - The IMDB rating of the movie or 'N/A' if movie wasnt found or it has no rating
*/
const fetchImdbRating = async (title) => {
  const apiUrl = `${config.apiBaseUrl}?apikey=${config.apiKey}&t=${encodeURIComponent(title)}&type=movie`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.Response === 'True') {
      return data.imdbRating || 'N/A';
    } else {
      console.log('Movie not found:', title);
      return 'N/A';
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export { fetchImdbRating };