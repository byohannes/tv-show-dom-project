//You can edit ALL of the code here
function setup () {
  const allEpisodes = getAllEpisodes ();
  makePageForEpisodes (allEpisodes);
}

function makePageForEpisodes (episodeList) {
  const rootElem = document.getElementById ('root');
  let searchLabel = document.createElement ('label');
  let searchBox = document.createElement ('input');
  searchLabel.innerHTML = `   Displaying ${episodeList.length}/${episodeList.length} episode(s)`;
  searchBox.setAttribute ('type', 'text');
  document.body.appendChild (searchBox);
  document.body.appendChild (searchLabel);
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
    //search

    // Listen for keystroke events
    searchBox.addEventListener ('keyup', () => {
      let searchKey = searchBox.value.toLowerCase ();
      let searchCount = 0;
      let arrayEpisodes = Array.from (
        document.getElementsByClassName ('episodeContainer')
      );

      arrayEpisodes.forEach (div => {
        let textInfo = div.innerText.toLowerCase ();
        if (textInfo.indexOf (searchKey) != -1) {
          div.style.display = 'block';
          searchCount += 1;
        } else {
          div.style.display = 'none';
        }
      });
      searchLabel.innerHTML = `   Displaying ${searchCount}/${episodeList.length} episode(s)`;
    });
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
