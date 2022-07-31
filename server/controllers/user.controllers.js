const User = require("../models/user.model")
const { authenticate } = require('../config/jwt.config');

register: (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
}

login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

const payload = {
    id: user._id
};

// notice that we're using the SECRET_KEY from our .env file
const userToken = jwt.sign(payload, process.env.SECRET_KEY);

// send and read cookies with each request/response
res.cookie("mycookie", "mydata", { httpOnly: true }).json({
    message: "This response has a cookie"
});


module.exports = app => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    // this route now has to be authenticated
    app.get("/api/users", authenticate, Users.getAll);
}