const express = require("express");
const router = express.Router();
const { render_login, postLogin } = require("../controllers/login");
const { CheckSession } = require("../controllers/middlewares/sessionChecker");

router.get("/login", CheckSession, render_login);
router.post("/login", postLogin);

module.exports = router;
