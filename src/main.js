import { fetchImdbRating } from './omdbService.js';
import { loadTitlesFromStorage, saveTitlesToStorage } from './storageService.js';
import { injectScoreIntoItem, getMovieContainerItems, getMovieTitleFromItem } from './domService.js';

// observe the DOM for changes
let timeoutId;
const observer = new MutationObserver((mutationsList) => {
  // throttle the function to avoid unnecessary calls
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // only check for relevant mutations
    const relevantMutations = mutationsList.some(mutation => mutation.type === 'childList');
    if (relevantMutations) {
      updateScores();
    }
  }, 300);
});

const updateScores = async () => {
  const items = getMovieContainerItems(document);
  const titles = loadTitlesFromStorage();
  let newTitlesAdded = false;

  const promises = Array.from(items).map(item => processItem(item, titles, () => { newTitlesAdded = true; }));

  await Promise.all(promises);

  if (newTitlesAdded) {
    saveTitlesToStorage(titles);
  }

  addScoreToItems(items);
};

const processItem = async (item, titles, onNewTitleAdded) => {
  const title = getMovieTitleFromItem(item);
  if (!title) return;

  if (!titles.has(title)) {
    try {
      const score = await fetchImdbRating(title);
      titles.set(title, score);
      onNewTitleAdded();
    } catch (error) {
      console.error(`Error fetching title ${title}:`, error);
      titles.set(title, 'N/A');
      onNewTitleAdded();
    }
  }
};

const addScoreToItems = (items) => {
  observer.disconnect();
  const titles = loadTitlesFromStorage();

  items.forEach(item => {
    const title = getMovieTitleFromItem(item);
    if (titles.has(title)) {
      const score = titles.get(title);
      injectScoreIntoItem(item, score);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

const initialize = () => {
  window.addEventListener('load', updateScores);
  observer.observe(document.body, { childList: true, subtree: true });
};

initialize();
