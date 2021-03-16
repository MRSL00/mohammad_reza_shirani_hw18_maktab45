const express = require("express");
const router = express.Router();
const { render_register, postRegister } = require("../controllers/register");

router.get("/register", render_register);
router.post("/register", postRegister);


module.exports = router;
