//You can edit ALL of the code here
function setup () {
  const allEpisodes = getAllEpisodes ();
  makePageForEpisodes (allEpisodes);
}

const rootElem = document.getElementById ('root');
// Link to the source of data href', 'https://www.tvmaze.com/api#licensing'
const info = document.createElement ('a');
const infoPar = document.createElement ('h4');
info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
infoPar.innerHTML = 'The data has (originally) come from  ';
info.innerHTML = 'tvmaze.com/api#licensing';
infoPar.appendChild (info);
document.body.appendChild (infoPar);
//a container for all episodes
let divContainer = document.createElement ('div');
divContainer.className = 'container';
// search box
let searchBox = document.createElement ('div');
rootElem.appendChild (searchBox).className = 'search';
let searchInput = document.createElement ('input');
searchBox.appendChild (searchInput);
searchInput.setAttribute ('type', 'text');
let searchLabel = document.createElement ('h2');
searchLabel.className = 'searchEpisode';
searchBox.appendChild (searchLabel);
rootElem.appendChild (divContainer);

function makePageForEpisodes (episodeList) {
  //searchLabel.innerHTML = `Displaying ${episodeList.length}/${episodeList.length} episode(s)`;
  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element for each episode
    let divElement = document.createElement ('Div');
    divElement.className = 'episodeContainer';
    divContainer.appendChild (divElement);
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
    paragraph.innerHTML = episodeList[i].summary.trim ();
    divElement.appendChild (paragraph);
  }
  searchFunc ();
}

// Search by Listening for keystroke events
searchInput.addEventListener ('keyup', searchFunc);
let epiListLength;
let searchCount;
function searchFunc () {
  let searchKey = searchInput.value.toLowerCase ();
  searchCount = 0;
  let arrayEpisodes = Array.from (
    document.getElementsByClassName ('episodeContainer')
  );
  epiListLength = arrayEpisodes.length;
  arrayEpisodes.forEach (div => {
    let textInfo = div.innerText.toLowerCase ();
    if (textInfo.indexOf (searchKey) != -1) {
      div.style.display = 'block';
      searchCount += 1;
    } else {
      div.style.display = 'none';
    }
  });
  searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episode(s)`;
}

window.onload = setup;
