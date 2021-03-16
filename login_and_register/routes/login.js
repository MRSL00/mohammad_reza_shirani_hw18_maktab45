const express = require("express");
const router = express.Router();
const { render_login,postLogin } = require("../controllers/login");

router.get("/login", render_login);
router.post("/login", postLogin);

module.exports = router;
