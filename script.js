//You can edit ALL of the code here
function setup () {
  const allEpisodes = getAllEpisodes ();
  makePageForEpisodes (allEpisodes);
}
const allEpisodes = getAllEpisodes ();
const rootElem = document.getElementById ('root');
let searchLabel = document.createElement ('label');
let searchBox = document.createElement ('input');

searchBox.setAttribute ('type', 'text');
document.body.appendChild (searchBox);
document.body.appendChild (searchLabel);
// Init a timeout variable to be used below
let timeout = null;
// Listen for keystroke events
searchBox.addEventListener ('keyup', function (e) {
  // Clear the timeout if it has already been set.
  clearTimeout (timeout);
  // Make a new timeout set to go off in 1 second
  timeout = setTimeout (function () {
    let results = [], key;
    let searchKey = searchBox.value;
    var regexp = new RegExp (searchKey, 'g');
    if (searchKey === '') {
      clearTimeout (timeout);
      makePageForEpisodes (allEpisodes);
    } else {
      for (let i = 0; i < allEpisodes.length; i++) {
        if (
          allEpisodes[i]['name'].match (regexp) ||
          allEpisodes[i]['summary'].match (regexp)
        ) {
          results.push (allEpisodes[i]);
          makePageForEpisodes (results);
        }
      }
      clearTimeout (timeout);
      searchLabel.innerHTML = `   Displaying ${results.length}/${allEpisodes.length} episode(s)`;
    }
  }, 1000);
});
function makePageForEpisodes (episodeList) {
  searchLabel.innerHTML = `   Displaying ${allEpisodes.length}/${allEpisodes.length} episode(s)`;
  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element for episode
    let divElement = document.createElement ('Div');
    divElement.className = 'episodeContainer';

    // Adding h1 to it
    let h1Elem = document.createElement ('h1');
    h1Elem.innerHTML =
      episodeList[i].name +
      ' - S' +
      episodeList[i]['season'].toString ().padStart (2, '0') +
      'E' +
      episodeList[i]['number'].toString ().padStart (2, '0');
    divElement.appendChild (h1Elem);

    // Adding an image to it
    let imageElem = document.createElement ('img');
    imageElem.src = episodeList[i].image.medium;
    divElement.appendChild (imageElem);

    // Adding a paragraph to it
    let paragraph = document.createElement ('P');
    paragraph.innerHTML = episodeList[i].summary;
    divElement.appendChild (paragraph);

    // Appending the div element to body
    rootElem.appendChild (divElement);
    document.body.appendChild (rootElem);
  }
  const info = document.createElement ('a');
  const infoPar = document.createElement ('h4');
  info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
  infoPar.innerHTML = 'The data has (originally) come from  ';
  info.innerHTML = 'tvmaze.com/api#licensing';
  infoPar.appendChild (info);
  document.body.appendChild (infoPar);
}

window.onload = setup;
