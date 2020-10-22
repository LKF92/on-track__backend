const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  favArtists: [String],
  favLabels: [String],
  favEPs: [String],
  EPsToListen: [String],
});

module.exports = User;
