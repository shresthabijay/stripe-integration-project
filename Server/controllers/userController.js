const User = require("../models/user");
const hashPassword = require("../helpers/hashPassword");
const jwt = require("jwt-then");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    await user.save();

    res.status(200).json({
        message: "Registration successfull!",
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) throw "User not found";

    req.session.test = "hey there"

    if (!hashPassword(password) === user.password) throw "Email and password didn't match";

    const token = await jwt.sign({ type: "USER", id: user._id }, process.env.USER_SECRET);

    res.status(200).json({
        message: "Login successful!",
        token,
        user: {
            email,
            name: user.name,
            stripeAccountId: user.stripeAccountId
        }
    });
};

exports.detail = async (req, res) => {
    const user = await User.findById(req.payload.id).select(`email name stripeAccountId _id`)
    res.status(200).json(user)
};
