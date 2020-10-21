const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signup(parent, args) {
  try {
    const encryptedPWD = await bcrypt.hash(args.password, 10);
    const user = new User({
      username: args.username,
      password: encryptedPWD,
      email: args.email,
    });
    let userId;
    await user.save((err, user) => (userId = user.id));
    const token = jwt.sign({ userId: userId }, process.env.APP_SECRET);
    return { user, token };
  } catch (error) {
    console.log(error);
  }
}

async function login(parent, args, context) {
  try {
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return { user, token };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signup, login };
