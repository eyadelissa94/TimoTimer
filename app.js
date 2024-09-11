// Selecting elements from the DOM
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const setDurationButton = document.getElementById('set-duration');
const pomodoroInput = document.getElementById('pomodoro-duration');
const breakInput = document.getElementById('break-duration');

let timer; // Stores the setInterval reference
let isPaused = true; // Timer starts paused
let timeRemaining = 50 * 60; // 25 minutes in seconds
let pomodoroDuration = 50 * 60; // Default Pomodoro duration (in seconds)
let breakDuration = 10 * 60; // Default break duration (in seconds)
let isPomodoro = true; // Start with Pomodoro

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
            isPaused = true;
          clearInterval(timer); // Stop the timer when it reaches 0
          alert(isPomodoro ? "Pomodoro complete! Time for a break." : "Break complete! Time to start working again.");
          switchSession(); // Switch to break or Pomodoro session
        }
      }, 250);
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
    timeRemaining = isPomodoro ? pomodoroDuration : breakDuration;
    updateDisplay();
  }

  // Function to switch between Pomodoro and break sessions
  function switchSession() {
    isPomodoro = !isPomodoro; // Toggle between Pomodoro and break
    timeRemaining = isPomodoro ? pomodoroDuration : breakDuration; // Set the new session time
    updateDisplay();
  }

  // Function to set custom Pomodoro and break durations
  function setDurations() {
    pomodoroDuration = parseInt(pomodoroInput.value) * 60; // Convert minutes to seconds
    breakDuration = parseInt(breakInput.value) * 60;
    timeRemaining = pomodoroDuration; // Reset the timer to new Pomodoro duration
    isPomodoro = true; // Always start with Pomodoro
    updateDisplay();
  }
  
  // Event listeners for the buttons
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  resetButton.addEventListener('click', resetTimer);
  setDurationButton.addEventListener('click', setDurations);
  
  // Initialize the display
  updateDisplay();