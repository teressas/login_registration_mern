// Import Dependencies
var express = require("express");
var cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

var app = express();
dotenv.config();
const port = process.env.PORT || 8000;

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


const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

// initialize library
const io = require('socket.io')(server, {
    pingTimeout: 6000, // wait 60 secs to see if user sends msg until it closes the connection to save bandwidth
    cors: {
        origin: "http://localhost:3000"
    },
});

// first argument of the method is the event name and the second is a callback which gives us an instance of the socket that is connected.
io.on("connection", (socket) => {
    console.log("connected to socket.io");
});