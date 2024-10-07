# IMDb rating for Finnkino website Firefox extension

This browser extension automatically fetches (IMDb)[https://www.imdb.com/] ratings from (OMDB-api)[https://www.omdbapi.com/] for movies displayed on the (Finnkino)[https://www.finnkino.fi/] website and injects them into the page. This way you dont have to cross-check between sites when deciding which movie to see.

It detects movie titles from specific site elements and then appends a neat ```.svg``` to the items it detected with a score or ```N/A``` if it could not find the movie from the database. 

Does not work very well with translated titles or domestic (Finnish) movies. It also assumes that the first result results may be incorrect. 

## How to use
Note: you need to supply your own OMDB-api key to use this extension.
1. Clone or download this repository
2. Place your OMDB api-key to the ```domService.js``` config
3. Bundle by running ```npm install && npm run build```
4. Open your browser
  1. type ```about:debugging``` to the address bar
  2. Click ```This Firefox``` on the left sidebar
  3. Click ```Load Temporary Add-on...``` and select ```manifest.json``` in the downloaded repo
5. Enjoy
