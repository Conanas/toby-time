var repTotal = document.getElementById("repTotal");
var restBetweenReps = document.getElementById("restBetweenReps");
var repsDisplay = document.getElementById("repsDisplay");
var timerSection = document.getElementById("timerSection");
var timeDisplay = document.getElementById("timeDisplay");
var startTimerButton = document.getElementById("startTimer");
var interval;
var timeElapsed = 0;
var repsElapsed = 0;

var showMeTobyButton = document.createElement("button");

startTimerButton.addEventListener("click", startTimer);

function startTimer() {
    updateTimeDisplay();
    repsElapsed++;
    updateRepsDisplay();
    interval = setInterval(function() {
        if (timeElapsed == restBetweenReps.value) {
            stopTimer();
            if (repsElapsed + 1 == repTotal.value) {
                repsElapsed++;
                updateRepsDisplay();
                addDisplayTobyButton();
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
}

function updateRepsDisplay() {
    if (repsElapsed >= repTotal.value) {
        repsElapsed = 0;
        repsDisplay.textContent = 0;
    } else {
        repsDisplay.textContent = `${repTotal.value - repsElapsed}`;
    }
}

function addDisplayTobyButton() {
    showMeTobyButton.textContent = "Show me Toby!";
    showMeTobyButton.setAttribute("id", "showMeTobyButton");
    timerSection.appendChild(showMeTobyButton);
    showMeTobyButton.addEventListener("click", displayToby);
}

function displayToby() {
    timerSection.removeChild(showMeTobyButton);
    $('#exampleModal').modal('show');
}