window.onload = setup;
// getAllShows() is defined on file shows.js
const shows = getAllShows();
let allEpisodes;
let selectedShowInfo;

function setup() {
  loadAllShows();
  makePageForShows();
  searchFunc();
}

const rootElem = document.getElementById('root');
//a container for all episodes
let divContainer = createHtmlElement('div');
divContainer.className = 'container';
//Create and append select show list
let showList = createHtmlElement('select');
showList.className = 'showSelect';
showList.addEventListener('change', searchShow);
//Create and append select episode list
let episodeSelectList = createHtmlElement('select');
episodeSelectList.className = 'episodeSelect';
episodeSelectList.addEventListener('change', searchEpisode);
// create a legend for search boxes
let searchBox = createHtmlElement('legend');
// eslint-disable-next-line no-restricted-properties
searchBox.innerHTML = 'Search';
searchBox.appendChild(showList);
searchBox.appendChild(episodeSelectList);
rootElem.appendChild(searchBox).className = 'search';
let searchInput = createHtmlElement('input');
searchInput.placeholder = 'your search item...';
searchBox.appendChild(searchInput);
searchInput.setAttribute('type', 'text');
let searchLabel = createHtmlElement('h3');
searchLabel.className = 'searchEpisode';
searchBox.appendChild(searchLabel);
//go back navigation button
let goBackButton = createHtmlElement('button');
goBackButton.className = 'back-button';
goBackButton.innerText = 'Home';
searchBox.appendChild(goBackButton);
rootElem.appendChild(divContainer);

goBackButton.addEventListener('click', () => {
  showList.style.display = '';
  // eslint-disable-next-line no-restricted-properties
  divShow.innerHTML = '';
  makePageForShows(shows);
  searchFunc();
});

function createHtmlElement(element) {
  return document.createElement(element);
}

function loadAllShows() {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1));
  //Create and append the options of select input of shows
  let option1 = document.createElement('option');
  option1.value = '--All Shows--';
  option1.text = '--All Shows--';
  showList.appendChild(option1);
  for (let index = 0; index < shows.length; index++) {
    let option = document.createElement('option');
    option.text = shows[index].name;
    showList.appendChild(option);
  }
}
showList.addEventListener('change', selectedShow);

function selectedShow() {
  if (showList.value === '--All Shows--') {
    // eslint-disable-next-line no-restricted-properties
    divShow.innerHTML = '';
    makePageForShows();
  } else {
    goBackButton.style.display = '';
    showList.style.display = 'none';
    episodeSelectList.style.display = '';
    // eslint-disable-next-lines no-restricted-properties
    episodeSelectList.innerHTML = '';
    divContainer.innerHTML = '';
    selectedShowInfo = shows.find((show) => show.name === showList.value);
    displayCurrentShow(selectedShowInfo);
    loadShowEpisodes();
  }
}

function makePageForShows() {
  goBackButton.style.display = 'none';
  episodeSelectList.style.display = 'none';
  // eslint-disable-next-lines no-restricted-properties
  episodeSelectList.innerHTML = '';
  divContainer.innerHTML = '';
  for (let i = 0; i < shows.length; i++) {
    renderSingleShow(shows[i]);
  }
}

