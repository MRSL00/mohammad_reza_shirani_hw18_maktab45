const User = require("../models/users");
const bcrypt = require("bcrypt");

const render_login = (req, res) => {
  res.render("login", { err: undefined });
};

const postLogin = (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).render("login", { err: "Fill Empty Fields!!!" });

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

      req.session.user = {
        username: user.username,
        email: user.email,
        country: user.country,
        dob: user.dob,
        gender: user.gender,
      };

      console.log(req.session.user);

      res.status(200).redirect("/dashboard");
    });
  });
};

module.exports = { render_login, postLogin };
