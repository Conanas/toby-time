// reps, sets and rests inputs
var repTotal = document.getElementById("repTotal");
var restBetweenReps = document.getElementById("restBetweenReps");
var setTotal = document.getElementById("setTotal");
var restBetweenSets = document.getElementById("restBetweenSets");

// reps, sets and timer display
var repsDisplay = document.getElementById("repsDisplay");
var setsDisplay = document.getElementById("setsDisplay");
var timerSection = document.getElementById("timerSection");
var timeDisplay = document.getElementById("timeDisplay");

// buttons
var startTimerButton = document.getElementById("startTimer");
var pauseTimerButton = document.getElementById("pauseTimer");
var stopTimerButton = document.getElementById("stopTimer");
var showMeTobyButton = document.getElementById("showMeToby");

// timer settings
var interval;
var timeElapsed = 0;
var repsElapsed = 0;
var setsElapsed = 0;
var restMode;
var breakMode;

// hide pause, stop and showToby buttons
pauseTimerButton.setAttribute("style", "display: none;");
stopTimerButton.setAttribute("style", "display: none;");
showMeTobyButton.setAttribute("style", "display: none;");

// display the pause button and add click event listener
function displayPauseButton() {
    pauseTimerButton.setAttribute("style", "display: inline block;");
    pauseTimerButton.addEventListener("click", pauseTimer);
}

// display the stop button and add click event listener
function displayStopButton() {
    stopTimerButton.setAttribute("style", "display: inline block;");
    stopTimerButton.addEventListener("click", stopTimer);
}

// display showMeToby button and add click event listener
function displayShowMeTobyButton() {
    showMeTobyButton.setAttribute("style", "display: inline block;");
    showMeTobyButton.addEventListener("click", showMeToby);
}


// display start button and add click event listener
function displayStartButton() {
    startTimerButton.setAttribute("style", "display: inline block;");
    startTimerButton.addEventListener("click", startTimer);
}

// hide pause button
function hidePauseButton() {
    pauseTimerButton.setAttribute("style", "display: none;");
}

// hide stop button
function hideStopButton() {
    stopTimerButton.setAttribute("style", "display: none;");
}

// hide showMeToby button
function hideShowMeTobyButton() {
    showMeTobyButton.setAttribute("style", "display: none;");
}

// hide start button
function hideStartButton() {
    startTimerButton.setAttribute("style", "display: none;");
}

// start button displayed on startup and click event listener added
startTimerButton.addEventListener("click", startTimer);

// start the timer
function startTimer() {
    showOnStartButtons();
    updateTimeDisplay();
    repsElapsed++;
    updateRepsDisplay();
    interval = setInterval(function() {
        if (timeElapsed == restBetweenReps.value) {
            stopTimer();
            if (repsElapsed + 1 == repTotal.value) {
                repsElapsed++;
                updateRepsDisplay();
                displayShowMeTobyButton();
            }
        } else {
            timeElapsed++;
            updateTimeDisplay();
        }
    }, 1000);
}

function updateTimeDisplay() {
    timeDisplay.textContent = `${restBetweenReps.value - timeElapsed}`;
}

function stopTimer() {
    clearInterval(interval);
    timeElapsed = 0;
    displayStartButton();
    hidePauseButton();
    hideStopButton();
}

function updateRepsDisplay() {
    if (repsElapsed >= repTotal.value) {
        repsElapsed = 0;
        repsDisplay.textContent = 0;
    } else {
        repsDisplay.textContent = `${repTotal.value - repsElapsed}`;
    }
}

function showMeToby() {
    showMeTobyButton.setAttribute("style", "display: none;");
    $('#exampleModal').modal('show');
}

function showOnStartButtons() {
    if (showMeTobyButton.hidden == false) {
        showMeTobyButton.setAttribute("style", "display: none;");
    }
    hideStartButton();
    displayPauseButton();
    displayStopButton();
}