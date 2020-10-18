// plus and minus functions for inputs

// minus 1 rep from the rep input
function minusReps() {
    if (repTotal.val() > 1) {
        repTotal.val(repTotal.val() - 1);
    }
}

// add 1 rep to the rep input
function plusReps() {
    if (repTotal.val() === "") {
        repTotal.val(0)
    }
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
    if (restBetweenReps.val() === "") {
        restBetweenReps.val(0)
    }
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
    if (setTotal.val() === "") {
        setTotal.val(0)
    }
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
    if (restBetweenSets.val() === "") {
        restBetweenSets.val(0)
    }
    restBetweenSets.val(parseInt(restBetweenSets.val()) + 1);
}

$("#minus-reps").on("click", minusReps);
$("#plus-reps").on("click", plusReps);
$("#minus-rest").on("click", minusRest);
$("#plus-rest").on("click", plusRest);
$("#minus-sets").on("click", minusSets);
$("#plus-sets").on("click", plusSets);
$("#minus-break").on("click", minusBreak);
$("#plus-break").on("click", plusBreak);