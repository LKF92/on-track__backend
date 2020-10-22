const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
}).database();

async function releases(parent, args) {
  try {
    const response = await db.getArtistReleases(parent.id);
    if (!response) {
      throw new Error(`No Release found for artist ${parent.id}`);
    }

    return response.releases;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { releases };
