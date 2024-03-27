// const jwt = require("jsonwebtoken");
// const { Jwt_secret } = require("../Keys");
// const mongoose = require("mongoose");
// const USER = mongoose.model("USER");

// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).send({ error: "You must be logged in" });
//     }
//     const token = authorization.replace("Bearer ", "");
//     jwt.verify(token, Jwt_secret, (err, payload) => {
//         if (err) {
//             console.error("Error verifying token:", err);
//             return res.status(401).json({ error: "Invalid token" });
//         }
//         const { _id } = payload;
//         USER.findById(_id)
//             .then(userData => {
//                 if (!userData) {
//                     return res.status(404).json({ error: "User not found" });
//                 }
//                 req.user = userData;
//                 next();
//             })
//             .catch(err => {
//                 console.error("Error finding user by ID:", err);
//                 res.status(500).json({ error: "Internal Server Error" });
//             });
//     });
// };


const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../Keys");
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, Jwt_secret, (err, payload) => {
        if (err) {
            console.error("Error verifying token:", err);
            return res.status(401).json({ error: "Invalid token" });
        }
        const { _id } = payload;
        USER.findById(_id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ error: "User not found" });
                }
                req.user = { _id: userData._id, name: userData.name }; // Modify to include name
                next();
            })
            .catch(err => {
                console.error("Error finding user by ID:", err);
                res.status(500).json({ error: "Internal Server Error" });
            });
    });
};
