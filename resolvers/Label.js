const { db } = require("../utils");

async function releases(parent, args) {
  try {
    const response = await db.getLabelReleases(parent.labelId);
    if (!response) {
      throw new Error(`No Release found for label ${parent.labelId}`);
    }

    const releases = response.releases.map((release) => {
      return {
        ...release,
        releaseId: release.id,
        label: parent.name,
      };
    });
    return releases;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { releases };
