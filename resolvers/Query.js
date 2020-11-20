const User = require("../models/User");
const { db } = require("../utils");

// Query Discogs API to get the artist/label/release details
async function artist(parent, args) {
  try {
    const artist = await db.getArtist(args.id);

    if (!artist) {
      throw new Error(`No artist found for id ${args.id}`);
    }

    return {
      ...artist,
      id: artist.id,
      image: artist.images ? artist.images[0].uri : null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function label(parent, args) {
  try {
    const label = await db.getLabel(args.id);

    if (!label) {
      throw new Error(`No label found for id ${args.id}`);
    }

    return {
      ...label,
      image: label.images ? label.images[0].uri : null,
    };
  } catch (error) {
    console.log(error);
  }
}

async function release(parent, args) {
  try {
    const release = await db.getRelease(args.id);

    if (!release) {
      throw new Error(`No Release found for id ${args.id}`);
    }

    return {
      ...release,
      formats: () => release.formats.map((format) => format.name),
      artists: () =>
        release.artists.map((artist) => {
          return { id: artist.id, name: artist.name };
        }),
    };
  } catch (error) {
    console.log(error);
  }
}

async function user(parent, args) {
  try {
    const user = await User.findById(args.id);
    if (user) return user;

    throw new Error(`no user found with the id ${args.id}`);
  } catch (error) {
    console.log(error);
  }
}

async function search(parent, args) {
  try {
    const search = await db.search(args.searchQuery, args.searchType);
    if (search) {
      return search.results.filter((result) => result.type === "artist" || result.type === "label");
    }
    return [];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { artist, label, release, user, search };
