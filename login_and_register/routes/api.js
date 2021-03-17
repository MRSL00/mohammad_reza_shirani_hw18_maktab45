const express = require("express");
const router = express.Router();
const { CheakLogin } = require("../controllers/middlewares/sessionChecker");

router.use("/", require("./register"));
router.use("/", require("./login"));
router.use("/", CheakLogin, require("./dashboad"));
// router.use("/", require("./logout"));

module.exports = router;
