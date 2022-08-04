const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.FIRST_SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({
                verified: false,
                errorMessage: 'User unauthorized!',
            });
        } else {
            next();
        }
    });
}

/*
The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature and/or encrypted using JSON Web Encryption.
*/

