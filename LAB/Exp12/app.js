const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");

// Tell Express where the views folder is
app.set("views", path.join(__dirname, "views"));

// Serve static files such as CSS
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {

    res.render("index", {
        title: "Backend Development",
        message: "Welcome to my first Express application"
    });

});

// Start server
app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});