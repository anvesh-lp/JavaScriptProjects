/*
    RULES
    - player must guess a number between min and max
    - Player gets a certain amounts of guesses
    - Notify player of remaining guesses
    - Notify the player of the correct answer if loose
    - let player choose to play again
*/

let min = 1,
    max = 10,
    //Generating a random number
    winningNum = getRandomeNumber(min, max),
    guessesLeft = 3;
console.log(winningNum);

// UI Elements

const game = document.querySelector('#game');
minNumber = document.querySelector('.min-num'),
    maxNumber = document.querySelector('.max-num'),
    guessedNumber = document.querySelector('#guess-input'),
    submitButton = document.querySelector('#guess-value'),
    message = document.querySelector('.message');

minNumber.textContent = min;
maxNumber.textContent = max;

//Add event listener for button


submitButton.addEventListener('click', checkNumber);

game.addEventListener('click', function (x) {
    if (x.target.className === 'play-again') {
        window.location.reload();
    }
});


function checkNumber(event) {
    let inputValue = guessedNumber.value;
    if (inputValue === 'NaN' || inputValue < min || inputValue > max) {
        //Show message
        showMessage(`Input number must be greater than ${min} and less than ${max}`, 'red');
    } else {
        if (parseInt(inputValue) === winningNum) {
            //SHow Message
            gameWon(`You Guessed correct!!!..answer is ${inputValue}`, 'green');
            guessedNumber.disabled = true;
        } else {
            tryAgain(inputValue);
        }
    }
}

function gameWon(s, green) {
    showMessage(s, green);
    submitButton.value = 'play again';
    submitButton.className += 'play-again'

}

function tryAgain(inputValue) {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
        showMessage(`you lost the game, correct answer is ${winningNum}`, 'red');
        submitButton.value = 'Try Again?';
        submitButton.className += 'play-again'
        guessedNumber.disabled = true;
        guessedNumber.value = '';
    } else {
        showMessage(`your guess ${inputValue} is incorrect, ${guessesLeft} guesses left`, 'red');
        guessedNumber.value = '';
    }
}

function getRandomeNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function showMessage(s, colour) {
    message.textContent = s;
    message.style.color = colour;
    guessedNumber.style.borderColor = colour;
}


