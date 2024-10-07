/*
* Saves the movie score map to local storage
*
* @param {Map} titles - The movie titles
*/
const saveTitlesToStorage = (titles) => {
  const titlesObject = Object.fromEntries(titles);
  localStorage.setItem('movieTitles', JSON.stringify(titlesObject));
};

/*
* Loads the movie score map from local storage
*
* @return {Map} - The movie titles
*/
const loadTitlesFromStorage = () => {
  const existingTitlesJSON = localStorage.getItem('movieTitles');
  const existingTitles = existingTitlesJSON ? JSON.parse(existingTitlesJSON) : {};
  return new Map(Object.entries(existingTitles));
};

export { saveTitlesToStorage, loadTitlesFromStorage };