function renderSingleShow(show) {
  let showCard = createHtmlElement('div');
  showCard.className = 'show-card';
  let showName = createHtmlElement('h1');
  // eslint-disable-next-line no-restricted-properties
  showName.innerHTML = show.name;
  showCard.appendChild(showName);
  showName.addEventListener('click', () => {
    goBackButton.style.display = '';
    showList.style.display = 'none';
    episodeSelectList.style.display = '';
    // eslint-disable-next-lines no-restricted-properties
    episodeSelectList.innerHTML = '';
    divContainer.innerHTML = '';
    selectedShowInfo = show;
    displayCurrentShow(selectedShowInfo);
    loadShowEpisodes();
  });
  let showImage = createHtmlElement('img');
  showImage.className = 'show-image';
  show.image === null || show.image === ''
    ? (showImage.src =
        'https://dozenpixels.com/static/img/blog/coming-soon.png')
    : (showImage.src = show.image.medium);

  showCard.appendChild(showImage);
  let showInfo = createHtmlElement('p');
  showInfo.className = 'show-info';
  // eslint-disable-next-line no-restricted-properties
  showInfo.innerHTML = `Rating: ${
    show.rating.average
  }, Generes: ${show.genres.join('|')}, Status: ${show.status}, Runtime: ${
    show.runtime
  }`;
  showCard.appendChild(showInfo);

  let showText = createHtmlElement('p');
  showText.className = 'show-summary truncate';
  show.summary === null || show.summary === ''
    ? (showText.innerText = ' The summary of this show is coming soon.')
    : (showText.innerText = show.summary.replace(/<\/?[^>]+(>|$)/g, ''));

  let toggleButton = createHtmlElement('button');
  let toggleStatus = 'less';
  toggleButton.innerText = '...Show more';
  toggleButton.className = 'show-more';
  toggleButton.addEventListener('click', () => {
    if (toggleStatus === 'less') {
      showText.classList.remove('truncate');
      toggleButton.innerText = '...Show less';
      toggleStatus = 'full';
    } else {
      showText.classList.add('truncate');
      toggleButton.innerText = '...Show more';
      toggleStatus = 'less';
    }
  });

  showCard.appendChild(showText);
  showCard.appendChild(toggleButton);
  divContainer.appendChild(showCard);
}

let divShow;

function displayCurrentShow(currentShow) {
  divShow = createHtmlElement('div');
  divShow.className = 'current-show';
  divContainer.appendChild(divShow);
  divContainer.before(divShow);
  let divLink = createHtmlElement('div');
  divLink.className = 'current-show-title';
  divShow.appendChild(divLink);

  let link = createHtmlElement('a');
  link.className = 'link-title';
  divLink.appendChild(link);

  link.innerText = currentShow.name;

  let containerShow = createHtmlElement('div');
  containerShow.className = 'current-show-container';
  divShow.appendChild(containerShow);

  let divImage = createHtmlElement('div');
  containerShow.appendChild(divImage);

  let imageShow = createHtmlElement('img');
  imageShow.className = 'current-show-image';
  divImage.appendChild(imageShow);

  if (currentShow.image === null || currentShow.image === '') {
    imageShow.src = 'https://dozenpixels.com/static/img/blog/coming-soon.png';
  } else {
    imageShow.src = currentShow.image.medium;
  }

  let summaryDiv = createHtmlElement('div');
  containerShow.appendChild(summaryDiv);

  let showSummary = createHtmlElement('p');
  showSummary.className = 'current-show-summary';
  if (currentShow.summary === null || currentShow.summary === '') {
    showSummary.innerText = 'The summary of this show is coming soon.';
  } else {
    showSummary.innerText = currentShow.summary.replace(/<\/?[^>]+(>|$)/g, '');
  }
  summaryDiv.appendChild(showSummary);

  let detailsDiv = createHtmlElement('div');
  detailsDiv.className = 'current-show-info';
  containerShow.appendChild(detailsDiv);
  let rated = createHtmlElement('p');
  rated.innerText = `Rating: ${currentShow.rating.average}`;
  detailsDiv.appendChild(rated);
  let genre = createHtmlElement('p');
  genre.innerText = `Genres: ${currentShow.genres.join('|')}`;
  detailsDiv.appendChild(genre);
  let status = createHtmlElement('p');
  status.innerText = `Status: ${currentShow.status}`;
  detailsDiv.appendChild(status);
  let runtime = createHtmlElement('p');
  runtime.innerText = `Runtime: ${currentShow.runtime}`;
  detailsDiv.appendChild(runtime);
}
//fetch show episodes
function loadShowEpisodes() {
  let selectedUrl = `https://api.tvmaze.com/shows/${selectedShowInfo.id}/episodes`;
  fetch(selectedUrl)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      selectInputLoad(allEpisodes);
    })
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  for (let i = 0; i < episodeList.length; i++) {
    renderSingleEpisode(episodeList[i]);
  }
  searchFunc();
}

