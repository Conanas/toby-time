// labels for reps, sets and totals
var inputs = $(".inputs");

// reps, sets and rests inputs
var repTotal = $("#repTotal");
var restBetweenReps = $("#restBetweenReps");
var setTotal = $("#setTotal");
var restBetweenSets = $("#restBetweenSets");

// reps, sets and timer display
var repsDisplay = $("#repsDisplay");
var repsDisplaySpan = $("#repsDisplaySpan");
var setsDisplay = $("#setsDisplay");
var setsDisplaySpan = $("#setsDisplaySpan");
var timeDisplay = $("#timeDisplay");
var timerSection = $("#timerSection");

// buttons
var saveButton = $("#save-button");
var loadButton = $("#load-button");
var startTimerButton = $("#startTimer");
var startBreakTimerButton = $("#startBreakTimer");
var pauseTimerButton = $("#pauseTimer");
var resumeTimerButton = $("#resumeTimer");
var stopTimerButton = $("#stopTimer");
var fullScreenButton = $("#full-screen");
var closeFullScreenButton = $("#close-full-screen");
var nextRepButton = $("#next-rep-button");
var nextSetButton = $("#next-set-button");
var prevRepButton = $("#prev-rep-button");
var prevSetButton = $("#prev-set-button");

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

// sounds variables
var mySound = new sound("./assets/sounds/start-beeps.wav");

// sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

// hide timer display elements
function hideTimerDisplayElements() {
    repsDisplay.hide();
    setsDisplay.hide();
    timeDisplay.hide();
}

// show timer display elements
function showTimerDisplayElements() {
    repsDisplay.show();
    setsDisplay.show();
    timeDisplay.show();
}

// update time display for rest and break time
function updateTimeDisplay() {
    if (breakMode) {
        timeDisplay.text(`${restBetweenSets.val() - breakTimeElapsed}`);
    } else {
        timeDisplay.text(`${restBetweenReps.val() - timeElapsed}`);
    }
}

// stops the interval timer and goes back to input screen
function stopTimer() {

    clearInterval(interval);
    clearInterval(breakInterval);

    timeElapsed = 0;
    breakTimeElapsed = 0;

    startTimerButton.show();
    pauseTimerButton.hide();
}

// pause the timer
function pauseTimer() {
    // stop the timers
    // check breakMode
    if (breakMode) {
        clearInterval(breakInterval);
    } else {
        clearInterval(interval);
    }
    resumeTimerButton.show();
    pauseTimerButton.hide();
}

// resume the timer
function resumeTimer() {
    if (breakMode) {
        startBreakInterval();
    } else {
        startRestInterval();
    }
    resumeTimerButton.hide();
    pauseTimerButton.show();
}

// stop timer button was pressed
function stopTimerButtonClicked() {
    // stop the timer
    stopTimer();
    // check if breakMode
    if (breakMode) {
        breakMode = false;
        $("body").css("background-color", "var(--body-background-rest)");
    }
    // hide timer display elements
    hideTimerDisplayElements();
    stopTimerButton.hide();
    resumeTimerButton.hide();
    startBreakTimerButton.hide();
    // show inputs
    inputs.show();
    // hide next, prev, rep, set buttons
    nextRepButton.hide();
    nextSetButton.hide();
    prevRepButton.hide();
    prevSetButton.hide();
    // reset reps and sets
    repsElapsed = 0;
    setsElapsed = 0;
    firstRep = true;
    inputsValid = false;
}

// updates the reps left display
function updateRepsDisplay() {
    // if the reps elapsed is greater than or equal to the rep total input
    if (repsElapsed >= repTotal.val()) {
        // reset the reps and display reps remaining to 0
        repsElapsed = 0;
        repsDisplaySpan.text(0);
    } else {
        // update the reps to display the rep total input - reps elapsed
        repsDisplaySpan.text(`${repTotal.val() - repsElapsed}`);
    }
}

// updates the sets left display
function updateSetsDisplay() {
    setsDisplaySpan.text(`${setTotal.val() - setsElapsed}`);
}

// next, prev, rep, set functions
function nextRep() {
    stopTimer();
    if (repsElapsed != repTotal.val() - 1) {
        repsElapsed += 1;
        updateRepsDisplay();
    }
}

function nextSet() {
    stopTimer();
    if (setsElapsed != setTotal.val()) {
        setsElapsed += 1;
        updateSetsDisplay();
    }
}

function prevRep() {
    stopTimer();
    if (repsElapsed > 0) {
        repsElapsed -= 1;
        updateRepsDisplay();
    }
}

function prevSet() {
    stopTimer();
    if (setsElapsed > 0) {
        setsElapsed -= 1;
        updateSetsDisplay();
    }
}

