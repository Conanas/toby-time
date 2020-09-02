// labels for reps, sets and totals
var inputs = document.querySelector(".inputs");

// reps, sets and rests inputs
var repTotal = document.getElementById("repTotal");
var restBetweenReps = document.getElementById("restBetweenReps");
var setTotal = document.getElementById("setTotal");
var restBetweenSets = document.getElementById("restBetweenSets");

// reps, sets and timer display
var repsDisplay = document.getElementById("repsDisplay");
var repsDisplaySpan = document.getElementById("repsDisplaySpan");
var setsDisplay = document.getElementById("setsDisplay");
var setsDisplaySpan = document.getElementById("setsDisplaySpan");
var timeDisplay = document.getElementById("timeDisplay");
var timerSection = document.getElementById("timerSection");

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


// input labels and boxes hide/show functions

// hide labels and boxes
function hideInputs() {
    inputs.setAttribute("style", "display: none;");
}

// show labels and boxes
function showInputs() {
    inputs.setAttribute("style", "display: inline block;");
}

// hide timer display elements
function hideTimerDisplayElements() {
    repsDisplay.setAttribute("style", "display: none;");
    setsDisplay.setAttribute("style", "display: none;");
    timeDisplay.setAttribute("style", "display: none;");
}

// show timer display elements
function showTimerDisplayElements() {
    repsDisplay.setAttribute("style", "display: inline block;");
    setsDisplay.setAttribute("style", "display: inline block;");
    timeDisplay.setAttribute("style", "display: inline block;");
}

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
        repsDisplaySpan.textContent = 0;
    } else {
        repsDisplaySpan.textContent = `${repTotal.value - repsElapsed}`;
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

function showCompleteMessage() {
    var completeMessageDiv = document.createElement("div");
    completeMessageDiv.textContent = "Complete!";
    completeMessageDiv.setAttribute("id", "completeMessage");
    timerSection.appendChild(completeMessageDiv);

    var completeMessageInterval = setTimeout(function() {
        timerSection.removeChild(completeMessageDiv);
    }, 1000)
}

// start the timer
function startTimer() {
    hideInputs();
    showTimerDisplayElements();
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
                hideTimerDisplayElements();
                showInputs();
                showCompleteMessage();
                displayShowMeTobyButton();
            }
        } else {
            timeElapsed++;
            updateTimeDisplay();
        }
    }, 1000);
}

// stop screen from sleeping
const requestWakeLock = async() => {
    try {

        const wakeLock = await navigator.wakeLock.request('screen');

    } catch (err) {
        // the wake lock request fails - usually system related, such low as battery

        console.log(`${err.name}, ${err.message}`);
    }
}

requestWakeLock();

// on page load hide time, reps and sets displays

// hide pause, stop and showToby buttons
hidePauseButton();
hideStopButton();
hideShowMeTobyButton();

// hide timer display elements
hideTimerDisplayElements();

// start button displayed on startup and click event listener added
startTimerButton.addEventListener("click", startTimer);