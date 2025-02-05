const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const invalidInputMessage = document.getElementById('invalid-input');

let targetNumber;//stores randomly generated number
let attempts = 0;//tracks number guess player made
const maxNumberOfAttempts = 5;//constant stores max number allowed

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  //check for validity from the start
  //could output different messages based on too hight, too low or NaN but i'm in a hurry...
  if(isNaN(guess) || guess < 1 || guess > 99) {
    hideAllMessages();
    invalidInputMessage.style.display = ''; // Show invalid input message

    if(isNaN(guess)) {
      invalidInputMessage.innerHTML = 'Please enter a number.'
    } else if(guess < 1) {
      invalidInputMessage.innerHTML = 'Number must be greater than 1.'
    } else if(guess > 99) {
      invalidInputMessage.innerHTML = 'Number must be less than 99.'
    }

    guessInput.value = ''; //clears the input field
    return;
  }

  attempts = attempts + 1;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    //use a singular or plural form based on remaining attempts
    const guessText = remainingAttempts === 1 ? "guess" : "guesses";

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessText} remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  guessInput.value = '';
  resetButton.style.display = '';
}

//hides all messages when you call this function
function hideAllMessages() {
  for (let element of messages) {
    element.style.display = 'none';
  }
}
// this function initializes or resets the game
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);//this logs the random number to the console

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  //hides the reset button and the messages
  hideAllMessages();
  resetButton.style.display = 'none';
}
//event listeners based on user clicking the button, runs the callbacks 
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
