const gameNumber = Math.floor(Math.random() * 100 + 1);
let playerGuess = -1;
let guessField = document.querySelector(".guess-field");
let messages = document.querySelector(".messages");
let guessButton = document.querySelector(".submit-btn");
let hintButton = document.querySelector(".hint-btn");
let hintMessage = document.querySelector(".hint-message");


function checkPlayerGuess() {
    playerGuess = guessField.value;
    playerGuess = parseInt(playerGuess, 10);
    if (playerGuess === gameNumber) {
      messages.innerText = "Congratulations! You guessed it!";
    }
    if (playerGuess !== gameNumber) {
      let difference = Math.abs(gameNumber - playerGuess);
      if (difference <= 3) {
        messages.innerText = "Great guess! Very close!";
      } else if (difference <= 10) {
        messages.innerText = "Good guess. Getting closer!";
      } else {
        messages.innerText = "Ooo! Try again!";
      }
    }
  }
guessButton.addEventListener('click', checkPlayerGuess);
guessField.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    checkPlayerGuess();
  }
});
function checkEvenOrOdd() {
  hintMessage.innerText = gameNumber % 2 === 0  ?  "The number is even." : "The number is odd.";
}
hintButton.addEventListener('click', function() {
  if (playerGuess === -1) {
    hintMessage.innerText = "Sorry, I can't give you any hints until you've made a guess."
  } else {
    checkEvenOrOdd();
  }
});
