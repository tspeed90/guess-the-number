const gameNumber = Math.floor(Math.random() * 100 + 1);
let playerGuess;
let guessField = document.querySelector(".guess-field");
let messages = document.querySelector(".messages");
let guessButton = document.querySelector("button");

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
        messages.innerText = "Good guess. You're not far off!";
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