function renderSingleEpisode(episode) {
  // Creating a div element for each episode
  let divElement = createHtmlElement('Div');
  divElement.className = 'episodeContainer';
  divContainer.appendChild(divElement);
  // Adding h1 to it as a title
  let h1Elem = createHtmlElement('h1');
  // eslint-disable-next-line no-restricted-properties
  h1Elem.innerHTML =
    episode.name +
    ' - S' +
    episode.season.toString().padStart(2, '0') +
    'E' +
    episode.number.toString().padStart(2, '0');
  divElement.appendChild(h1Elem);
  // Adding an image to the episode
  let imageElem = createHtmlElement('img');
  imageElem.className = 'episode-image';
  if (episode.image === null || episode.image === '') {
    imageElem.src = 'https://dozenpixels.com/static/img/blog/coming-soon.png';
  } else {
    imageElem.src = episode.image.medium;
  }

  divElement.appendChild(imageElem);
  // Adding a paragraph to it as a summary of the episode
  let paragraph = createHtmlElement('P');
  paragraph.className = 'episode-summary';
  episode.summary === null || episode.summary === ''
    ? (paragraph.innerText = ' The summary of this episode is coming soon.')
    : (paragraph.innerText = episode.summary.replace(/<\/?[^>]+(>|$)/g, ''));

  divElement.appendChild(paragraph);
}

// Search by Listening for keystroke events
searchInput.addEventListener('keyup', searchFunc);
// filtering  the search
function searchFunc() {
  if (episodeSelectList.style.display === '') {
    searchEpisode();
  } else {
    searchShow();
  }
}

// a function Loading the episode select menu list
function selectInputLoad(episodeList) {
  //Create and append the options of select input
  let option1 = createHtmlElement('option');
  option1.value = 'All Episodes';
  option1.text = 'All Episodes';
  episodeSelectList.appendChild(option1);
  for (let index = 0; index < episodeList.length; index++) {
    let option = createHtmlElement('option');
    option.text =
      'S' +
      episodeList[index].season.toString().padStart(2, '0') +
      'E' +
      episodeList[index].number.toString().padStart(2, '0') +
      ' - ' +
      episodeList[index].name;
    episodeSelectList.appendChild(option);
  }
}

function searchEpisode() {
  let epiListLength;
  let searchCount;
  let searchKey;
  if (searchInput.value === '') {
    if (episodeSelectList.value.substr(0, 6) === 'All Ep') {
      searchKey = '';
    } else {
      searchKey = episodeSelectList.value.substr(0, 6).toLowerCase();
    }
  } else {
    searchKey = searchInput.value.toLowerCase();
  }
  searchCount = 0;
  let arrayEpisodes = Array.from(
    document.querySelectorAll('.episodeContainer')
  );
  epiListLength = arrayEpisodes.length;
  arrayEpisodes.forEach((show) => {
    let textInfo = show.innerText.toLowerCase();
    if (textInfo.indexOf(searchKey) > -1) {
      show.style.display = '';
      searchCount += 1;
    } else {
      show.style.display = 'none';
    }
  });
  if (searchCount === 1) {
    searchLabel.innerText = `Displaying ${searchCount}/${epiListLength} episode`;
  } else {
    searchLabel.innerText = `Displaying ${searchCount}/${epiListLength} episodes`;
  }
}

function searchShow() {
  let showsListLength;
  let searchCount;
  let searchKey;
  searchKey = searchInput.value.toLowerCase();
  searchCount = 0;

  let showsArray = Array.from(document.querySelectorAll('.show-card'));
  showsListLength = showsArray.length;
  showsArray.forEach((show) => {
    let textInfo = show.innerText.toLowerCase();
    if (textInfo.indexOf(searchKey) > -1) {
      show.style.display = '';
      searchCount += 1;
    } else {
      show.style.display = 'none';
    }
  });
  if (searchCount === 1) {
    searchLabel.innerText = `Displaying ${searchCount}/${showsListLength} show`;
  } else {
    searchLabel.innerText = `Displaying ${searchCount}/${showsListLength} shows`;
  }
}
// Link to the source of data href', 'https://www.tvmaze.com/api#licensing'
const info = createHtmlElement('a');
const infoPar = createHtmlElement('h4');
infoPar.id = 'tvLink';
info.setAttribute('href', 'https://www.tvmaze.com/api#licensing');
infoPar.innerText = 'The data has (originally) come from  ';
info.innerText = 'tvmaze.com.';
infoPar.appendChild(info);
document.body.appendChild(infoPar);
