
const jwt = require('jsonwebtoken');
require("dotenv").config();

function jwtGenerator(user_id) {
  // Put user id in payload
  const payload = {
    user: {
      id: user_id
    }
  };

  // Create jwt token using payload
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "14d" });
}

module.exports = jwtGenerator;
