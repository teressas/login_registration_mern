// Import Dependencies
var express = require("express");
var cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cookieParser = require('cookie-parser');

var app = express();
const port = 8000;

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");

// var fs = require('fs');
var User = require("./models/user.model.js");

// app has the abilities to send and read cookies with each request/response.
app.use(cookieParser());

// have cors request the use of credentials
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Configure Express
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes
// This is where we import the users routes function from our user.routes.js file
// SERVER RUNS ALL ROUTES BEFORE CALLING ROUTES
console.log("server.js: before routes")
// ADD THIS BEFORE ADDING ROUTES!!!
require("./routes/user.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`));
