const jwt = require("jsonwebtoken");

// Get the Authorization header from our request
// We can access it from the context object since we passed in in app.js
function getUserId(context) {
  const Authorization = context.request.body.variables.Authorization;

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");

    const jwtResponse = jwt.verify(token, process.env.APP_SECRET);

    return jwtResponse.userId;
  }
  throw new Error("Not Authenticated");
}

module.exports = {
  getUserId,
};
