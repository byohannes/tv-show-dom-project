//You can edit ALL of the code here
function setup () {
  makePageForEpisodes (allEpisodes);
}
const allEpisodes = getAllEpisodes ();
const rootElem = document.getElementById ('root');
//a container for all episodes
let divContainer = document.createElement ('div');
divContainer.className = 'container';
//Create and append select list
let selectList = document.createElement ('select');
selectList.id = 'mySelect';
// search box
let searchBox = document.createElement ('legend');
searchBox.innerHTML = 'Search';
searchBox.appendChild (selectList);
rootElem.appendChild (searchBox).className = 'search';
let searchInput = document.createElement ('input');
searchInput.placeholder = 'your search item...';
searchBox.appendChild (searchInput);
searchInput.setAttribute ('type', 'text');
let searchLabel = document.createElement ('h3');
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
selectList.addEventListener ('change', searchFunc);
selectList.addEventListener ('click', () => {
  //Create and append the options of select input
  for (let index = 0; index < allEpisodes.length; index++) {
    let option = document.createElement ('option');
    
    option.text =
      'S' +
      allEpisodes[index]['season'].toString ().padStart (2, '0') +
      'E' +
      allEpisodes[index]['number'].toString ().padStart (2, '0') +
      ' - ' +
      allEpisodes[index].name;
    selectList.appendChild (option);
  }
});
// Search by Listening for keystroke events
searchInput.addEventListener ('keyup', searchFunc);
let epiListLength;
let searchCount;
let searchKey;
function searchFunc () {
  if (searchInput.value === '') {
    searchKey = selectList.value
      .substr (9, selectList.value.length - 1)
      .toLowerCase ();
  } else {
    searchKey = searchInput.value.toLowerCase ();
  }
  searchCount = 0;
  let arrayEpisodes = Array.from (
    document.getElementsByClassName ('episodeContainer')
  );
  epiListLength = arrayEpisodes.length;
  arrayEpisodes.forEach (show => {
    let textInfo = show.innerText.toLowerCase ();
    if (textInfo.indexOf (searchKey) > -1) {
      show.style.display = '';
      searchCount += 1;
    } else {
      show.style.display = 'none';
    }
  });
  searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episode(s)`;
}
// Link to the source of data href', 'https://www.tvmaze.com/api#licensing'
const info = document.createElement ('a');
const infoPar = document.createElement ('h4');
info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
infoPar.innerHTML = 'The data has (originally) come from  ';
info.innerHTML = 'tvmaze.com/api#licensing';
infoPar.appendChild (info);
document.body.appendChild (infoPar);

window.onload = setup;
