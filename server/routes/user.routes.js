const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    // console.log("server/routes");
    app.get("/", UserController.index);
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    // this route now has to be authenticated
    app.get("/dashboard", authenticate, UserController.allUsers);
}