const User = require("../models/users");
const bcrypt = require("bcrypt");

const fieldsPattern = [
  "username",
  "password",
  "email",
  "country",
  "gender",
  "dob",
];

const render_dashboard = (req, res) => {
  res.render("dashboard", {
    data: req.session.user,
    succ: undefined,
    err: undefined,
  });
};

const postDashboard = (req, res) => {
  const bodyKeys = Object.keys(req.body);
  bodyKeys.pop();
  const checkFieldsResult = fieldsPattern.every((field) =>
    bodyKeys.includes(field)
  );

  if (!checkFieldsResult || bodyKeys.length !== 6) {
    return res.status(400).render("dashboard", {
      data: req.session.user,
      succ: undefined,
      err: "Bad request!!!",
    });
  }

  // User.findOne({ username: req.session.user.username }, (err, user) => {
  //   if (err)
  //     return res.status(500).render("dashboard", {
  //       data: user,
  //       succ: undefined,
  //       err: "Server error!!!",
  //     });

  bcrypt.compare(
    req.body.password,
    req.session.user.password,
    function (err, isMatch) {
      if (err)
        return res.status(500).render("dashboard", {
          data: req.session.user,
          succ: undefined,
          err: "Server error!!!",
        });

      if (!isMatch)
        return res.status(404).render("dashboard", {
          data: req.session.user,
          succ: undefined,
          err: "Wrong password!!!",
        });

      if (req.body.password === req.body.newpassword) {
        return res.status(400).render("dashboard", {
          data: req.session.user,
          succ: undefined,
          err: "Passwords are equl!!!",
        });
      }

      req.body.password = !req.body.newpassword
        ? req.body.password
        : req.body.newpassword;

      User.findOneAndUpdate(
        { _id: req.session.user._id },
        req.body,
        { new: true },
        (err, userUpdate) => {
          if (err) {
            return res.status(500).render("dashboard", {
              data: user,
              succ: undefined,
              err: err.message,
            });
          }
          userUpdate.save(async (err) => {
            if (err) {
              await User.findOneAndUpdate(
                { _id: req.session.user._id },
                req.session.user,
                { new: true }
              );
              return res.status(400).render("dashboard", {
                data: req.session.user,
                succ: undefined,
                err: err.message,
              });
            }
            req.session.user = userUpdate;

            res.status(200).render("dashboard", {
              data: req.session.user,
              succ: "Update Successfuly :)",
              err: undefined,
            });
          });
        }
      );
    }
  );
  // });
};

module.exports = { render_dashboard, postDashboard };
