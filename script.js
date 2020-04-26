function setup () {
  fetch("https://api.tvmaze.com/shows/179/episodes")
  .then((response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw new Error(
        `Encountered something unexpected: ${response.status} ${response.statusText}`
      );
    }
  })
  .then((data)=>{
    allEpisodes = data;
    makePageForEpisodes (allEpisodes);
  selectInputLoad (allEpisodes);})
  .catch(error=>console.log(error))
  
}


let allEpisodes ;
const rootElem = document.getElementById ('root');
//a container for all episodes
let divContainer = document.createElement ('div');
divContainer.className = 'container';
//Create and append select list
let selectList = document.createElement ('select');
selectList.className = 'mySelect';
// create a legend for search boxes
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
  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element for each episode
    let divElement = document.createElement ('Div');
    divElement.className = 'episodeContainer';
    divContainer.appendChild (divElement);
    // Adding h1 to it as a title
    let h1Elem = document.createElement ('h1');
    h1Elem.innerHTML =
      episodeList[i].name +
      ' - S' +
      episodeList[i]['season'].toString ().padStart (2, '0') +
      'E' +
      episodeList[i]['number'].toString ().padStart (2, '0');
    divElement.appendChild (h1Elem);
    // Adding an image to the episode
    let imageElem = document.createElement ('img');
    imageElem.src = episodeList[i].image.medium;
    divElement.appendChild (imageElem);
    // Adding a paragraph to it as a summary of the episode
    let paragraph = document.createElement ('P');
    paragraph.innerHTML = episodeList[i].summary.trim ();
    divElement.appendChild (paragraph);
  }
  searchFunc ();
}
// Search by Listening for keystroke events
searchInput.addEventListener ('keyup', searchFunc);

// filtering the episodes
function searchFunc () {
  let epiListLength;
  let searchCount;
  let searchKey;
  if (searchInput.value === '') {
    if (selectList.value.substr (0, 6) === 'All Ep') {
      searchKey = '';
    } else {
      searchKey = selectList.value.substr (0, 6).toLowerCase ();
    }
  } else {
    searchKey = searchInput.value.toLowerCase ();
  }
  console.log (searchKey);
  searchCount = 0;
  let arrayEpisodes = Array.from (
    document.querySelectorAll ('.episodeContainer')
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
  if (searchCount == 1) {
    searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episode`;
  } else {
    searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episodes`;
  }
}

selectList.addEventListener ('change', searchFunc);
// a function Loading the episode list
function selectInputLoad (showList) {
  //Create and append the options of select input
  let option1 = document.createElement ('option');
  option1.value = 'All Episodes';
  option1.text = 'All Episodes';
  selectList.appendChild (option1);
  for (let index = 0; index < showList.length; index++) {
    let option = document.createElement ('option');
    option.text =
      'S' +
      showList[index]['season'].toString ().padStart (2, '0') +
      'E' +
      showList[index]['number'].toString ().padStart (2, '0') +
      ' - ' +
      showList[index].name;
    selectList.appendChild (option);
  }
}

// Link to the source of data href', 'https://www.tvmaze.com/api#licensing'
const info = document.createElement ('a');
const infoPar = document.createElement ('h4');
infoPar.id = 'tvLink';
info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
infoPar.innerHTML = 'The data has (originally) come from  ';
info.innerHTML = 'tvmaze.com.';
infoPar.appendChild (info);
document.body.appendChild (infoPar);
window.onload = setup;
