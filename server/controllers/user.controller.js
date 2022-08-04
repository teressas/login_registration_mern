const User = require("../models/user.model")
const bcrypt = require('bcrypt');

/* 
- keep track of who is logged in, 
- a structured way to keep data secure and to make sure that data has not been tampered with along the request/response cycle
- 3 parts to a JWT: the header (holds data about the JWT itself), the body (stores the information we want), and the signature (signs the JWT)
*/
const jwt = require("jsonwebtoken");

const { authenticate } = require('../config/jwt.config');

module.exports.index = (req, res) => {
    res.status(200).json({
        status: true,
        title: 'Apis'
    });
};

module.exports.register = async (req, res) => {
    try {
        // check if the user already exists
        user = await User.findOne({ email: req.body.email });
        // console.log(user)
        if (user) {
            return res.status(400).json({ msg: 'Email already exists' });
        } else {
            // create the new user
            User.create(req.body)
                .then(user => {
                    // return jwt
                    const userToken = jwt.sign({
                        id: user._id
                    }, process.env.FIRST_SECRET_KEY);
                    console.log("userToken",userToken);
                    res
                        .cookie("usertoken", userToken, secret, {
                            httpOnly: true
                        })
                        .json({ msg: "success!", user: user });
                    console.log("res",res)
                })
                // send and read cookies with each request/response
                // secure attribute used for https
                .catch(err => res.json(err));

            // await user.save();
        }
    } catch (err) {
        console.error("errmsg",err.message);
        res.status(500).send('Server error');
    }
}

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // user not found in users collection
            return res.status(400).json({ msg: 'Email does not exist' });
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }

        /* contains claims, statements about an entity and add'l data
    more info about JOT: https://www.npmjs.com/package/jsonwebtoken
    */
        // if we made it this far, the password was correct
        const payload = {
            id: user._id
        };

        // if we made it this far, the password was correct 
        const userToken = jwt.sign(payload, process.env.FIRST_SECRET_KEY);
        console.log("userTokenLogin",userToken);
        // const userToken = jwt.sign({
        //     id: user._id
        // }, process.env.FIRST_SECRET_KEY);

        res
            .cookie("usertoken", userToken, process.env.FIRST_SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
        console.log("reslogin",res)
    } catch (err) {
        console.error("loginerr",err.message);
        res.status(500).send('Server error');
    }


}

// Retrieve all users
module.exports.allUsers = (req, res) => {
    User.find()
        .then(allUsers => {
            res.json({ users: allUsers })
            console.log("User res",res)
        })
        .catch(err => res.json({ message: "Something went wrong", error: err }));
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}






