module.exports = (req, res, next) => {
  const { mobile, username, password } = req.body;

  // Check if mobile is correct
  function validMobile(userMobile) {
    return /^\d{10}$/.test(userMobile);
  }

  // Validate password
  function validPasswod(password) {
    return /^.{6,}$/.test(password);
  }

  // Check for missing credentials
  if (req.path === "/register") {
    if (![mobile, username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validMobile(mobile)) {
      return res.status(401).json("Invalid mobile number");
    } else if (!validPasswod(password)) {
      return res.status(401).json("Password too short");
    }
  } else if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    }
  }

  next();
};
