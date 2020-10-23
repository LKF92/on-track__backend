const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
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
  // EPsToListen: {type: [String], default: []},
  // alreadyListened: {type: [String], default: []},
});

module.exports = User;
