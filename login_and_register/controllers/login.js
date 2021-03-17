const User = require("../models/users");
const bcrypt = require("bcrypt");

const render_login = (req, res) => {
  res.render("login", { err: req.session.msg });
};

const postLogin = (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).render("login", { err: "Server error!!!" });
    }
    if (!user)
      return res.status(404).render("login", { err: "User not found!!!" });

    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err)
        return res.status(500).render("login", { err: "Server error!!!" });

      if (!isMatch)
        return res.status(404).render("login", { err: "Wrong password!!!" });
      req.session.data = user;
      req.session.pass = req.body.password;

      res.status(200).redirect("/dashboard");
    });
  });
};

module.exports = { render_login, postLogin };
