const User = require("../models/User");
const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
}).database();

// Query Discogs API's to get the artist details
async function artist(parent, args) {
  try {
    const response = await db.getArtist(args.artistId);

    const artist = {
      artistId: response.id,
      name: response.name,
      nameVariation: response.namevariations,
      aliases: response.aliases,
      groups: response.groups,
      profile: response.profile,
      websites: response.urls,
      imageUrl: response.images[0].uri,
    };
    return artist;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { artist };
