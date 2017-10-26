"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// GENERATE ID
function generateRandomString(length) {
  let randomString = "";
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    randomString += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return randomString;
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Create event page
app.get("/create", (req, res) => {
  res.render("create_event");
});

app.post("/create", (req, res) => {
  //store the event information and user information
  if (!req.body.name) {
    res.status(400).send("Please input a name.");
  } else if (!req.body.email) {
    res.status(400).send("Please input an email.");
  } else if (!req.body.event_name) {
    res.status(400).send("Please input an event name.");
  } else if (!req.body.date || !rew.body.time) {
    res.status(400).send("Please input at least one date and time.")
  } else {
    let id = generateRandomString(20);
    // CHECK DATABASE IF ID EXISTS ALREADY
    // IF NOT, ENTER INFO INTO DATABASE
      // id, name, email, event name, location, description, date and time options
    // IF ID ALREADY EXISTS IN DATABASE, GENERATE NEW ID
  res.redirect("/" + id);
  }
});

app.get("/:id", (req, res) => {
  // CHECK DATABASE IF ID EXISTS
  if (!(req.params.id /* IN DATABASE */)) {
    res.status(302).send("Event does not exist.");
  } else {
    // GET EVENT INFO FROM DATABASE
    res.render("view_event");
  }
});

app.post("/:id/delete", (req, res) => {
  delete // ID AND ASSOCIATED INFO FROM DATABASE
  res.redirect("/")
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


































