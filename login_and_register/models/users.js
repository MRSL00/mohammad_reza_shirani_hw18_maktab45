const mgs = require("mongoose");
const { hashPass } = require("./hooks");

const valid_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const UserSchema = new mgs.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (value.length < 3) {
        throw new Error("username should be greater than 3 characters!!!");
      }
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,

    validate(value) {
      if (!value.match(valid_pass)) {
        throw new Error("Password field should be greater than 8 characters.");
      }
    },
  },
  country: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    trim: true,
    enum: ["female", "male"],
  },
});

UserSchema.pre("save", hashPass);
UserSchema.pre("findOneAndUpdate", hashPass);

module.exports = mgs.model("User", UserSchema);
