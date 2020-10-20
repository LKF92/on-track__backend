const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signup(parent, args) {
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
}

module.exports = { signup };
