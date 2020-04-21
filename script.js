//You can edit ALL of the code here
function setup () {
  const allEpisodes = getAllEpisodes ();
  makePageForEpisodes (allEpisodes);
}

function makePageForEpisodes (episodeList) {
  const rootElem = document.getElementById ('root');
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  rootElem.classList.add ('container');

  rootElem.setAttribute ('class', 'container');
  rootElem.setAttribute ('style', 'display:flex');
  rootElem.setAttribute ('style', 'flexWrap:wrap');

  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element
    let divElement = document.createElement ('Div');
    divElement.classList.add ('episode');
    divElement.setAttribute ('class', 'episode');
    // Styling it    
    divElement.style.overflow = 'hidden';
    divElement.style.background = 'white';
    divElement.style.borderRadius = '12px';
    divElement.style.margin = '1rem';
    

    // Adding h1 to it
    let h1Elem = document.createElement ('h1');
    h1Elem.innerHTML =
      episodeList[i].name +
      ' - S' +
      episodeList[i]['season'].toString ().padStart (2, '0') +
      '' +
      episodeList[i]['number'].toString ().padStart (2, '0');
    divElement.appendChild (h1Elem);
    // Styling h1
    h1Elem.style.textAlign = 'center';
    h1Elem.style.padding = '1.5rem 2.5rem';
    h1Elem.style.fontSize = '1.5rem';
    h1Elem.style.border = '1px solid black';
    h1Elem.style.borderRadius = '12px';
    h1Elem.style.color = 'black';
    h1Elem.style.margin = '0 0 2rem 0';
    // Adding an image to it
    let imageElem = document.createElement ('img');
    imageElem.src = episodeList[i].image.medium;
    divElement.appendChild (imageElem);
    // Styling image
    imageElem.style.width = '100%';
    imageElem.style.height = 'auto';
    imageElem.style.display = 'inline-block';
    imageElem.style.borderRadius = '5px';
    // Adding a paragraph to it
    let paragraph = document.createElement ('P');
    paragraph.innerHTML = episodeList[i].summary;
    divElement.appendChild (paragraph);
    // Styling paragraph
    paragraph.style.padding = '0 2.5rem 2.5rem';
    paragraph.style.margin = '0';
    // Appending the div element to body
    rootElem.appendChild (divElement);
  }
  const info = document.createElement ('a');
  const infoPar = document.createElement ('h3');
  info.setAttribute ('href', 'https://www.tvmaze.com/api#licensing');
  infoPar.innerHTML = 'The data has (originally) come from  ';
  info.innerHTML = 'tvmaze.com/api#licensing';
  infoPar.appendChild (info);
  document.body.appendChild (infoPar);
}

window.onload = setup;
