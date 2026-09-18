function saveLocal() {

    const name = document.getElementById("localName").value;

    localStorage.setItem("username", name);

    alert("Name saved in LocalStorage");
}


function showLocal() {

    const name = localStorage.getItem("username");

    document.getElementById("localOutput").innerText =
        "LocalStorage value: " + name;
}


function removeLocal() {

    localStorage.removeItem("username");

    document.getElementById("localOutput").innerText =
        "LocalStorage value removed";
}



// SessionStorage

function saveSession() {

    const name = document.getElementById("sessionName").value;

    sessionStorage.setItem("username", name);

    alert("Name saved in SessionStorage");
}


function showSession() {

    const name = sessionStorage.getItem("username");

    document.getElementById("sessionOutput").innerText =
        "SessionStorage value: " + name;
}


function removeSession() {

    sessionStorage.removeItem("username");

    document.getElementById("sessionOutput").innerText =
        "SessionStorage value removed";
}



// JSON Example

function showJSON() {

    const student = {
        name: "Anjali",
        branch: "CSE",
        semester: 5
    };


    const jsonData = JSON.stringify(student);

    const normalObject = JSON.parse(jsonData);


    document.getElementById("jsonOutput").innerText =
        "JSON Data: " + jsonData +
        "\nStudent Name: " + normalObject.name;
}