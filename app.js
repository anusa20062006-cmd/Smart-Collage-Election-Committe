const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "smartcollegeelection",
    resave: false,
    saveUninitialized: false,
  })
);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/admin/login", (req, res) => {
    res.render("adminLogin");
});

app.get("/student/login", (req, res) => {
    res.render("studentLogin");
});

app.get("/candidate/login", (req, res) => {
    res.render("candidateLogin");
});

// ADMIN LOGIN PROCESS
app.post("/admin/login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        req.session.adminLoggedIn = true;
        res.redirect("/admin/dashboard");
    } else {
        res.send("Invalid username or password");
    }
});

// ADMIN DASHBOARD
app.get("/admin/dashboard", (req, res) => {

    if (!req.session.adminLoggedIn) {
        return res.redirect("/admin/login");
    }

    res.render("adminDashboard");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});