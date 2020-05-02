const shows = getAllShows()

function setup() {
  loadAllShows()
  makePageForShows(shows)
}

let allEpisodes
const rootElem = document.getElementById('root')
//a container for all episodes
let divContainer = document.createElement('div')
divContainer.className = 'container'
//Create and append select show list
let showList = document.createElement('select')
showList.className = 'showSelect'
//Create and append select episode list
let episodeSelectList = document.createElement('select')
episodeSelectList.className = 'episodeSelect'
// create a legend for search boxes
let searchBox = document.createElement('legend')
searchBox.innerHTML = 'Search'
searchBox.appendChild(showList)
searchBox.appendChild(episodeSelectList)
rootElem.appendChild(searchBox).className = 'search'
let searchInput = document.createElement('input')
searchInput.placeholder = 'your search item...'
searchBox.appendChild(searchInput)
searchInput.setAttribute('type', 'text')
let searchLabel = document.createElement('h3')
searchLabel.className = 'searchEpisode'
searchBox.appendChild(searchLabel)
//go back navigation button
let goBackButton = document.createElement('button')
goBackButton.className = 'back-button'
goBackButton.innerText = 'Go Back'
searchBox.appendChild(goBackButton)

rootElem.appendChild(divContainer)
goBackButton.addEventListener('click', () => {
  showList.style.display = ''
  makePageForShows(shows)
})

function loadAllShows() {
  shows.sort((show1, show2) => {
    show1.name.toUpperCase() > show2.name.toUpperCase() ? 1 : -1
  })
  //Create and append the options of select input
  let option1 = document.createElement('option')
  option1.value = '--All Shows--'
  option1.text = '--All Shows--'
  showList.appendChild(option1)
  /*
  for (let index = 0; index < shows.length; index++) {
    let option = document.createElement('option')
    option.text = shows[index].name
    showList.appendChild(option)
  }
  */
}
showList.addEventListener('change', selectedShow)

function selectedShow() {
  episodeSelectList.innerHTML = ''
  divContainer.innerHTML = ''
  selectedShowId = shows.find((show) => show.name === showList.value)
  if (typeof selectedShowId === 'undefined') {
    makePageForShows(shows)
  } else {
    loadShowEpisodes()
  }
}

let selectedShowId

function makePageForShows(showsListing) {
  goBackButton.style.display = 'none'
  episodeSelectList.style.display = 'none'
  episodeSelectList.innerHTML = ''
  divContainer.innerHTML = ''
  searchLabel.innerHTML = `Displaying ${showsListing.length}/${showsListing.length} shows`
  for (let i = 0; i < showsListing.length; i++) {
    let showCard = document.createElement('div')
    //rootElem.insertBefore(currentShowCardEl, rootElem.firstChild);
    //currentShowCardEl.id = "current-show-card";
    showCard.className = 'show-card'
    let showName = document.createElement('h1')
    showName.innerHTML = showsListing[i].name
    showCard.appendChild(showName)
    showName.addEventListener('click', () => {
      goBackButton.style.display = ''
      showList.style.display = 'none'
      episodeSelectList.style.display = ''
      episodeSelectList.innerHTML = ''
      divContainer.innerHTML = ''
      selectedShowId = showsListing[i]
      loadShowEpisodes()
    })
    let showImage = document.createElement('img')
    showImage.className = 'show-image'
    showImage.src = showsListing[i].image.medium
    showImage.addEventListener('click', () => {
      goBackButton.style.display = ''
      showList.style.display = 'none'
      episodeSelectList.style.display = ''
      episodeSelectList.innerHTML = ''
      divContainer.innerHTML = ''
      selectedShowId = showsListing[i]
      loadShowEpisodes()
    })
    showCard.appendChild(showImage)
    let showInfo = document.createElement('p')
    showInfo.className = 'show-info'
    showInfo.innerHTML = `Rating: ${
      showsListing[i].rating.average
    }, Generes: ${showsListing[i].genres.join('|')}, Status: ${
      showsListing[i].status
    }, Runtime: ${showsListing[i].runtime}`
    showCard.appendChild(showInfo)
    let showText = document.createElement('p')
    showText.className = 'show-summary'
    showText.innerHTML = showsListing[i].summary.replace(/<\/?[^>]+(>|$)/g, '')
    showCard.appendChild(showText)
    divContainer.appendChild(showCard)
  }
}

