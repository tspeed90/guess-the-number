const gameNumber = Math.floor(Math.random() * 100 + 1);
let playerGuess = -1;
let guessCount = 0;
let guessField = document.querySelector('.guess-field');
let messages = document.querySelector('.messages');
let guessButton = document.querySelector('.submit-btn');
let hintButton = document.querySelector('.hint-btn');
let hintMessage = document.querySelector('.hint-message');
let hintCount = document.querySelector('.hint-count');
let hintList = [
  checkEvenOrOdd,
  compareLastGuess,
  checkDivisibleBy,
  checkHigherThan50,
  giveOneDigit
];

hintCount.textContent = '0';
guessField.focus();

if (gameNumber < 10) {
  let giveDigitIndex = hintList.indexOf(giveOneDigit);
  hintList.splice(giveDigitIndex, 1);
}

if (checkDivisibleBy() === undefined) {
  let divisibleByIndex = hintList.indexOf(checkDivisibleBy);
  hintList.splice(divisibleByIndex, 1);
}

function displayAfterWin() {
  messages.innerText =
    guessCount === 1
      ? 'Congratulations!\n You guessed it in ' + guessCount + ' guess!'
      : 'Congratulations!\n You guessed it in ' + guessCount + ' guesses!';
  guessField.style.display = 'none';
  hintButton.textContent = 'Play Again!';
  guessButton.innerText = 'Play Again';
  guessButton.removeAttribute('hidden');
  hintButton.removeEventListener('click', checkPlayerGuess);
  hintButton.addEventListener('click', function() {
    window.location.reload();
  });
}
function checkPlayerGuess() {
  hintMessage.innerText = '';
  guessCount++;
  playerGuess = guessField.value;
  playerGuess = parseInt(playerGuess, 10);
  if (playerGuess === gameNumber) {
    displayAfterWin();
  }
  if (playerGuess !== gameNumber) {
    let difference = Math.abs(gameNumber - playerGuess);
    if (difference <= 3) {
      messages.innerText = 'Great guess! Very close!';
    } else if (difference <= 10) {
      messages.innerText = "Good guess. You're not too far!";
    } else {
      messages.innerText = 'Ooo! Try again!';
    }
  }
}

guessButton.addEventListener('click', checkPlayerGuess);
guessField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkPlayerGuess();
  }
});

function displayHint(hint) {
  hintMessage.innerText = hint;
}

// --- HINTS ---
function checkEvenOrOdd() {
  return gameNumber % 2 === 0 ? 'The number is even.' : 'The number is odd.';
}

function compareLastGuess() {
  return playerGuess > gameNumber
    ? 'The number is lower than your guess of ' + playerGuess + '.'
    : 'The number is higher than your guess of ' + playerGuess + '.';
}

function checkDivisibleBy() {
  if (gameNumber % 5 === 0) {
    return 'The number is divisible by 5.';
  } else if (gameNumber % 6 === 0) {
    return 'The number is divisible by 6.';
  } else if (gameNumber % 7 === 0) {
    return 'The number is divisible by 7.';
  } else if (gameNumber % 8 === 0) {
    return 'The number is divisible by 8.';
  } else if (gameNumber % 9 === 0) {
    return 'The number is divisible by 9.';
  }
  return undefined;
}

function checkHigherThan50() {
  return gameNumber >= 50
    ? 'The number is greater than or equal to 50.'
    : 'The number is less than 50.';
}

function giveOneDigit() {
  if (gameNumber < 10) {
    return undefined;
  }
  let gameNumberString = gameNumber.toString();
  let gameNumberDigit = gameNumberString[Math.floor(Math.random() * 2)];
  return 'One of the digits from the number is ' + gameNumberDigit + '.';
}

let usedHints = [];

hintButton.addEventListener('click', function() {
  if (playerGuess === -1) {
    hintMessage.innerText =
      "Sorry, I can't give you any hints until you've made a guess.";
  } else {
    let randomIndex = Math.floor(Math.random() * hintList.length);
    while (usedHints.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * hintList.length);
    }
    const hintSelected = hintList[randomIndex];
    displayHint(hintSelected());
    usedHints.push(randomIndex);
    hintCount.textContent = usedHints.length;
    console.log(hintList);
  }
  if (usedHints.length >= hintList.length) {
    usedHints = [];
  }
});

module.exports = {
  checkEvenOrOdd,
  checkDivisibleBy,
  checkHigherThan50,
  giveOneDigit,
  compareLastGuess
};