// check inputs for validity
function checkInputs() {
    // check if inputs are valid
    if (inputsValid === false) {
        // check reps
        if (repTotal.val() === "" || repTotal.val() == 0) {
            // if no reps then go back to start and alert
            toastBody.text("Please enter reps")
            toast.toast('show');
        } else
        // check rest time
        if (restBetweenReps.val() === "" || restBetweenReps.val() == 0) {
            // if no rest then go back to start and alert
            toastBody.text("Please enter rest time")
            toast.toast('show');
        } else
        // check sets
        if (setTotal.val() === "" || setTotal.val() == 0) {
            // if no sets then assume 1 set
            toastBody.text("Please enter sets")
            toast.toast('show');
        } else
        // check break time
        if (restBetweenSets.val() === "" || restBetweenSets.val() == 0) {
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

function checkToPlaySound() {
    if (breakMode) {
        if (breakTimeElapsed == restBetweenSets.val() - 4) {
            mySound.play();
        }
    } else {
        if (timeElapsed == restBetweenReps.val() - 4) {
            mySound.play();
        }
    }
}

// rest interval function
function startRestInterval() {
    // start rest timer
    interval = setInterval(function() {
        // check if 3 seconds left for sounds
        checkToPlaySound();
        // check if rep timer has finished
        if (timeElapsed == restBetweenReps.val()) {
            // when rep timer has finished
            stopTimer();
            // check if this is the end of set/end of reps
            if (repsElapsed + 1 == repTotal.val()) {
                // on last rep
                repsElapsed++;
                // check if there are more sets to do
                if (setsElapsed < setTotal.val()) {
                    // if more sets to do
                    startTimerButton.hide();
                    startBreakTimerButton.show();
                    updateRepsDisplay();
                } else {
                    // no more sets to do
                    // do last reps message


                    // else go back to start screen
                    nextRepButton.hide();
                    nextSetButton.hide();
                    prevRepButton.hide();
                    prevSetButton.hide();
                    setsElapsed = 0;
                    repsElapsed = 0;
                    hideTimerDisplayElements();
                    inputs.show();
                    $('#finish-workout-modal').modal('show');
                    stopTimerButton.hide();
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

// break interval function
function startBreakInterval() {
    // start break interval timer
    breakInterval = setInterval(function() {
        // check if 3 seconds left for sounds
        checkToPlaySound();
        // check if break has finished
        if (breakTimeElapsed == restBetweenSets.val()) {
            // when break timer finishes
            breakMode = false;
            $("body").css("background-color", "var(--body-background-rest)");
            clearInterval(breakInterval);
            breakTimeElapsed = 0;
            setsElapsed++;
            updateSetsDisplay();
            startBreakTimerButton.hide();
            repsElapsed = 0;
            updateRepsDisplay();
            startTimerButton.show();
            pauseTimerButton.hide();
        } else {
            // break timer has not finished
            breakTimeElapsed++;
            timeDisplay.text(`${restBetweenSets.val() - breakTimeElapsed}`);
        }
    }, 1000);
}

// start break timer
function startBreakTimer() {
    // at start of break timer
    breakMode = true;
    $("body").css("background-color", "var(--body-background-break)");
    updateTimeDisplay();
    // show pause and stop buttons
    startBreakTimerButton.hide();
    pauseTimerButton.show();
    // show sleeping toby modal
    // showSleepingToby();
    if (timeDisplay.text() === "3") {
        mySound.play();
    }
    // start break interval
    startBreakInterval();
}

// start the timer
function startTimer() {

    nextRepButton.show();
    nextSetButton.show();
    prevRepButton.show();
    prevSetButton.show();

    // check if first rep
    if (firstRep) {
        // if first rep 
        inputs.hide();
        stopTimerButton.show();
        showTimerDisplayElements();
        saveLastInputs();
        firstRep = false;
        setsElapsed++;
    }

    // on start of rest timer

    // do first rep message

    // each time the start button is pressed
    // hide start button
    startTimerButton.hide();
    startBreakTimerButton.hide();

    // show pause and stop buttons
    pauseTimerButton.show();
    updateTimeDisplay();
    repsElapsed++;
    updateRepsDisplay();
    updateSetsDisplay();

    if (timeDisplay.text() === "3") {
        mySound.play();
    }

    // start the rest interval
    startRestInterval();
}

// show inputs
inputs.show();

pauseTimerButton.on("click", pauseTimer);
resumeTimerButton.on("click", resumeTimer);
stopTimerButton.on("click", stopTimerButtonClicked);
startTimerButton.on("click", checkInputs);
startBreakTimerButton.on("click", startBreakTimer);

// next, prev, rep, set button click event listeners
nextRepButton.on("click", nextRep);
nextSetButton.on("click", nextSet);
prevRepButton.on("click", prevRep);
prevSetButton.on("click", prevSet);

// on page load hide time, reps and sets displays
// hide pause, stop and showToby buttons
startBreakTimerButton.hide();
pauseTimerButton.hide();
resumeTimerButton.hide();
stopTimerButton.hide();
closeFullScreenButton.hide();

// next, prev, rep, set button hides
nextRepButton.hide();
nextSetButton.hide();
prevRepButton.hide();
prevSetButton.hide();

// hide timer display elements
hideTimerDisplayElements();

// start button displayed on startup and click event listener added
startTimerButton.show();
fullScreenButton.show();