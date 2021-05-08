
const router = require('express').Router();
// Bcrypt for encryption/decryption
const bcrypt = require('bcrypt');
// Middleware
const jwtGenerator = require('../utils/jwtGenerator');
const validation = require('../middleware/validation');
const verification = require('../middleware/verification');
// Importing Models
let Student = require('../models/students.model');
let Teacher = require('../models/teachers.model');


// REGISTER ROUTE
router.post('/googlelogin', validation, async (req, res) => {
  try {

    const { name, role, email } = req.body;

    let user, newUser;

    if(role === "teacher") {
      user = await Teacher.find({ email: email }).exec();
      if(user.length === 0) {
        // Creating the user
        const user = new Teacher({name, email, role});

        newUser = await user.save();
      }
      else {
        newUser = user[0];
      }

    }
    else if(role === "student") {
      user = await Student.find({ email: email }).exec();
      if(user.length === 0) {
        // Creating the user
        const user = new Student({name, email, role});

        newUser = await user.save();
      }
      else {
        newUser = user[0];
      }
    }

    // Get a jwt token
    const token = jwtGenerator(newUser._id);

    // Send back the user and token as response
    res.json({
      cred: {
        token: token,
        user: newUser,
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// VERIFY IF ONLINE ROUTE
router.get("/verify", verification, async (req, res) => {
  try {

    // Find the user in database
    let user;
    user = await Teacher.findById(req.user.id).exec();
    if(!user) {
      user = await Student.findById(req.user.id).exec();
    }

    res.json({
      cred: {
        user: user,
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
