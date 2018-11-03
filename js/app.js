/*
 * Create a list that holds all of your cards
 */
 const cardSymbols = ['diamond','bolt','cube','anchor','leaf','bicycle','bomb','paper-plane-o'];
 var shuffledDeck = [];
 var firstSelectedCard = null;
 var secondSelectedCard = null;
 var moveCounter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function buildDeck() {

   console.log('build deck');

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

    firstSelectedCard = evt.target;
    firstSelectedCard.removeEventListener('click', cardSelect);
    console.log("firstSelectedCard = " + firstSelectedCard.getAttribute('data'));

    //call card animation
    flipCard(firstSelectedCard);

  }else{

    //disable all buttons here

    secondSelectedCard = evt.target;
    secondSelectedCard.removeEventListener('click', cardSelect);
    console.log("secondSelectedCard = " + secondSelectedCard.getAttribute('data'));

    //call card animation
    flipCard(secondSelectedCard);
    moveCounter++
    let counter = document.querySelector('.moves');
    counter.textContent = moveCounter;

    //check to see if match here
    if (firstSelectedCard.getAttribute('data') == secondSelectedCard.getAttribute('data')) {

      console.log('we have a match');
      firstSelectedCard = null;
      secondSelectedCard = null;

      //enable all buttons here


    }else{

      console.log('no match');
      setTimeout(flipCardsBack.bind(null, firstSelectedCard), 1000);
      setTimeout(flipCardsBack.bind(null, secondSelectedCard), 1000);
      //firstSelectedCard.addEventListener('click', cardSelect);
      //secondSelectedCard.addEventListener('click', cardSelect);
      firstSelectedCard = null;
      secondSelectedCard = null;

      //enable all buttons here

    }


  }
}

function flipCard(obj){

    obj.className += " open show";

}

function flipCardsBack(obj){
    obj.classList.remove("open", "show");
    obj.addEventListener('click', cardSelect);

    //obj = null

    console.log('moveCounter = ' + moveCounter)
    //secondSelectedCard.classList.remove("open", "show");

}

// toggleClick(obj) {
//
// }

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', buildDeck);

buildDeck();
