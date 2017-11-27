const gameNumber = Math.floor(Math.random() * 100 + 1);
let playerGuess = -1;
let guessCount = 0;
let guessField = document.querySelector(".guess-field");
let messages = document.querySelector(".messages");
let guessButton = document.querySelector(".submit-btn");
let hintButton = document.querySelector(".hint-btn");
let hintMessage = document.querySelector(".hint-message");
let inputArea = document.querySelector(".input-area");
let hintList = [checkEvenOrOdd, compareLastGuess, checkDivisibleBy, checkHigherThan50, giveOneDigit];

if (gameNumber < 10) {
  let giveDigitIndex = hintList.indexOf(giveOneDigit);
  hintList.splice(giveDigitIndex);
}

function displayAfterWin() {
  messages.innerText = guessCount === 1 ? "Congratulations!\n You guessed it in " + guessCount + " guess!": "Congratulations!\n You guessed it in " + guessCount + " guesses!";
  guessField.style.display = "none";
  hintButton.style.display = "none";
  guessButton.innerText = "Play Again";
  guessButton.removeEventListener("click", checkPlayerGuess);
  guessButton.addEventListener("click", function() {
    window.location.reload();
  });
}
function checkPlayerGuess() {
  hintMessage.innerText = "";
  guessCount++;
  playerGuess = guessField.value;
  playerGuess = parseInt(playerGuess, 10);
  if (playerGuess === gameNumber) {
    displayAfterWin();
  }
  if (playerGuess !== gameNumber) {
    let difference = Math.abs(gameNumber - playerGuess);
    if (difference <= 3) {
      messages.innerText = "Great guess! Very close!";
    } else if (difference <= 10) {
      messages.innerText = "Good guess. You're not too far!";
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
function compareLastGuess() {
  hintMessage.innerText = playerGuess > gameNumber ? "The number is lower than your guess of " + playerGuess +"." : "The number is higher than your guess of " + playerGuess + ".";
}
function checkDivisibleBy() {
  if (gameNumber % 5 === 0) {
    hintMessage.innerText = "The number is divisible by 5.";
  } else if (gameNumber % 6 === 0) {
    hintMessage.innerText = "The number is divisible by 6.";
  } else if (gameNumber % 7 === 0) {
    hintMessage.innerText = "The number is divisible by 7.";
  } else if (gameNumber % 8 === 0) {
    hintMessage.innerText = "The number is divisible by 8.";
  } else if (gameNumber % 9 === 0) {
    hintMessage.innerText = "The number is divisible by 9.";
  }
}
function checkHigherThan50() {
  hintMessage.innerText = gameNumber >= 50 ? "The number is greater than or equal to 50." : "The number is less than 50."
}
function giveOneDigit() {
  let gameNumberString = gameNumber.toString();
  let gameNumberDigit = gameNumberString[Math.floor(Math.random() * 2)];
  hintMessage.innerText = "One of the digits from the number is " + gameNumberDigit + ".";
}

let usedHints = [];

hintButton.addEventListener('click', function() {
  if (playerGuess === -1) {
    hintMessage.innerText = "Sorry, I can't give you any hints until you've made a guess."
  } else {
    let randomIndex = Math.floor(Math.random() * hintList.length);
    while (usedHints.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * hintList.length);
    }
    hintList[randomIndex]();
    usedHints.push(randomIndex);
  }
  if (usedHints.length >= hintList.length) {
    usedHints = [];
  }
});
