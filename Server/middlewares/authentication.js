const User = require("../models/user");
const jwt = require("jwt-then");

const authentication = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw "Forbidden.";
        const [key, token] = req.headers.authorization.split(" ");
        if (key !== "Bearer" || !token) throw "Forbidden.";
        const payload = await jwt.verify(token, process.env.USER_SECRET);
        req.payload = payload;
        next();
    } catch (err) {
        res.status(400).json({
            message: "Forbidden",
        });
    }
};

module.exports = authentication;
