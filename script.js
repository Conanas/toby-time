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
var startBreakTimerButton = document.getElementById("startBreakTimer");
var pauseTimerButton = document.getElementById("pauseTimer");
var stopTimerButton = document.getElementById("stopTimer");
var showMeTobyButton = document.getElementById("showMeToby");

// timer settings
var interval;
var breakInterval;
var timeElapsed = 0;
var breakTimeElapsed = 0;
var repsElapsed = 0;
var setsElapsed = 1;
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

// show start break button and add click event listener
function showStartBreakTimerButton() {
    startBreakTimerButton.setAttribute("style", "display: inline block;");
    startBreakTimerButton.addEventListener("click", startBreakTimer);
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

// hide start break button
function hideStartBreakTimerButton() {
    startBreakTimerButton.setAttribute("style", "display: none;");
}

// update time display --- only updates reps!!!!!
function updateTimeDisplay() {
    timeDisplay.textContent = `${restBetweenReps.value - timeElapsed}`;
}

// stops the interval timer
function stopTimer() {

    // clears the interval
    clearInterval(interval);

    // resets the time elapsed
    timeElapsed = 0;

    // displays the start button
    displayStartButton();

    // hides the pause and stop button
    hidePauseButton();
    hideStopButton();
}

// updates the reps left display
function updateRepsDisplay() {

    // if the reps elapsed is greater than or equal to the rep total input
    if (repsElapsed >= repTotal.value) {

        // reset the reps and display reps remaining to 0
        repsElapsed = 0;
        repsDisplaySpan.textContent = 0;

    } else {

        // update the reps to display the rep total input - reps elapsed
        repsDisplaySpan.textContent = `${repTotal.value - repsElapsed}`;
    }
}

// updates the sets left display
function updateSetsDisplay() {
    setsDisplaySpan.textContent = `${setTotal.value - setsElapsed}`
}

// show me Toby function
function showMeToby() {

    // hide the show me Toby button
    showMeTobyButton.setAttribute("style", "display: none;");

    // show the Toby modal
    $('#exampleModal').modal('show');
}

// show the buttons on start of application
function showOnStartButtons() {

    // if show me toby button is visible
    if (showMeTobyButton.hidden == false) {

        // hide show me Toby button
        showMeTobyButton.setAttribute("style", "display: none;");
    }

    // hide start button
    hideStartButton();
    hideStartBreakTimerButton();

    // show pause and stop buttons
    displayPauseButton();
    displayStopButton();
}

// show the complete message upon completion of all sets and reps
function showCompleteMessage() {

    // create message div
    var completeMessageDiv = document.createElement("div");

    // set text content to Complete
    completeMessageDiv.textContent = "Well Done Jo!";

    // set id to completeMessage
    completeMessageDiv.setAttribute("id", "completeMessage");

    // append to timer section display
    timerSection.appendChild(completeMessageDiv);

    // timeout out to clear complete message
    var completeMessageInterval = setTimeout(function() {
        timerSection.removeChild(completeMessageDiv);
    }, 1000)
}

// start break timer
function startBreakTimer() {

    // update break time display

    // show pause and stop buttons

    // start break interval timer
    breakInterval = setInterval(function() {

        // when timer reaches 0
        if (breakTimeElapsed == restBetweenSets.value) {

            // stop break interval timer
            clearInterval(breakInterval);

            // reset break time elapsed
            breakTimeElapsed = 0;

            // hide break timer button
            hideStartBreakTimerButton();

            // do more sets

            // show start timer button
            displayStartButton();


        } else {

            // increase time elapsed
            breakTimeElapsed++;

            // update the time display
            timeDisplay.textContent = `${restBetweenSets.value - breakTimeElapsed}`;

        }

    }, 1000);
}

// start the timer
function startTimer() {

    // do first rep message


    // each time the start button is pressed

    // hide input labels and boxes
    hideInputs();

    // show timer display elements
    showTimerDisplayElements();

    // show pause and stop buttons, hide start button
    showOnStartButtons();

    // update the time display to show countdown
    updateTimeDisplay();

    // increased reps elapsed
    repsElapsed++;

    // update the reps left display
    updateRepsDisplay();

    // update the sets left display
    updateSetsDisplay();

    // interval timer function
    interval = setInterval(function() {

        // when timer reaches 0
        // if timeElapsed equals rest between reps input
        if (timeElapsed == restBetweenReps.value) {

            // stop the interval timer and reset time elapsed
            stopTimer();

            // if there was one more rep left
            // end of set
            // if reps elapsed + 1 equals the rep total input
            if (repsElapsed + 1 == repTotal.value) {

                // reset reps elapsed
                repsElapsed = 0;

                // increase sets elapsed
                setsElapsed++;

                // update sets left display
                updateSetsDisplay();

                // if there are more sets to do
                if (setsElapsed <= setTotal.value) {

                    // hide start timer button
                    hideStartButton();

                    // show start break button
                    // start break when button is clicked
                    showStartBreakTimerButton();

                } else {

                    // do last reps message


                    // else go back to start screen

                    // reset sets elapsed
                    setsElapsed = 1;

                    // hide timer display elements
                    hideTimerDisplayElements();

                    // show input labels and boxes
                    showInputs();

                    // show complete message
                    showCompleteMessage();

                    // display show me Toby button
                    displayShowMeTobyButton();

                }

            }

        } else {

            // increase time elapsed
            timeElapsed++;

            // update the time display
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
hideStartBreakTimerButton();
hidePauseButton();
hideStopButton();
hideShowMeTobyButton();

// hide timer display elements
hideTimerDisplayElements();

// start button displayed on startup and click event listener added
startTimerButton.addEventListener("click", startTimer);