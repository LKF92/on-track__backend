const User = require("../models/User");

async function getUser(parent, args) {
  try {
    let user = await User.findById(args.id);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUser };
