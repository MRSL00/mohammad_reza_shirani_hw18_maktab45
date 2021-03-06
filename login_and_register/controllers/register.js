const User = require("../models/users");

const fieldsPattern = [
  "username",
  "password",
  "email",
  "country",
  "gender",
  "dob",
];

const render_register = (req, res) => {
  res.render("register", { err: undefined });
};

const postRegister = (req, res) => {
  

  const bodyKeys = Object.keys(req.body);
  bodyKeys.pop();
  const checkFieldsResult = fieldsPattern.every((field) =>
    bodyKeys.includes(field)
  );

  if (!checkFieldsResult || bodyKeys.length !== 6) {
    return res.status(400).render("register", { err: "Bad request!!!" });
  }

  if (req.body.password !== req.body.confirm) {
    return res
      .status(400)
      .render("register", { err: "The passwords are unequal!!!" });
  }

  delete req.body.confirm;
  const newUser = new User(req.body);
  newUser.save({}, (err) => {
    if (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .render("register", {
            err: "This username has already been selected!!!",
          });
      }

      if (
        err.message.includes("username") ||
        err.message.includes("password")
      ) {
        
        return res.status(400).render("register", { err: err.message });
      }
      return res.status(400).render("register", { err: "Bad request!!!" });
    }

    res.status(200).redirect("/login");
  });
};

module.exports = { render_register, postRegister };
