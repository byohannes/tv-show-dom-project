//You can edit ALL of the code here
function setup () {
  const allEpisodes = getAllEpisodes ();
  makePageForEpisodes (allEpisodes);
}
const allEpisodes = getAllEpisodes ();
//let searchBox = document.createElement ('input');
function makePageForEpisodes (episodeList) {
  const rootElem = document.getElementById ('root');

  //let displayingData = document.createElement ('p');
  //displayingData.innerHTML = `Displaying ${episodeList.length}/${episodeList.length} episode(s)`;
  //searchBox.setAttribute ('type', 'text');
  //rootElem.appendChild (searchBox);
  //rootElem.appendChild (displayingData);
  rootElem.className = 'container';
  //searchBox.addEventListener("change",()=>{  });

  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element
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
  }
  const info = document.createElement ('a');
  const infoPar = document.createElement ('p');
  infoPar.className = 'information';
  info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
  infoPar.innerHTML = 'The data has (originally) come from  ';
  info.innerHTML = 'tvmaze.com/api#licensing';
  infoPar.appendChild (info);
  document.body.appendChild (infoPar);
}

window.onload = setup;
