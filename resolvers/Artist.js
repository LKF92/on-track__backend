const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
}).database();

async function releases(parent, args) {
  console.log("parent", parent);
  console.log("args", args);

  try {
    const response = await db.getArtistReleases(parent.artistId);
    console.log(response);

    const releases = response.map((release) => {
      return {
        releaseId: release.id,
        title: release.title,
      };
    });
    return releases;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { releases };
