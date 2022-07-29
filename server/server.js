var express = require("express");
var cors = require('cors');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var app = express();
const port = 8000;


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Configure Express
app.use(express.json(), express.urlencoded({ extended: true }));

const payload = {
    id: user._id
};

// keep track of who is logged in
const userToken = jwt.sign(payload, process.env.SECRET_KEY);

app.use(cookieParser());

res.cookie("mycookie", "mydata", { httpOnly: true }).json({
    message: "This response has a cookie"
});

console.log("server.js: before routes")

require("./routes/product.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );