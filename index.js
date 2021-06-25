let deckId;
let compScore;
let myScore;
let remainCards;
const cardsContainer = document.getElementById("cards");
const bttNewDeck = document.getElementById("new-deck");
const bttDrawCards = document.getElementById("draw-cards");
const whoWin = document.getElementById("whoWin");
const remainingCards = document.getElementById("remainingCards");
const cardSlot1 = document.getElementById("card-slot1");
const cardSlot2 = document.getElementById("card-slot2");
const scoreDisplayComp = document.getElementById("score-comp");
const scoreDisplayMy = document.getElementById("score-my");
const handRules = document.querySelector(".hand-rules");
const modalRules = document.querySelector(".modal_rules");
const closeIcon = document.getElementById("close-icon");
const winner = document.querySelector(".winner");


bttNewDeck.addEventListener("click", getNewDeck);

handRules.addEventListener("click", showRules);
closeIcon.addEventListener("click", hideRules);


function showRules() {
    modalRules.classList.add("active")
}

function hideRules() {
    modalRules.classList.remove("active")
}

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {

        winner.classList.remove("active");

        remainingCardsCount(data);

        deckId = data.deck_id;

        compScore = 0;
        myScore = 0;
        scoreDisplayComp.textContent = `Computer score: ${compScore}`;
        scoreDisplayMy.textContent = `My score: ${myScore}`;

        cardSlot1.innerHTML = "";
        cardSlot2.innerHTML = "";

        bttDrawCards.disabled = false;
        bttDrawCards.addEventListener("click", drawTwoCards);
    })
}

function drawTwoCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        
        remainingCardsCount(data);

        cardSlot1.innerHTML = `<img src=${data.cards[0].image} class="card" />`;
        cardSlot2.innerHTML = `<img src=${data.cards[1].image} class="card" />`;

        let card1Value = data.cards[0].value;
        let card2Value = data.cards[1].value;
        updateScore(card1Value, card2Value);
    })
}

function remainingCardsCount(data) {
    remainCards = data.remaining;
    remainingCards.textContent = `Cards remaining: ${remainCards}`;
}

function updateScore(card1Value, card2Value) {

    switch(card1Value) {
        case "JACK":
            card1Value = 11;
        break;
        case "QUEEN":
            card1Value = 12;
        break;
        case "KING":
            card1Value = 13;
        break;
        case "ACE":
            card1Value = 14;
        break;
    };

    switch(card2Value) {
        case "JACK":
            card2Value = 11;
        break;
        case "QUEEN":
            card2Value = 12;
        break;
        case "KING":
            card2Value = 13;
        break;
        case "ACE":
            card2Value = 14;
        break;
    };
    
   card1Value = Number(card1Value);
   card2Value = Number(card2Value);

    if (card1Value > card2Value) {
        showHigher(cardSlot1);

        compScore += card1Value;
        scoreDisplayComp.textContent = `Computer score: ${compScore}`;

    } else if (card1Value < card2Value) {
        showHigher(cardSlot2);

        myScore += card2Value;
        scoreDisplayMy.textContent = `My score: ${myScore}`;
    }

    checkingWinner()
}

function showHigher(higherCard) {
    setTimeout(function() {
        higherCard.style.transform = "scale(1.1,1.1)"
        setTimeout(function() {
            higherCard.style.transform = "scale(1,1)"
        }, 200)
    }, 200)
}

function checkingWinner() {
    if (remainCards === 0) {
        bttDrawCards.disabled = true;
        message();
    }
}

function message() {
    setTimeout(function() {
        if (compScore > myScore) {
            winner.textContent = "Computer wins!";
        } else if (compScore < myScore) {
            winner.textContent = "You win!";
        } else {
            winner.textContent = "It's a tie!";
        }
        winner.classList.add("active");
    }, 500)
}





