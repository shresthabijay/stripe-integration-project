const router = require("express").Router();
const { catchErrors } = require("../helpers/errorHandler")
const { onboard, validateOnboardingToken } = require('../controllers/stripeController')
const authentication = require("../middlewares/authentication")

router.get("/ping", (req, res) => {
    res.send("Hello from the stripe integration server!");
});

router.get("/onboard", authentication, catchErrors(onboard));

router.get("/validate-token", authentication, catchErrors(validateOnboardingToken));

module.exports = router;
