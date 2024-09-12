// Selecting elements from the DOM
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const setDurationButton = document.getElementById("set-duration");
const pomodoroInput = document.getElementById("pomodoro-duration");
const breakInput = document.getElementById("break-duration");

const taskNameInput = document.getElementById("task-name");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let timer; // Stores the setInterval reference
let isPaused = true; // Timer starts paused
let timeRemaining = 50 * 60; // 50 minutes in seconds
let pomodoroDuration = 50 * 60; // Default Pomodoro duration (in seconds)
let breakDuration = 10 * 60; // Default break duration (in seconds)
let isPomodoro = true; // Start with Pomodoro

let currentTask = null; // Tracks the task being worked on
let tasks = []; // Array to hold task objects

function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

// Function to start the timer
function startTimer() {
  if (isPaused && currentTask) {
    // Ensure a task is selected before starting
    isPaused = false;
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
      } else {
        isPaused = true;
        clearInterval(timer); // Stop the timer when it reaches 0
        alert(
          isPomodoro
            ? "Pomodoro complete! Time for a break."
            : "Break complete! Time to start working again."
        );
        updateTaskPomodoro();
        switchSession(); // Switch to break or Pomodoro session
      }
    }, 100);
  } else if (!currentTask) {
    alert("Please select a task before starting the timer");
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

//   Funtion to add a task
function addTask() {
  const taskName = taskNameInput.value.trim();
  if (taskName === "") {
    alert("Please enter a task name");
    return;
  }

  const task = {
    name: taskName,
    pomodorosCompleted: 0,
    pomodorosRequired: 4, // Default to 4 pomodoros per task (can be customized later)
  };

  tasks.push(task);
  taskNameInput.value = ""; // Clear the input field
  renderTasks();
}

// Function to update the Pomodoro count for the current task
function updateTaskPomodoro() {
  if (currentTask !== null && isPomodoro) {
    currentTask.pomodorosCompleted++;
    renderTasks();
  }
}

//   Funtion to render tasks in the list
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const taskText = document.createElement("span");
    taskText.textContent = `${task.name} - ${task.pomodorosCompleted}/${task.pomodorosRequired} Pomodoros`;

    const taskButtons = document.createElement("div");

    const selectButton = document.createElement("button");
    selectButton.className = "btn btn-primary btn-sm me-2";
    selectButton.textContent = "Select";
    selectButton.addEventListener("click", () => selectTask(index));

    const completeButton = document.createElement("button");
    completeButton.className = "btn btn-success btn-sm";
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", () => completeTask(index));

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskButtons);
    taskButtons.appendChild(selectButton);
    taskButtons.appendChild(completeButton);
    taskList.appendChild(taskItem);

    if (index === currentTaskIndex) {
      taskItem.classList.add("bg-success", "text-white");
    }
  });
}

// Function to mark a task as selected
function selectTask(index) {
  currentTask = tasks[index]; // Set the selected task as the current task
  currentTaskIndex = index;
  highlightCurrentTask(index);
  renderTasks();
}

// Function to mark a task as completed
function completeTask(index) {
  tasks.splice(index, 1); // Remove the task from the list
  renderTasks();
}

function highlightCurrentTask(index) {
  const taskItems = taskList.querySelectorAll("li");
  taskItems.forEach((taskItem, i) => {
    if (i === index) {
      taskItem.classList.add("bg-success", "text-white");
    } else {
      taskItem.classList.remove("bg-success", "text-white");
    }
  });
}

// Event listeners for the buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
setDurationButton.addEventListener("click", setDurations);
addTaskButton.addEventListener("click", addTask);

// Initialize the display
updateDisplay();
