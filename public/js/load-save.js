function updateLoadButton(event) {
    event.preventDefault();
    $("#load-modal-button").attr("value", this.value);
}

function showLocalStorageList() {
    if (localStorage.length === 0 ||
        localStorage.getItem("lastInputs") != null && localStorage.length === 1) {
        $("#load-form").append(`<p>There are no saved presets</p>`);
    } else {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);
            if (key != "lastInputs") {
                $("#load-form").prepend(
                    `<input type="radio" class="load-radio" id="${key}" name="save" value="${key}">` +
                    `<label for="${key}" class="load-radio-label">${key}</label><br>`
                );
            }
        }
        $(".load-radio").change(updateLoadButton);
    }
}

function showLoadModal() {
    $("#load-form input").remove();
    $("#load-form label").remove();
    $("#load-form br").remove();
    $("#load-form p").remove();
    showLocalStorageList();
    $('#load-modal').modal('show');
}

function loadInputs(event) {
    event.preventDefault();
    var loadObject = JSON.parse(localStorage.getItem(event.target.value));
    repTotal.val(loadObject.reps);
    restBetweenReps.val(loadObject.rest);
    setTotal.val(loadObject.sets);
    restBetweenSets.val(loadObject.break);
}

function showSaveModal() {
    $('#save-modal').modal('show');
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
    if (saveObject != null) {
        repTotal.val(saveObject.reps);
        restBetweenReps.val(saveObject.rest);
        setTotal.val(saveObject.sets);
        restBetweenSets.val(saveObject.break);
    }
}

$("#load-modal-button").on("click", loadInputs);
$("#modal-save-button").on("click", saveInputs);

saveButton.on("click", showSaveModal);
loadButton.on("click", showLoadModal);

loadLastInputs();