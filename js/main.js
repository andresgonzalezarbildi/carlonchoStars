//  Global variable
  let deckId = ""

  let carta1 = document.querySelector("#playerCard1")
  let carta2 = document.querySelector("#playerCard2")
  let carta3 = document.querySelector("#playerCard2")

// EVENT LISTNER
document.querySelector('#start').addEventListener('click', startGame)

document.querySelector('#repartir').addEventListener('click', draw2Cards)

document.querySelector('#apostar').addEventListener('click', apuesta)



//Functions

function draw2Cards() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
    console.log(data.cards)

    changeCard(data)
    
    readyForPrize()

    document.querySelector("#resultado").style.display = "none"
    document.querySelector("#playerCard3").src = "/cards-template/img/cards.jpg"

  })
  .catch(err => `Error ${err}`)
}
function readyForPrize() {
  card3.style.display = "block"
  document.querySelector("#apostar").style.display = "block"

}

function apuesta() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
    document.querySelector("#nameCard3").innerText = `The ${data.cards[0].value} of ${data.cards[0].suit}!`
    document.querySelector("#playerCard3").src = data.cards[0].image
    document.querySelector("#carta3").innerText = toNumb(data.cards[0].value)
    
  document.querySelector("#apostar").style.display = "none"

    checkWin()
  })
  .catch(err => `Error ${err}`)
}

  function checkWin() {
    let card1value = Number(document.querySelector("#carta1").innerText)
    let card2value = Number(document.querySelector("#carta2").innerText)
    let card3value = Number(document.querySelector("#carta3").innerText)

    if ((card3value > card1value && card3value < card2value) || (card3value < card1value && card3value > card2value)) {
      document.querySelector("#resultado").innerText = "Ganaste!"
    } else {
      document.querySelector("#resultado").innerText = "Marchaste!"
    }
    document.querySelector("#resultado").style.display = "block"
  }
  function toNumb(val) {
    switch (val) {
      case "ACE":
        return 14
      case "KING":
        return 13
      case "QUEEN":
       return 12
      case "JACK":
        return 11
      default :
        return Number(val)
    } 
  }

function changeCard(data) {
  document.querySelector("#nameCard1").innerText = `${data.cards[0].value} of ${data.cards[0].suit}`
  document.querySelector("#playerCard1").src = data.cards[0].image
  document.querySelector("#carta1").innerText = toNumb(data.cards[0].value)


  document.querySelector("#nameCard2").innerText = `${data.cards[1].value} of ${data.cards[1].suit}`
  document.querySelector("#playerCard2").src = data.cards[1].image
  document.querySelector("#carta2").innerText = toNumb(data.cards[1].value)


}

function startGame() {
  getDeck()
  
  setField()

}


//  Gets new deck
function getDeck() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
  })
  .catch(err => `Error ${err}`)
}

//  Sets the field to start the game
function setField() {
  setName()
  changeDisplays()

}
// Sets the players name
function setName() {
  let name = document.querySelector("input").value.toLowerCase()
  if (name === "") {
    document.querySelector("#playerName").innerText = "Anonymous"
  } else {
    name = name[0].toUpperCase() + name.slice(1);
    document.querySelector("#playerName").innerText = name
  }
}

// show and hide stuff

function changeDisplays() {
  document.querySelector("input").style.display = "none"
  document.querySelector("#start").style.display = "none"
  document.querySelector("#repartir").style.display = "block"
}