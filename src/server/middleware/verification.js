
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {

    // Get token from request header
    const jwtToken = req.header("token");

    // const jwtTokenCookie = req.cookies.eBuzzToken;

    // If there is not token
    if(!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // Verify the token and get the user id
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Set request user
    req.user = payload.user;
    next();

  } catch (err) {
    // console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
}
