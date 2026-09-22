const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Note = require("./models/Note");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Read HTML form data
app.use(express.urlencoded({ extended: true }));

// Serve CSS and other static files
app.use(express.static(path.join(__dirname, "public")));

// Redirect the home page to the notes page
app.get("/", (req, res) => {
    res.redirect("/notes");
});

// Display all notes
app.get("/notes", async (req, res, next) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });

        res.render("index", {
            notes: notes
        });
    } catch (error) {
        next(error);
    }
});

// Display the add-note form
app.get("/notes/new", (req, res) => {
    res.render("new", {
        error: null,
        formData: {
            title: "",
            content: "",
            category: ""
        }
    });
});

// Add a new note
app.post("/notes", async (req, res, next) => {
    try {
        const title = String(req.body.title || "").trim();
        const content = String(req.body.content || "").trim();
        const category =
            String(req.body.category || "").trim() || "General";

        // Server-side validation
        if (!title || !content) {
            return res.status(400).render("new", {
                error: "Title and content are required.",
                formData: {
                    title,
                    content,
                    category
                }
            });
        }

        await Note.create({
            title,
            content,
            category
        });

        res.redirect("/notes");
    } catch (error) {
        next(error);
    }
});

// Display the edit form
app.get("/notes/:id/edit", async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Note not found.");
        }

        res.render("edit", {
            note: note,
            error: null
        });
    } catch (error) {
        next(error);
    }
});

// Update an existing note
app.post("/notes/:id/edit", async (req, res, next) => {
    try {
        const title = String(req.body.title || "").trim();
        const content = String(req.body.content || "").trim();
        const category =
            String(req.body.category || "").trim() || "General";

        if (!title || !content) {
            return res.status(400).render("edit", {
                error: "Title and content are required.",
                note: {
                    _id: req.params.id,
                    title,
                    content,
                    category
                }
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                category
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).send("Note not found.");
        }

        res.redirect("/notes");
    } catch (error) {
        next(error);
    }
});

// Delete a note
app.post("/notes/:id/delete", async (req, res, next) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).send("Note not found.");
        }

        res.redirect("/notes");
    } catch (error) {
        next(error);
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("Page not found.");
});

// Central error-handling middleware
app.use((error, req, res, next) => {
    console.error(error);

    if (error.name === "CastError") {
        return res.status(400).send("Invalid note ID.");
    }

    res.status(500).send(
        "Something went wrong while processing your request."
    );
});

// Connect to MongoDB Atlas before starting the server
async function startServer() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from the .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "notes_lab"
    });

    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start the application:", error.message);
    process.exit(1);
});