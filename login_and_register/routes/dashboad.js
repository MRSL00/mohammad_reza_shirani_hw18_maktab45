const express = require("express");
const router = express.Router();
const { render_dashboard } = require("../controllers/dashboard");

router.get("/dashboard",render_dashboard);
// router.post("/login", postLogin);

module.exports = router;
