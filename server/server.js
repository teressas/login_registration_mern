// Import Dependencies
const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/jwt.config");

// pulls environment vars
require('dotenv').config();
const myFirstSecret = process.env.FIRST_SECRET_KEY;

app.use(cookieParser());

// use cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


// Configure Express
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes
// This is where we import the users routes function from our user.routes.js file
// SERVER RUNS ALL ROUTES BEFORE CALLING ROUTES
console.log("server.js: before routes")
// ADD THIS BEFORE ADDING ROUTES!!!
// require("./routes/product.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`));

// var express = require("express");
// var app = express();
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// var cors = require('cors');
// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/productDB");
// var fs = require('fs');
// var user = require("./model/user.js");

// app.use(cors());

// var express = require("express");
// var cors = require('cors');
// var jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

// var app = express();
// const port = 8000;


// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// // Configure Express
// app.use(express.json(), express.urlencoded({ extended: true }));

// const payload = {
//     id: user._id
// };

// // keep track of who is logged in
// const userToken = jwt.sign(payload, process.env.SECRET_KEY);

// app.use(cookieParser());

// res.cookie("mycookie", "mydata", { httpOnly: true }).json({
//     message: "This response has a cookie"
// });

// console.log("server.js: before routes")

// require("./routes/product.routes")(app);

// app.listen(port, () => console.log(`Listening on port: ${port}`) );

