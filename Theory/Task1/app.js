const express = require("express");

const app = express();

const PORT = 3002;

app.get("/", (req, res) => {
    res.send("Hello from Node.js and Express!");
});

app.get("/about", (req, res) => {
    res.send("This is the About page.");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});