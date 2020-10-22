const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
}).database();

// Query Discogs API to get the artist/label/release details
async function artist(parent, args) {
  try {
    const artist = await db.getArtist(args.artistId);

    if (!artist) {
      throw new Error(`No artist found for id ${args.artistId}`);
    }

    return {
      ...artist,
      artistId: artist.id,
      image: artist.images[0].uri,
    };
  } catch (error) {
    console.log(error);
  }
}

async function label(parent, args) {
  try {
    const label = await db.getLabel(args.labelId);

    if (!label) {
      throw new Error(`No label found for id ${args.labelId}`);
    }

    return {
      ...label,
      labelId: label.id,
      name: label.name,
      image: label.images[0].uri,
    };
  } catch (error) {
    console.log(error);
  }
}

async function release(parent, args) {
  try {
    const release = await db.getRelease(args.releaseId);

    if (!release) {
      throw new Error(`No Release found for id ${args.releaseId}`);
    }

    return {
      ...release,
      formats: () => release.formats.map((format) => format.name),
      artists: () =>
        release.artists.map((artist) => {
          return { artistId: artist.id, name: artist.name };
        }),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { artist, label, release };
