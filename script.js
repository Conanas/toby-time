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

// toast
var toast = $(".toast");
var toastBody = $(".toast-body");

// timer settings
var interval;
var breakInterval;
var timeElapsed = 0;
var breakTimeElapsed = 0;
var repsElapsed = 0;
var setsElapsed = 0;
var restMode;
var breakMode = false;
var firstRep = true;
var inputsValid = false;

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
    stopTimerButton.addEventListener("click", stopTimerButtonClicked);
}

// display start button and add click event listener
function displayStartButton() {
    startTimerButton.setAttribute("style", "display: inline block;");
    startTimerButton.addEventListener("click", checkInputs);
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

// hide start button
function hideStartButton() {
    startTimerButton.setAttribute("style", "display: none;");
}

// hide start break button
function hideStartBreakTimerButton() {
    startBreakTimerButton.setAttribute("style", "display: none;");
}

// update time display for rest and break time
function updateTimeDisplay() {
    if (breakMode) {
        timeDisplay.textContent = `${restBetweenSets.value - breakTimeElapsed}`;
    } else {
        timeDisplay.textContent = `${restBetweenReps.value - timeElapsed}`;
    }
}

// stops the interval timer and goes back to input screen
function stopTimer() {

    // clears the interval
    clearInterval(interval);
    clearInterval(breakInterval);

    // resets the time elapsed
    timeElapsed = 0;
    breakTimeElapsed = 0;

    // displays the start button
    displayStartButton();

    // hides the pause and stop button
    hidePauseButton();
    hideStopButton();

}

// stop timer button was pressed
function stopTimerButtonClicked() {

    // stop the timer
    stopTimer();

    // check if breakMode
    if (breakMode) {
        breakMode = false;
        document.querySelector("body").setAttribute("style", "background-color: darkturquoise;");
    }

    // hide timer display elements
    hideTimerDisplayElements();

    // show inputs
    showInputs();

    // reset reps and sets
    repsElapsed = 0;
    setsElapsed = 0;
    firstRep = true;
    inputsValid = false;

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

    // show the Toby modal
    $('#exampleModal').modal('show');
}

// show the buttons on start of application
function showOnStartButtons() {

    // hide start button
    hideStartButton();
    hideStartBreakTimerButton();

    // show pause and stop buttons
    displayPauseButton();
    displayStopButton();
}

// check inputs for validity
function checkInputs() {

    // check if inputs are valid
    if (inputsValid === false) {

        // check reps
        if (repTotal.value === "" || repTotal.value == 0) {

            // if no reps then go back to start and alert
            toastBody.text("Please enter reps")
            toast.toast('show');
        } else

        // check rest time
        if (restBetweenReps.value === "" || restBetweenReps.value == 0) {

            // if no rest then go back to start and alert
            toastBody.text("Please enter rest time")
            toast.toast('show');

        } else

        // check sets
        if (setTotal.value === "" || setTotal.value == 0) {

            // if no sets then assume 1 set
            toastBody.text("Please enter sets")
            toast.toast('show');

        } else

        // check break time
        if (restBetweenSets.value === "" || restBetweenSets.value == 0) {

            // if there is more than 1 set then there needs to be a break
            // if no break then go back to start and alert
            toastBody.text("Please enter break time")
            toast.toast('show');

        } else {

            // start timer if inputs are valid
            inputsValid = true;
            startTimer();
        }

    } else {

        startTimer();

    }

}

// start break timer
function startBreakTimer() {

    // at start of break timer
    breakMode = true;
    document.querySelector("body").setAttribute("style", "background-color: indianred;");
    updateTimeDisplay();

    // show pause and stop buttons
    hideStartBreakTimerButton();
    displayPauseButton();
    displayStopButton();

    // start break interval timer
    breakInterval = setInterval(function() {

        // check if break has finished
        if (breakTimeElapsed == restBetweenSets.value) {

            // when break timer finishes
            breakMode = false;
            document.querySelector("body").setAttribute("style", "background-color: darkturquoise;");
            clearInterval(breakInterval);
            breakTimeElapsed = 0;
            setsElapsed++;
            updateSetsDisplay();
            hideStartBreakTimerButton();
            repsElapsed = 0;
            updateRepsDisplay();
            displayStartButton();
            hidePauseButton();
            hideStopButton();

        } else {

            // break timer has not finished
            breakTimeElapsed++;
            timeDisplay.textContent = `${restBetweenSets.value - breakTimeElapsed}`;

        }

    }, 1000);
}

// start the timer
function startTimer() {

    // check if first rep
    if (firstRep) {

        // if first rep 
        hideInputs();
        showTimerDisplayElements();
        firstRep = false;
        setsElapsed++;

    }

    // on start of rest timer

    // do first rep message

    // each time the start button is pressed
    showOnStartButtons();
    updateTimeDisplay();
    repsElapsed++;
    updateRepsDisplay();
    updateSetsDisplay();

    // start rest timer
    interval = setInterval(function() {

        // check if rep timer has finished
        if (timeElapsed == restBetweenReps.value) {

            // when rep timer has finished
            stopTimer();

            // check if this is the end of set/end of reps
            if (repsElapsed + 1 == repTotal.value) {

                // on last rep
                repsElapsed++;

                // check if there are more sets to do
                if (setsElapsed < setTotal.value) {

                    // if more sets to do
                    hideStartButton();
                    showStartBreakTimerButton();
                    updateRepsDisplay();

                } else {

                    // no more sets to do
                    // do last reps message


                    // else go back to start screen

                    setsElapsed = 0;
                    repsElapsed = 0;
                    hideTimerDisplayElements();
                    showInputs();
                    showMeToby();
                    inputsValid = false;
                    firstRep = true;

                }

            }

        } else {

            // if rep timer has not finished
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
hideStartBreakTimerButton();
hidePauseButton();
hideStopButton();

// hide timer display elements
hideTimerDisplayElements();

// start button displayed on startup and click event listener added
startTimerButton.addEventListener("click", checkInputs);