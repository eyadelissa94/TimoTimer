// Selecting elements from the DOM
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

let timer; // Stores the setInterval reference
let isPaused = true; // Timer starts paused
let timeRemaining = 25 * 60; // 25 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// Function to start the timer
function startTimer() {
    if (isPaused) {
      isPaused = false;
      timer = setInterval(() => {
        if (timeRemaining > 0) {
          timeRemaining--;
          updateDisplay();
        } else {
          clearInterval(timer); // Stop the timer when it reaches 0
          alert("Pomodoro complete!");
        }
      }, 1000);
    }
  }
  
  // Function to pause the timer
  function pauseTimer() {
    if (!isPaused) {
      isPaused = true;
      clearInterval(timer);
    }
  }
  
  // Function to reset the timer
  function resetTimer() {
    isPaused = true;
    clearInterval(timer);
    timeRemaining = 25 * 60; // Reset to 25 minutes
    updateDisplay();
  }
  
  // Event listeners for the buttons
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
  
  // Initialize the display
  updateDisplay();