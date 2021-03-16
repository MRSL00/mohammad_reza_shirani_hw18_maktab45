const User = require("../models/users");

const render_login = (req, res) => {
  res.render("login", { err: req.session.msg });
};

const postLogin = (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      // if (err.stack.includes("CastError"))
      //   return res.status(400).render("login", { err: err.reason.message });
      return res.status(500).render("login", { err: "Server error!!!" });
    }
    if (!user)
      return res.status(404).render("login", { err: "User not found!!!" });

    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err)
        return res.status(500).render("login", { err: "Server error!!!" });

      if (!isMatch)
        return res.status(404).render("login", { err: "Wrong password!!!" });
      // req.session.user = user;

      // res.status(200).render("dashboard",{user});
    });
  });
};

module.exports = { render_login, postLogin };
