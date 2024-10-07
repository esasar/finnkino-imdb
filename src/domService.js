/*
* Injects the IMDB score into the DOM
*
* @param {Element} item - The item element
* @param {String} score - The IMDB score
*/
const injectScoreIntoItem = (item, score) => {
  const element = item.querySelector('.event-icon-descriptors.margin-top-quarter');
  // dont allow score to be injected multiple times
  if (element && element.querySelector('#imdb-score') === null) {
    const scoreElement = createSVGNumber(score);
    scoreElement.id = 'imdb-score';
    element.appendChild(scoreElement);
  }
};

/*
* Gets the movie container items from the document
*
* @param {Document} document - The document to search
* @return {NodeList} - The movie container items
*/
const getMovieContainerItems = (document) => {
  const items = document.querySelectorAll('.show-list-item-inner');
  return items;
};

/*
* Gets the movie title from the item
*
* @param {Element} item - The movie item
* @return {String} - The movie title
*/
const getMovieTitleFromItem = (item) => {
  const h1 = item.querySelector('h1.eventName');
  if (!h1) return null;

  const anchor = h1.querySelector('a');
  if (!anchor) return null;

  return anchor.textContent.trim();
};

/*
* Creates an image element with the given number
*
* @param {String} number - The number to display
* @return {Element} - The image element
*/
const createSVGNumber = (number) => {
  // SVG namespace
  const svgNS = 'http://www.w3.org/2000/svg';

  // create new SVG element
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '26');
  svg.setAttribute('height', '26');
  svg.setAttribute('viewBox', '0 0 26 26');

  // create a circle
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', '13');
  circle.setAttribute('cy', '13');
  circle.setAttribute('r', '13');
  circle.setAttribute('fill', '#373737');

  // create a text element with the number
  const text = document.createElementNS(svgNS, 'text');
  text.setAttribute('x', '13');
  text.setAttribute('y', '18');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('alignment-baseline', 'middle');
  text.setAttribute('font-size', '13');
  text.setAttribute('fill', '#ffffff');
  text.textContent = number;

  // add circle and text to our SVG
  svg.appendChild(circle);
  svg.appendChild(text);

  // serialize SVG to string to create an image element
  const svgData = new XMLSerializer().serializeToString(svg);
  // create a blob URL from the SVG data, because we can't set the SVG directly as the image source
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  // create an image element with the SVG as the source
  const img = document.createElement('img');
  img.setAttribute('src', url);
  img.setAttribute('width', '26');
  img.setAttribute('height', '26');

  return img;
};

export { injectScoreIntoItem, getMovieContainerItems, getMovieTitleFromItem };