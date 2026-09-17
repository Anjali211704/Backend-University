const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const PORT = 3001;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
    session({
        secret: "backend-university-secret",
        resave: false,
        saveUninitialized: false
    })
);


// Login page
app.get("/", (req, res) => {

    if (req.session.username) {
        return res.redirect("/home");
    }

    res.render("login");
});


// Login form
app.post("/login", (req, res) => {

    const username = req.body.username;

    req.session.username = username;

    res.cookie("user", username);

    res.redirect("/home");
});


// Home page
app.get("/home", (req, res) => {

    if (!req.session.username) {
        return res.redirect("/");
    }

    res.render("home", {
        username: req.session.username
    });
});


// Logout
app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.clearCookie("user");

        res.redirect("/");

    });

});


app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});