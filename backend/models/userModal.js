const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a Username"],
      unique: [true, "Username already exists"],
    },
    firstName: {
      type: String,
      required: [true, "Please add firstname"],
    },
    lastName: {
      type: String,
      required: [true, "Please add lastname"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
