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
    updateRepsDisplay();
    interval = setInterval(function() {
        if (timeElapsed == restBetweenReps.value) {
            stopTimer();
            repsElapsed++;
            updateRepsDisplay();
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
}

function updateRepsDisplay() {
    if (repsElapsed >= repTotal.value) {
        repsElapsed = 0;
        repsDisplay.textContent = 0;
    } else {
        repsDisplay.textContent = `${repTotal.value - repsElapsed}`;
    }
}