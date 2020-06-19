const router = require("express").Router();
const { catchErrors } = require("../helpers/errorHandler")

router.post('/createJob', catchErrors(require("../controllers/hirerController").createJob));

module.exports = router;
