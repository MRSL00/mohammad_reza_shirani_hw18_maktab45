const url = require("url");

const CheckSession = function (req, res, next) {
  console.log("1:",req.session.data);
  if (req.cookies.user_sid && req.session.data) {
    // console.log(req.session.data);
    return res.redirect("/dasboard");
  }
  next();
};

const CheakLogin = function (req, res, next) {
  console.log("2:",req.session.data);
  if (!req.session.data) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { CheakLogin, CheckSession };
