const express = require("express");
const router = express.Router();
const { render_dashboard, postDashboard } = require("../controllers/dashboard");

router.get("/dashboard", render_dashboard);
router.post("/dashboard", postDashboard);

module.exports = router;
