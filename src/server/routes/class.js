
const router = require('express').Router();
// Middleware
const verification = require('../middleware/verification');
// Importing Models
let Class = require('../models/class.model');

router.post('/createClass', verification, async (req, res) => {
  try {

    const { name, description, meetlink, semester, teacher } = req.body;

    const class1 = new Class({
      name: name,
      description: description,
      semester: semester,
      meetlink: meetlink,
      teacher: teacher,
      students: []
    });

    const newClass = await class1.save();

    // Send back the user and token as response
    res.json({
      class: newClass
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});
