const gameState = {
  secretNumber: null,
  attempt: 5,
  isWinning: false,
  gameOver: false,
};

// DOM elements
const playerInput = document.getElementById("playerInput");
const inputButton = document.getElementById("inputButton");
const attempt = document.getElementById("attempts");
const message = document.getElementById("message");
const resetButton = document.getElementById("restartButton");

function initGame() {
  // Generate a random secret number between 1 and 100
  gameState.secretNumber = generateSecretNumber();
  console.log("secret:" + gameState.secretNumber); // For debugging purposes

  // Reset UI elements
  resetGame(); // Reset game state
  updateGuessCount(); // Update guess count display
  inputButton.disabled = false;
  resetButton.style.display = "none"; // Hide reset button initially

  // Set focus on input
  playerInput.focus();

  // Add event listener to button
  inputButton.addEventListener("click", handleInput);
  playerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleInput();
    }
  });

  resetButton.addEventListener("click", initGame); // Restart the game
}

function handleInput() {
  if (gameState.attempt > 0 && !gameState.gameOver) {
    const playerInputValue = parseInt(playerInput.value);

    if (isUserInputValidate(playerInputValue)) return; // Validate input

    // Increment guess count
    gameState.attempt--;
    updateGuessCount();

    // Check guess
    if (playerInputValue === gameState.secretNumber) {
      handleCorrectGuess();
    } else if (playerInputValue < gameState.secretNumber) {
      handleTooLowGuess();
    } else {
      handleTooHighGuess();
    }

    playerInput.value = ""; // Clear input field
    playerInput.focus();
  }

  if (gameState.attempt === 0) {
    gameOver(); // End the game if no attempts left
  }
}

function handleCorrectGuess() {
  gameState.attempt = 0; // End the game immediately if guessed correctly
  gameState.isWinning = true;
  gameState.gameOver = true; // End the game
}

function handleTooLowGuess() {
  message.textContent = "Too low! Try a higher number.";
}

function handleTooHighGuess() {
  message.textContent = "Too high! Try a lower number.";
}

function gameOver() {
  if (gameState.isWinning) {
    message.textContent =
      "Congratulations, you guessed the number. The secret number was " +
      gameState.secretNumber;
  } else {
    message.textContent =
      "You lose! The secret number was " + gameState.secretNumber;
  }

  resetButton.style.display = "block"; // Show reset button
  inputButton.disabled = true; // Disable the button after game over
}

function generateSecretNumber() {
  return (gameState.secretNumber = Math.floor(Math.random() * 100) + 1);
}

function isUserInputValidate(playerInput) {
  if (
    isNaN(playerInput) ||
    playerInput > 100 ||
    playerInput < 0 ||
    playerInput === ""
  ) {
    message.textContent = "Please enter a valid number between 1-100";
    return true;
  }
}

function resetGame() {
  message.textContent = ""; // Clear message
  playerInput.value = ""; // Clear input field
  gameState.attempt = 5; // Reset attempts to 5
  gameState.isWinning = false; // Reset winning state
  gameState.gameOver = false; // Reset game over state
}

function updateGuessCount() {
  attempt.textContent = "Attempts left: " + gameState.attempt;
}

initGame(); // Initialize the game
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const gameState = {
//   attempt: 5,
//   secretNumber: 0,
//   isWinning: false,
//   gameOver: false,
// };

// // DOM elements
// const attempt = document.getElementById("attempts");
// const playerInput = document.getElementById("playerInput");
// const inputButton = document.getElementById("inputButton");
// const message = document.getElementById("message");

// function initGame() {
//   // Generate a random secret number between 1 and 100
//   generateSecretNumber();

//   // Disable the input button initially
//   inputButton.disabled = false;

//   // add event listeners to buttons
//   inputButton.addEventListener("click", handleClick);
// }

// function generateSecretNumber() {
//   gameState.secretNumber = Math.floor(Math.random() * 100) + 1;
// }

// function handleClick() {
//   if (gameState.attempt > 0 && !gameState.gameOver) {
//     const playerInputValue = parseInt(playerInput.value);
//     if (validateUserInput(playerInputValue)) {
//       checkGuess(playerInputValue);
//       gameState.attempt--;
//       attempt.textContent = "Attempts left: " + gameState.attempt;
//     }
//     if (gameState.attempt === 0) {
//       gameOver();
//     }
//   }
// }

// function validateUserInput(playerInput) {
//   if (isNaN(playerInput) || playerInput > 100 || playerInput < 0) {
//     message.textContent = "Please enter a valid number between 1-100";
//     return false;
//   }
// }

// function checkGuess(playerInput) {
//   if (playerInput > gameState.secretNumber) {
//     message.textContent = "Too high! Try a lower number";
//   } else if (playerInput < gameState.secretNumber) {
//     message.textContent = "Too low! Try a higher number.";
//   } else {
//     gameState.isWinning = true;
//     gameState.attempt = 0; // End the game immediately if guessed correctly
//   }
// }

// function gameOver() {
//   if (gameState.isWinning) {
//     message.textContent =
//       "Congratulations, you guessed the number. The secret number was " +
//       gameState.secretNumber;
//   } else {
//     message.textContent =
//       "You lose! The secret number was " + gameState.secretNumber;
//   }
//   gameState.gameOver = true;
//   inputButton.disabled = true; // Disable the button after game over
// }

// initGame(); // Initialize the game

// function playGame() {
//   generateSecretNumber();
//   console.log(gameState.secretNumber); // For debugging purposes

//   inputButton.addEventListener("click", function () {
//     const playerInputValue = parseInt(playerInput.value, 10);
//     if (gameState.attempt > 0 && !gameState.gameOver) {
//       if (validateUserInput(playerInputValue)) {
//         checkGuess(playerInputValue);
//         gameState.attempt--;
//         attempt.textContent = "Attempts left: " + gameState.attempt;
//       }
//       if (gameState.attempt === 0) {
//         gameOver();
//       }
//     }
//   });
// }

// function checkGuess(playerInput) {
//   if (playerInput > gameState.secretNumber) {
//     console.log("Too high!");
//   } else if (playerInput < gameState.secretNumber) {
//     console.log("Too low!");
//   } else {
//     gameState.isWinning = true;
//     gameState.attempt = 0; // End the game immediately if guessed correctly
//   }
// }

// function gameOver() {
//   if (gameState.isWinning) {
//     console.log("Congratulations, you guessed the number.");
//   } else {
//     console.log("You lose!");
//   }
//   console.log("Game over!");
// }

// function playGame() {
//   generateSecretNumber();
//   console.log(gameState.secretNumber); // For debugging purposes

//   while (gameState.attempt > 0) {
//     // const playerInput = prompt("Please enter a number between 1-100: ");
//     if (validateUserInput(playerInput)) {
//       checkGuess(playerInput);
//       gameState.attempt--;
//     }
//   }
//   console.log(`Secret number: ${gameState.secretNumber}`);
//   gameOver();
// }

// // playGame();
