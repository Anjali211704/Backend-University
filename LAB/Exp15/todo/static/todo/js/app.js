
document.addEventListener("DOMContentLoaded", function () {

    // Find the task title input field
    const titleInput = document.querySelector("#title");

    // Automatically focus on the input field
    if (titleInput) {
        titleInput.focus();
    }

    // Confirm that JavaScript loaded successfully
    console.log("Task Tracker JavaScript loaded.");

});
