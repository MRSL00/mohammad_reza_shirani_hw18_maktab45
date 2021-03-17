const logout = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};

module.exports = { logout };
