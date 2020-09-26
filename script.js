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
var startTimerButton = $("#startTimer");
var startBreakTimerButton = $("#startBreakTimer");
var pauseTimerButton = $("#pauseTimer");
var resumeTimerButton = $("#resumeTimer");
var stopTimerButton = $("#stopTimer");
var fullScreenButton = $("#full-screen");
var closeFullScreenButton = $("#close-full-screen");

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

// plus and minus functions for inputs

// minus 1 rep from the rep input
function minusReps() {
    if (repTotal.val() > 1) {
        repTotal.val(repTotal.val() - 1);
    }
}

// add 1 rep to the rep input
function plusReps() {
    repTotal.val(parseInt(repTotal.val()) + 1);
}

// minus 1 second from the rest input
function minusRest() {
    if (restBetweenReps.val() > 1) {
        restBetweenReps.val(restBetweenReps.val() - 1);
    }
}

// add 1 second to the rest input
function plusRest() {
    restBetweenReps.val(parseInt(restBetweenReps.val()) + 1);
}

// minus 1 set from the set input
function minusSets() {
    if (setTotal.val() > 1) {
        setTotal.val(setTotal.val() - 1);
    }
}

// add 1 set to the set input
function plusSets() {
    setTotal.val(parseInt(setTotal.val()) + 1);
}

// minus 1 second from the break input
function minusBreak() {
    if (restBetweenSets.val() > 1) {
        restBetweenSets.val(restBetweenSets.val() - 1);
    }
}

// add 1 second to the break input
function plusBreak() {
    restBetweenSets.val(parseInt(restBetweenSets.val()) + 1);
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

    // clears the interval
    clearInterval(interval);
    clearInterval(breakInterval);

    // resets the time elapsed
    timeElapsed = 0;
    breakTimeElapsed = 0;

    // displays the start button
    startTimerButton.show();

    // hides the pause and stop button
    pauseTimerButton.hide();
    stopTimerButton.hide();

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
    stopTimerButton.hide();

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
    stopTimerButton.show();

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

    // show inputs
    inputs.show();

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

// show me Toby function
function showMeToby() {
    $("#exampleModalLabel").text("You're Amazing Mama!");
    $("#toby-image").show();
    $("#modal-form").hide();
    $('#exampleModal').modal('show');
}

// // show sleeping Toby
// function showSleepingToby() {

//     // show the sleeping toby modal
//     $('#sleepingModal').modal('show');
// }

// show the buttons on start of application
function showOnStartButtons() {

    // hide start button
    startTimerButton.hide();
    startBreakTimerButton.hide();

    // show pause and stop buttons
    pauseTimerButton.show();
    stopTimerButton.show();
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

                    setsElapsed = 0;
                    repsElapsed = 0;
                    hideTimerDisplayElements();
                    inputs.show();
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
            stopTimerButton.hide();

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
    stopTimerButton.show();

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

    // check if first rep
    if (firstRep) {

        // if first rep 
        inputs.hide();
        showTimerDisplayElements();
        saveLastInputs();
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

    if (timeDisplay.text() === "3") {
        mySound.play();
    }

    // start the rest interval
    startRestInterval();

}

// Full screen functions and variables
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    fullScreenButton.hide();
    closeFullScreenButton.show();
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    closeFullScreenButton.hide();
    fullScreenButton.show();
}

function showSaveModal() {
    $("#exampleModalLabel").text("Save");
    $("#toby-image").hide();
    $("#modal-form").show();
    $('#exampleModal').modal('show');
    $("#modal-save-button").on("click", saveInputs);
}

function saveInputs(event) {
    event.preventDefault();
    var saveName = $("#modal-save-input").val();
    var saveObject = {
        reps: repTotal.val(),
        rest: restBetweenReps.val(),
        sets: setTotal.val(),
        break: restBetweenSets.val()
    }
    localStorage.setItem(saveName, JSON.stringify(saveObject));
}

function saveLastInputs() {
    var saveObject = {
        reps: repTotal.val(),
        rest: restBetweenReps.val(),
        sets: setTotal.val(),
        break: restBetweenSets.val()
    }
    localStorage.setItem("lastInputs", JSON.stringify(saveObject));
}

function loadLastInputs() {
    var saveObject = JSON.parse(localStorage.getItem("lastInputs"));
    repTotal.val(saveObject.reps);
    restBetweenReps.val(saveObject.rest);
    setTotal.val(saveObject.sets);
    restBetweenSets.val(saveObject.break);
}

function setInputs() {
    if (localStorage.length === 0) {
        repTotal.val(0);
        restBetweenReps.val(0);
        setTotal.val(0);
        restBetweenSets.val(0);
    } else {
        loadLastInputs();
    }
}

// show inputs
inputs.show();

$("#minus-reps").on("click", minusReps);
$("#plus-reps").on("click", plusReps);
$("#minus-rest").on("click", minusRest);
$("#plus-rest").on("click", plusRest);
$("#minus-sets").on("click", minusSets);
$("#plus-sets").on("click", plusSets);
$("#minus-break").on("click", minusBreak);
$("#plus-break").on("click", plusBreak);
pauseTimerButton.on("click", pauseTimer);
resumeTimerButton.on("click", resumeTimer);
stopTimerButton.on("click", stopTimerButtonClicked);
startTimerButton.on("click", checkInputs);
startBreakTimerButton.on("click", startBreakTimer);
fullScreenButton.on("click", openFullscreen);
closeFullScreenButton.on("click", closeFullscreen);
saveButton.on("click", showSaveModal);

// on page load hide time, reps and sets displays
// hide pause, stop and showToby buttons
startBreakTimerButton.hide();
pauseTimerButton.hide();
resumeTimerButton.hide();
stopTimerButton.hide();
closeFullScreenButton.hide();

// hide timer display elements
hideTimerDisplayElements();

// start button displayed on startup and click event listener added
startTimerButton.show();
fullScreenButton.show();

// screen wakelock request
// stop screen from sleeping
const requestWakeLock = async() => {
    try {

        const wakeLock = await navigator.wakeLock.request('screen');

    } catch (err) {
        // the wake lock request fails - usually system related, such low as battery

        alert(`${err.name}, ${err.message}`);
    }
}

requestWakeLock();

setInputs();