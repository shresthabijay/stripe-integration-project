const querystring = require("querystring");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user");

const STRIPE_REDIRECT_URI = "localhost:3000/success";

/**
 * Redirect to Stripe to set up payments.
 */
exports.onboard = async (req, res) => {
    // Generate a random string as `state` to protect from CSRF and include it in the session
    const state = Math.random().toString(36).slice(2);

    req.session.state = state;

    const user = await User.findById(req.payload.id);

    if (!user) throw "Invalid user";

    const { email, name } = user;

    const [firstName, lastName] = name.split(" ");

    // Define the mandatory Stripe parameters: make sure to include our platform's client ID
    let parameters = {
        client_id: process.env.STRIPE_CLIENT_ID,
        state,
    };

    // Define paramaters for prefilling form and defining account capabilities
    parameters = Object.assign(parameters, {
        redirect_uri: STRIPE_REDIRECT_URI,
        "stripe_user[business_type]": "individual",
        "stripe_user[first_name]": firstName || "",
        "stripe_user[last_name]": lastName || "",
        "stripe_user[email]": email || "",
        "stripe_user[country]": "CA",
    });

    // Send redirect url to Stripe to start the Express onboarding flow
    res.status(200).send(process.env.STRIPE_EXPRESS_AUTH_URI + "?" + querystring.stringify(parameters));
};

/**
 * Validate new connected user's token after they are redirected from express onboarding form.
 */
exports.validateOnboardingToken = async (req, res) => {
    const { code, state } = req.query;

    if (req.session.state !== state) throw "You don't have valid session state";

    // clear session state
    req.session.state = ''; 

    const user = await User.findById(req.payload.id);

    if (!user) throw "Invalid user";

    if (user.stripeAccountId && user.stripeAccountId.length > 0) throw "This user already has his stripe payout setup";

    try {
        // Post the authorization code to Stripe to complete the Express onboarding flow
        const { stripe_user_id } = await stripe.oauth.token({
            grant_type: "authorization_code",
            code: code,
        });

        user.stripeAccountId = stripe_user_id;
        await user.save();

        res.status(200).json({
            message: "Onboarding successfull",
        });
    } catch (err) {
        res.status(400).json({
            message: "Onboarding failed",
        });
    }
};
