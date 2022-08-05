const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    // console.log("server/routes");
    // app.get("/", authenticate, U+serController.index);
    app.post("/register", UserController.register);
    app.post("/login", UserController.login);
    // this route now has to be authenticated
    app.get("/users", authenticate, UserController.allUsers);
    app.get("/logout", authenticate, UserController.logout);

}