const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getUserId } = require("../utils");

async function signup(parent, args) {
  try {
    const encryptedPWD = await bcrypt.hash(args.password, 10);
    const user = new User({
      username: args.username,
      password: encryptedPWD,
      email: args.email,
    });

    await user.save();
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
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

async function addFavArtist(parent, args, context) {
  try {
    const userId = getUserId(context);
    const user = await User.findById(userId);

    if (user.favArtists.includes(args.id)) {
      throw new Error("The artist has already been added to the list of favourite artists");
    }

    user.favArtists.push(args.id);
    await user.save();

    return user.favArtists;
  } catch (error) {
    console.log(error);
  }
}

async function addFavLabel(parent, args, context) {
  try {
    const userId = getUserId(context);
    const user = await User.findById(userId);

    if (user.favLabels.includes(args.id)) {
      throw new Error("The Label has already been added to the list of favourite labels");
    }

    user.favLabels.push(args.id);
    await user.save();

    return user.favLabels;
  } catch (error) {
    console.log(error);
  }
}

async function addFavEP(parent, args, context) {
  try {
    const userId = getUserId(context);
    const user = await User.findById(userId);

    if (user.favEPs.includes(args.id)) {
      throw new Error("The EP has already been added to the list of favourite EPs");
    }

    user.favEPs.push(args.id);
    await user.save();

    return user.favEPs;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signup, login, addFavArtist, addFavLabel, addFavEP };
