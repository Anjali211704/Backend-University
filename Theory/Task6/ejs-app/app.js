const express = require("express");

const app = express();

const PORT = 3006;

app.set("view engine", "ejs");


app.get("/", (req, res) => {

    const student = {
        name: "Anjali",
        branch: "CSE",
        semester: 5
    };

    res.render("index", {
        title: "EJS Server-Side Rendering",
        student: student
    });

});


app.listen(PORT, () => {

    console.log(
        `EJS server running at http://localhost:${PORT}`
    );

});