function loadShowEpisodes() {
  let selectedUrl = `https://api.tvmaze.com/shows/${selectedShowId.id}/episodes`
  fetch(selectedUrl)
    .then((response) => response.json())
    .then((data) => {
      allEpisodes = data
      makePageForEpisodes(allEpisodes)
      selectInputLoad(allEpisodes)
    })
    .catch((error) => console.log(error))
}

function makePageForEpisodes(episodeList) {
  for (let i = 0; i < episodeList.length; i++) {
    // Creating a div element for each episode
    let divElement = document.createElement('Div')
    divElement.className = 'episodeContainer'
    divContainer.appendChild(divElement)
    // Adding h1 to it as a title
    let h1Elem = document.createElement('h1')
    h1Elem.innerHTML =
      episodeList[i].name +
      ' - S' +
      episodeList[i]['season'].toString().padStart(2, '0') +
      'E' +
      episodeList[i]['number'].toString().padStart(2, '0')
    divElement.appendChild(h1Elem)
    // Adding an image to the episode
    let imageElem = document.createElement('img')
    imageElem.className = 'episode-image'
    imageElem.src = episodeList[i].image.medium
    divElement.appendChild(imageElem)
    // Adding a paragraph to it as a summary of the episode
    let paragraph = document.createElement('P')
    paragraph.className = 'episode-summary'
    paragraph.innerHTML = episodeList[i].summary
    divElement.appendChild(paragraph)
  }
  searchFunc()
}
// Search by Listening for keystroke events
searchInput.addEventListener('keyup', searchFunc)

// filtering the episodes
function searchFunc() {
  let epiListLength
  let searchCount
  let searchKey
  if (searchInput.value === '') {
    if (episodeSelectList.value.substr(0, 6) === 'All Ep') {
      searchKey = ''
    } else {
      searchKey = episodeSelectList.value.substr(0, 6).toLowerCase()
    }
  } else {
    searchKey = searchInput.value.toLowerCase()
  }
  searchCount = 0
  let arrayEpisodes = Array.from(document.querySelectorAll('.episodeContainer'))
  epiListLength = arrayEpisodes.length
  arrayEpisodes.forEach((show) => {
    let textInfo = show.innerText.toLowerCase()
    if (textInfo.indexOf(searchKey) > -1) {
      show.style.display = ''
      searchCount += 1
    } else {
      show.style.display = 'none'
    }
  })
  if (searchCount == 1) {
    searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episode`
  } else {
    searchLabel.innerHTML = `Displaying ${searchCount}/${epiListLength} episodes`
  }
}

episodeSelectList.addEventListener('change', searchFunc)
// a function Loading the episode list
function selectInputLoad(episodeList) {
  //Create and append the options of select input
  let option1 = document.createElement('option')
  option1.value = 'All Episodes'
  option1.text = 'All Episodes'
  episodeSelectList.appendChild(option1)
  for (let index = 0; index < episodeList.length; index++) {
    let option = document.createElement('option')
    option.text =
      'S' +
      episodeList[index]['season'].toString().padStart(2, '0') +
      'E' +
      episodeList[index]['number'].toString().padStart(2, '0') +
      ' - ' +
      episodeList[index].name
    episodeSelectList.appendChild(option)
  }
}

// Link to the source of data href', 'https://www.tvmaze.com/api#licensing'
const info = document.createElement('a')
const infoPar = document.createElement('h4')
infoPar.id = 'tvLink'
info.setAttribute('href', 'https://www.tvmaze.com/api#licensing')
infoPar.innerHTML = 'The data has (originally) come from  '
info.innerHTML = 'tvmaze.com.'
infoPar.appendChild(info)
document.body.appendChild(infoPar)

window.onload = setup
