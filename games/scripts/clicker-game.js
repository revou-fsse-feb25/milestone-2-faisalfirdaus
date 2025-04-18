const gameState = {
  score: 0,
  time: 10,
  isGameOver: false,
};

// DOM elements
const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("click-button");
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

// Timer variable
let interval;

// Initialize game
function initGame() {
  // Disable click button and reset button
  clickButton.disabled = true;
  resetButton.disabled = true;

  // add event listeners to buttons
  clickButton.addEventListener("click", handleClick);

  // add event listener to timer button
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  // Update displays
  updateScoreDisplay();
  updateCountdownDisplay();
}

// Start the game
function startGame() {
  gameState.isGameOver = false;
  gameState.score = 0;
  startButton.disabled = true;
  resetButton.disabled = false;
  clickButton.disabled = false;
  updateScoreDisplay();
  updateCountdownDisplay();

  // Start countdown
  interval = setInterval(() => {
    gameState.time--;
    updateCountdownDisplay();
    if (gameState.time <= 0) {
      endGame();
    }
  }, 1000);
}

// Reset game
function resetGame() {
  // Reset game state
  gameState.points = 0;
  gameState.time = 10;
  gameState.isGameOver = true;

  startButton.disabled = false;
  clickButton.disabled = true;
  resetButton.disabled = true;

  // Clear interval
  clearInterval(interval);

  updateScoreDisplay();
  updateCountdownDisplay();
}

// End game
function endGame() {
  clickButton.disabled = true;
  startButton.disabled = false;

  clearInterval(interval);
}

// Haddle button click
function handleClick() {
  if (gameState.isGameOver) return;

  gameState.score++;
  updateScoreDisplay();
}

// Update score display
function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + gameState.score;
}

// Update countdown display
function updateCountdownDisplay() {
  const minutes = Math.floor(gameState.time / 60);
  const seconds = gameState.time % 60;

  const dispplayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  countdownDisplay.textContent = `${dispplayMinutes}:${displaySeconds}`;
}

initGame();
