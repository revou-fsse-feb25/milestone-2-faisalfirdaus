const gameState = {
  playerScore: 0,
  computerScore: 0,
  tieScore: 0,
  choices: ["rock", "paper", "scissors"],
};

// DOM elements
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("computerScore");
const tieScoreElement = document.getElementById("tieScore");
const playerSelectionElement = document.getElementById("playerSelection");
const computerSelectionElement = document.getElementById("computerSelection");
const choices = document.querySelectorAll(".choice");
const resetButton = document.getElementById("restartButton");
const message = document.getElementById("message");

function initGame() {
  // Add event listeners to choice buttons
  choices.forEach((choice) => {
    choice.addEventListener("click", () => playGame(choice.id));
  });

  // add event listener to reset button
  resetButton.addEventListener("click", resetGame);

  // Reset UI elements
  resetButton.style.display = "none"; // Hide reset button initially
  // resetGame(); // Reset game state
  updateScoresDisplay(); // Update scores display
  playerSelectionElement.textContent = "Player: ";
  computerSelectionElement.textContent = "Computer: ";
  message.textContent = ""; // Clear message
}

let count = 0;
function playGame(playerChoice) {
  if (gameState.playerScore < 3 && gameState.computerScore < 3) {
    const computerChoice = getComputerChoice();

    updateSelectionElements(playerChoice, computerChoice);

    result = determineWinner(playerChoice, computerChoice);

    showResultMessage(result, playerChoice, computerChoice);

    // Debugging message
    count++;
    console.log(`play ${count}`);

    updateScoresDisplay();

    if (gameState.playerScore >= 3 || gameState.computerScore >= 3) {
      gameOver(); // Call gameOver function when the game ends
    }
  }
}

function getComputerChoice() {
  return gameState.choices[
    Math.floor(Math.random() * gameState.choices.length)
  ];
}

function updateSelectionElements(playerChoice, computerChoice) {
  playerSelectionElement.textContent = `Player: ${capitalizeFirstLetter(
    playerChoice
  )}`;
  computerSelectionElement.textContent = `Computer: ${capitalizeFirstLetter(
    computerChoice
  )}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    gameState.tieScore++;
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    gameState.playerScore++;
    return "player";
  } else {
    gameState.computerScore++;
    return "computer";
  }
}

function updateScoresDisplay() {
  playerScoreElement.textContent = gameState.playerScore;
  computerScoreElement.textContent = gameState.computerScore;
  tieScoreElement.textContent = gameState.tieScore;
}

function showResultMessage(result, playerChoice, computerChoice) {
  if (result === "player") {
    message.textContent = `You win! ${capitalizeFirstLetter(
      playerChoice
    )} beats ${computerChoice}.`;
  } else if (result === "computer") {
    message.textContent = `You lose! ${capitalizeFirstLetter(
      computerChoice
    )} beats ${playerChoice}.`;
  } else {
    message.textContent = `It's a tie! Both chose ${playerChoice}.`;
  }
}

function gameOver() {
  if (gameState.playerScore > gameState.computerScore) {
    message.textContent = "Congratulations! You are the overall winner!";
  } else if (gameState.computerScore > gameState.playerScore) {
    message.textContent = "Computer is the overall winner!";
  } else {
    message.textContent = "It's a draw!";
  }
  resetButton.style.display = "block"; // Show reset button
}

function resetGame() {
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  gameState.tieScore = 0;

  resetButton.style.display = "none"; // Hide reset button initially
  // resetGame(); // Reset game state
  updateScoresDisplay(); // Update scores display
  playerSelectionElement.textContent = "Player: ";
  computerSelectionElement.textContent = "Computer: ";
  message.textContent = ""; // Clear message
  // initGame(); // Reinitialize the game
}

initGame();

// let turn = 3;
// let playerScore = 0;
// let computerScore = 0;

// const choices = ["rock", "paper", "scissors"];

// while (turn > 0) {
//   let playerChoice = prompt("Enter your choice (rock, paper, scissors): ");

//   if (!choices.includes(playerChoice)) {
//     console.log("Invalid choice! Please enter rock, paper, or scissors.");
//   } else {
//     let computerChoice = choices[Math.floor(Math.random() * 3)];
//     console.log(playerChoice);
//     console.log(computerChoice);

//     if (playerChoice === computerChoice) {
//       console.log("It's a tie!");
//     } else if (
//       (playerChoice === "rock" && computerChoice === "scissors") ||
//       (playerChoice === "paper" && computerChoice === "rock") ||
//       (playerChoice === "scissors" && computerChoice === "paper")
//     ) {
//       console.log("You win!");
//       playerScore++;
//     } else {
//       console.log("Computer wins!");
//       computerScore++;
//     }

//     turn--;
//   }
// }

// console.log(
//   "Final Score - Player: " + playerScore + ", Computer: " + computerScore
// );
// if (playerScore > computerScore) {
//   console.log("Congratulations! You are the overall winner!");
// } else if (computerScore > playerScore) {
//   console.log("Computer is the overall winner!");
// } else {
//   console.log("It's a draw!");
// }
