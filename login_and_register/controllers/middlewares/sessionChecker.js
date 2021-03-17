
const CheckSession = function (req, res, next) {
  if (req.cookies.user_sid && req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
};

const CheakLogin = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { CheakLogin, CheckSession };
