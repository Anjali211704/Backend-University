function getNotes() {

    const raw = localStorage.getItem("notes");

    return raw ? JSON.parse(raw) : [];
}


function saveNotes(notes) {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


function addNote() {

    const input = document.getElementById("noteInput");

    const text = input.value.trim();

    if (text === "") {

        alert("Please enter a note");

        return;
    }

    const notes = getNotes();

    const newNote = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt: new Date().toISOString(),

        updatedAt: null

    };

    notes.push(newNote);

    saveNotes(notes);

    input.value = "";

    renderNotes();
}


function deleteNote(id) {

    let notes = getNotes();

    notes = notes.filter(function(note) {

        return note.id !== id;

    });

    saveNotes(notes);

    renderNotes();
}


function editNote(id) {

    const notes = getNotes();

    const note = notes.find(function(note) {

        return note.id === id;

    });

    if (!note) {
        return;
    }

    const newText = prompt(
        "Edit your note:",
        note.text
    );

    if (newText === null) {
        return;
    }

    if (newText.trim() === "") {

        alert("Note cannot be empty");

        return;
    }

    note.text = newText.trim();

    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}


function renderNotes() {

    const container = document.getElementById("notesList");

    const notes = getNotes();

    container.innerHTML = "";

    if (notes.length === 0) {

        container.innerHTML = "<p>No notes available.</p>";

        return;
    }

    notes.forEach(function(note) {

        const noteCard = document.createElement("div");

        noteCard.className = "note-card";

        noteCard.innerHTML = `

            <p>${note.text}</p>

            <small>
                Created:
                ${new Date(note.createdAt).toLocaleString()}
            </small>

            ${
                note.updatedAt
                    ? `<small>
                        Updated:
                        ${new Date(note.updatedAt).toLocaleString()}
                       </small>`
                    : ""
            }

            <div class="note-buttons">

                <button onclick="editNote(${note.id})">
                    Edit
                </button>

                <button onclick="deleteNote(${note.id})">
                    Delete
                </button>

            </div>

        `;

        container.appendChild(noteCard);

    });
}


document
    .getElementById("addBtn")
    .addEventListener("click", addNote);


window.onload = renderNotes;
function renderNotes() {

    const container = document.getElementById("notesList");

    const notes = getNotes();

    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = "<p>No notes available.</p>";
        return;
    }

    notes.forEach(function(note) {

        const noteCard = document.createElement("div");

        noteCard.className = "note-card";

        noteCard.innerHTML = `
            <p>${note.text}</p>

            <small>
    Created: ${new Date(note.createdAt).toLocaleString()}
</small>

${
    note.updatedAt
        ? `<small>
            Updated: ${new Date(note.updatedAt).toLocaleString()}
           </small>`
        : ""
}

            <div class="note-buttons">
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;

        container.appendChild(noteCard);
    });
}
window.onload = renderNotes;
function deleteNote(id) {

    let notes = getNotes();

    notes = notes.filter(function(note) {
        return note.id !== id;
    });

    saveNotes(notes);

    renderNotes();
}
function editNote(id) {

    const notes = getNotes();

    const note = notes.find(function(note) {
        return note.id === id;
    });

    if (!note) {
        return;
    }

    const newText = prompt("Edit your note:", note.text);

    if (newText === null) {
        return;
    }

    if (newText.trim() === "") {
        alert("Note cannot be empty");
        return;
    }

    note.text = newText.trim();

    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}