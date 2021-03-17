const express = require("express");
const router = express.Router();
const { render_register, postRegister } = require("../controllers/register");
const { CheckSession } = require("../controllers/middlewares/sessionChecker");

router.get("/register", CheckSession, render_register);
router.post("/register", postRegister);

module.exports = router;
