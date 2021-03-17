const User = require("../models/users");

const render_dashboard = (req, res) => {
  res.render("dashboard", {
    data: req.session.data,
    pass: req.session.pass,
    err: undefined,
  });
};

module.exports = { render_dashboard };
