const mongoose = require("mongoose");
const hashPassword = require("../helpers/hashPassword");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Account holder name is required.",
    },
    email: {
      type: String,
      require: "Email is required."
    },
    password: {
      type: String,
      required: "Password is required.",
    },
    stripeAccountId: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  const user = await this.constructor.findOne({
    email: this.email,
  });

  if (user) {
    next("An account with this phone number already exists.");
    return;
  }

  //Validate Password Length

  if (this.password.length < 6) {
    next("Password must be minimum of 6 characters long.");
    return;
  }

  //Hash the password
  this.password = hashPassword(this.password);
  next();
});

module.exports = mongoose.model("User", userSchema);
