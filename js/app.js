/*
 * Create a list that holds all of your cards
 */
 const cardSymbols = ['diamond','bolt','cube','anchor','leaf','bicycle','bomb','paper-plane-o'];
 var shuffledDeck = [];
 var firstSelectedCard = null;
 var secondSelectedCard = null;
 var moveCounter = 0;
 var cardMatches = 0;
 var starsCount = 3;
 var timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function buildDeck() {

   console.log('build deck');

  //reset move counter
   moveCounter = 0;
   let counter = document.querySelector('.moves');
   counter.textContent = moveCounter;

   //reset stars
   let stars = document.querySelector(".stars");
   stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";

  //start Timer
  clearInterval(timer);
  startTimer();

  let cardData = [];

  //make two cards of each symbol in array
  cardSymbols.forEach(function(cardSymbol) {
    cardData.push(cardSymbol)
    cardData.push(cardSymbol)
  });

  //shuffle cards
  shuffledDeck = shuffle(cardData);

  //build HTML elements of li
  var deck = document.querySelector('.deck');

  deck.innerHTML = '';

  for (const card of shuffledDeck) {

    let li = document.createElement('li');
    li.setAttribute("class", "card");
    li.setAttribute("data", card)
    deck.appendChild(li);

    let i = document.createElement('i');
    i.setAttribute("class", " fa fa-" + card);
    li.appendChild(i);

    li.addEventListener('click', cardSelect);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function cardSelect(evt) {

  //console.log(firstSelectedCard);

  //logic to find if is first selected card and set data
  if(firstSelectedCard == null) {
    console.log('first card choice')
    firstSelectedCard = evt.target;
    firstSelectedCard.removeEventListener('click', cardSelect);
    console.log("firstSelectedCard = " + firstSelectedCard.getAttribute('data'));

    //call card animation
    flipCard(firstSelectedCard);

  }else{
    //second card choice
    console.log('second card choice')
    //disable all buttons here
    toggleClicks('disable');

    secondSelectedCard = evt.target;
    secondSelectedCard.removeEventListener('click', cardSelect);
    console.log("secondSelectedCard = " + secondSelectedCard.getAttribute('data'));

    //call card animation
    flipCard(secondSelectedCard);
    moveCounter++
    updateStars();
    let counter = document.querySelector('.moves');
    counter.textContent = moveCounter;

    //check to see if match here
    if (firstSelectedCard.getAttribute('data') == secondSelectedCard.getAttribute('data')) {

      console.log('we have a match');
      setTimeout(matchAni.bind(null, firstSelectedCard), 1000);
      setTimeout(matchAni.bind(null, secondSelectedCard), 1000);
      setTimeout(toggleClicks.bind(null, 'enable'), 1500);
      firstSelectedCard = null;
      secondSelectedCard = null;

      cardMatches++

      if (cardMatches == 8) {
        console.log('trigger win');
        stopTimer();
        setTimeout(winner, 1500);
      }

    }else{

      console.log('no match');
      setTimeout(flipCardsBack.bind(null, firstSelectedCard), 1000);
      setTimeout(flipCardsBack.bind(null, secondSelectedCard), 1000);
      setTimeout(toggleClicks.bind(null, 'enable'), 1500);
      firstSelectedCard = null;
      secondSelectedCard = null;

    }


  }
}

var display = document.querySelector('#time');
var totalSeconds = 0;
var sec = 0;

function pad ( val ) { return val > 9 ? val : "0" + val; }

function startTimer() {
  sec = 0;
  timer = setInterval ( function(){
    let secondsLabel = pad(++sec%60);
    let minutesLabel = pad(parseInt(sec/60,10));
    display.textContent = minutesLabel + ":" + secondsLabel;
  }, 1000 );
}


function flipCard(obj){

    obj.className += " open show";

}

function flipCardsBack(obj){
    obj.classList.remove("open", "show");
    console.log('moveCounter = ' + moveCounter)
}

function matchAni(obj) {
  console.log('match ani: ' + obj)
  obj.className += " match";
}

function updateStars() {

  if (starsCount == 0) return;
  //nine moves until the stars run out
  if ( moveCounter % 3 === 0 ) {
    let stars = document.querySelector(".stars");
    let star = document.querySelector(".stars li");
      stars.removeChild(star);
      starsCount--
  }
}

function toggleClicks(condition) {

  let cardsArray = Array.prototype.slice.call(document.querySelectorAll("li.card"));

  for (const card of cardsArray) {
    if (condition == 'disable') {card.removeEventListener('click', cardSelect);}
    if (condition == 'enable') {card.addEventListener('click', cardSelect);}

   }
 }

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', buildDeck);

// MODAL
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var playAgain = document.getElementById("playAgain");

// When the user clicks on the button, open the modal
function winner() {
    modal.style.display = "block";
    let finalMoveDisplay = document.getElementById('finalMoves');
    finalMoveDisplay.textContent = moveCounter;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

playAgain.onclick = function() {
    modal.style.display = "none";
    buildDeck();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

buildDeck();
