const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 3004;

app.use(cookieParser());

app.use(
    session({
        secret: "backend-university-secret",
        resave: false,
        saveUninitialized: true
    })
);


// Home route
app.get("/", (req, res) => {

    res.send(`
        <h1>Task 4</h1>

        <p>Sessions, Cookies and Query Strings</p>

        <p>
            Try:
            <a href="/query?name=Anjali">
                Query String Example
            </a>
        </p>

        <p>
            <a href="/set-cookie">
                Set Cookie
            </a>
        </p>

        <p>
            <a href="/get-cookie">
                Read Cookie
            </a>
        </p>

        <p>
            <a href="/session">
                Session Example
            </a>
        </p>
    `);

});


// Query String
app.get("/query", (req, res) => {

    const name = req.query.name || "Guest";

    res.send(`Hello ${name}`);
});


// Set Cookie
app.get("/set-cookie", (req, res) => {

    res.cookie("username", "Anjali");

    res.send("Cookie has been created.");
});


// Read Cookie
app.get("/get-cookie", (req, res) => {

    const username = req.cookies.username;

    res.send(`Cookie value: ${username || "No cookie found"}`);
});


// Session
app.get("/session", (req, res) => {

    if (!req.session.visits) {
        req.session.visits = 1;
    } else {
        req.session.visits++;
    }

    res.send(
        `You have visited this page ${req.session.visits} time(s).`
    );
});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});