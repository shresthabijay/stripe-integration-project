const router = require("express").Router();
const { catchErrors } = require("../helpers/errorHandler")
const authentication = require("../middlewares/authentication")

router.post('/signup', catchErrors(require("../controllers/userController").signup));
router.post('/login', catchErrors(require("../controllers/userController").login));
router.get('/detail', authentication, catchErrors(require("../controllers/userController").detail));

module.exports = router;
