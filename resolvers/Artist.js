const { db } = require("../utils");

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
