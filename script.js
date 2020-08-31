var repTotal = document.getElementById("repTotal");
var restBetweenReps = document.getElementById("restBetweenReps");
var timeDisplay = document.getElementById("timeDisplay");
var startTimerButton = document.getElementById("startTimer");
var interval;
var timeRemaining = 0;

startTimerButton.addEventListener("click", startTimer);

function startTimer() {
    updateTimeDisplay();
    interval = setInterval(function() {
        timeRemaining++;
        updateTimeDisplay();
        if (timeRemaining == restBetweenReps.value) {
            stopTimer();
        }
    }, 1000);
}

function updateTimeDisplay() {
    timeDisplay.textContent = `${restBetweenReps.value - timeRemaining}`;
}

function stopTimer() {
    clearInterval(interval);
    timeRemaining = 0;
}