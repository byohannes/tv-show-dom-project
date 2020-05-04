const shows = getAllShows()
let allEpisodes
let selectedShowId

function setup() {
  loadAllShows()
  makePageForShows()
  searchFunc()
}

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
  divShow.innerHTML = ''
  makePageForShows(shows)
  searchFunc()
})

function loadAllShows() {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1))
  //Create and append the options of select input
  let option1 = document.createElement('option')
  option1.value = '--All Shows--'
  option1.text = '--All Shows--'
  showList.appendChild(option1)
}

function makePageForShows() {
  goBackButton.style.display = 'none'
  episodeSelectList.style.display = 'none'
  episodeSelectList.innerHTML = ''
  divContainer.innerHTML = ''
  for (let i = 0; i < shows.length; i++) {
    let showCard = document.createElement('div')
    showCard.className = 'show-card'
    let showName = document.createElement('h1')
    showName.innerHTML = shows[i].name
    showCard.appendChild(showName)
    showName.addEventListener('click', () => {
      goBackButton.style.display = ''
      showList.style.display = 'none'
      episodeSelectList.style.display = ''
      episodeSelectList.innerHTML = ''
      divContainer.innerHTML = ''
      selectedShowId = shows[i]
      displayCurrentShow(selectedShowId)
      loadShowEpisodes()
    })
    let showImage = document.createElement('img')
    showImage.className = 'show-image'
    if (shows[i].image === null) {
      showImage.src = 'https://dozenpixels.com/static/img/blog/coming-soon.png'
    } else {
      showImage.src = shows[i].image.medium
    }

    showImage.addEventListener('click', () => {
      goBackButton.style.display = ''
      showList.style.display = 'none'
      episodeSelectList.style.display = ''
      episodeSelectList.innerHTML = ''
      divContainer.innerHTML = ''
      selectedShowId = shows[i]
      loadShowEpisodes()
    })
    showCard.appendChild(showImage)
    let showInfo = document.createElement('p')
    showInfo.className = 'show-info'
    showInfo.innerHTML = `Rating: ${shows[i].rating.average}, Generes: ${shows[
      i
    ].genres.join('|')}, Status: ${shows[i].status}, Runtime: ${
      shows[i].runtime
    }`
    showCard.appendChild(showInfo)
    let showText = document.createElement('p')
    showText.className = 'show-summary truncate'
    shows[i].summary === null
      ? (showText.innerText = ' The summary of this show is coming soon.')
      : (showText.innerText = shows[i].summary.replace(/<\/?[^>]+(>|$)/g, ''))
    let toggleButton = document.createElement('button')

    let toggleStatus = 'less'

    toggleButton.innerText = '...Show more'
    toggleButton.className = 'show-more'
    toggleButton.addEventListener('click', () => {
      if (toggleStatus === 'less') {
        showText.classList.remove('truncate')
        toggleButton.innerText = '...Show less'
        toggleStatus = 'full'
      } else {
        showText.classList.add('truncate')
        toggleButton.innerText = '...Show more'
        toggleStatus = 'less'
      }
    })
    showCard.appendChild(showText)
    showCard.appendChild(toggleButton)
    divContainer.appendChild(showCard)
  }
}
let divShow
function displayCurrentShow(currentShow) {
  divShow = document.createElement('div')
  divShow.className = 'current-show'
  divContainer.appendChild(divShow)
  divContainer.before(divShow)
  let divLink = document.createElement('div')
  divLink.className = 'current-show-title'
  divShow.appendChild(divLink)

  let link = document.createElement('a')
  link.className = 'link-title'
  divLink.appendChild(link)

  link.innerText = currentShow.name

  let containerShow = document.createElement('div')
  containerShow.className = 'current-show-container'
  divShow.appendChild(containerShow)

  let divImage = document.createElement('div')
  containerShow.appendChild(divImage)

  let imageShow = document.createElement('img')
  imageShow.className = 'current-show-image'
  divImage.appendChild(imageShow)

  if (currentShow.image === null) {
    imageShow.src = 'https://dozenpixels.com/static/img/blog/coming-soon.png'
  } else {
    imageShow.src = currentShow.image.medium
  }

  let summaryDiv = document.createElement('div')
  containerShow.appendChild(summaryDiv)

  let showSummary = document.createElement('p')
  showSummary.className = 'current-show-summary'
  if (currentShow.summary === null) {
    showSummary.innerText = 'The summary of this show is coming soon.'
  } else {
    showSummary.innerText = currentShow.summary.replace(/<\/?[^>]+(>|$)/g, '')
  }
  summaryDiv.appendChild(showSummary)

  let detailsDiv = document.createElement('div')
  detailsDiv.className = 'current-show-info'
  containerShow.appendChild(detailsDiv)
  let rated = document.createElement('p')
  rated.innerText = `Rating: ${currentShow.rating.average}`
  detailsDiv.appendChild(rated)
  let genre = document.createElement('p')
  genre.innerText = `Genres: ${currentShow.genres.join('|')}`
  detailsDiv.appendChild(genre)
  let status = document.createElement('p')
  status.innerText = `Status: ${currentShow.status}`
  detailsDiv.appendChild(status)
  let runtime = document.createElement('p')
  runtime.innerText = `Runtime: ${currentShow.runtime}`
  detailsDiv.appendChild(runtime)
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
    if (imageElem.image === null) {
      imageElem.src = 'https://dozenpixels.com/static/img/blog/coming-soon.png'
    } else {
      imageElem.src = episodeList[i].image.medium
    }

    divElement.appendChild(imageElem)
    // Adding a paragraph to it as a summary of the episode
    let paragraph = document.createElement('P')
    paragraph.className = 'episode-summary'
    episodeList[i].summary === null
      ? (paragraph.innerText = ' The summary of this episode is coming soon.')
      : (paragraph.innerHTML = episodeList[i].summary)

    divElement.appendChild(paragraph)
  }
  searchFunc()
}
// Search by Listening for keystroke events
searchInput.addEventListener('keyup', searchFunc)
// filtering  the search
function searchFunc() {
  let epiListLength
  let searchCount
  let searchKey
  if (episodeSelectList.style.display === '') {
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
    let arrayEpisodes = Array.from(
      document.querySelectorAll('.episodeContainer'),
    )
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
  } else {
    searchKey = searchInput.value.toLowerCase()
    searchCount = 0
    let showsArray = Array.from(document.querySelectorAll('.show-card'))
    showsListLength = showsArray.length
    showsArray.forEach((show) => {
      let textInfo = show.innerHTML.toLowerCase()
      if (textInfo.indexOf(searchKey) > -1) {
        show.style.display = ''
        searchCount += 1
      } else {
        show.style.display = 'none'
      }
    })
    if (searchCount == 1) {
      searchLabel.innerHTML = `Displaying ${searchCount}/${showsListLength} show`
    } else {
      searchLabel.innerHTML = `Displaying ${searchCount}/${showsListLength} shows`
    }
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
