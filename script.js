var repTotal = document.getElementById("repTotal");
var restBetweenReps = document.getElementById("restBetweenReps");
var repsDisplay = document.getElementById("repsDisplay");
var timeDisplay = document.getElementById("timeDisplay");
var startTimerButton = document.getElementById("startTimer");
var interval;
var timeElapsed = 0;
var repsElapsed = 0;

startTimerButton.addEventListener("click", startTimer);

function startTimer() {
    updateTimeDisplay();
    updateReps();
    updateRepsDisplay();
    interval = setInterval(function() {
        timeElapsed++;
        updateTimeDisplay();
        if (timeElapsed >= restBetweenReps.value) {
            stopTimer();
            updateReps();
            updateRepsDisplay();
        }
    }, 1000);
}

function updateTimeDisplay() {
    timeDisplay.textContent = `${restBetweenReps.value - timeElapsed}`;
}

function stopTimer() {
    clearInterval(interval);
    timeElapsed = 0;
}

function updateReps() {
    if (repsElapsed != repTotal.value) {
        repsElapsed++;
    }
}

function updateRepsDisplay() {
    repsDisplay.textContent = `${repTotal.value - repsElapsed}`
}