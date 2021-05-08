
const router = require('express').Router();
// Middleware
const verification = require('../middleware/verification');
// Importing Models
let Class = require('../models/class.model');
let Question = require('../models/questions.model');
let Teacher = require('../models/teachers.model');

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
      classData: newClass
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post('/createQuestion', verification, async (req, res) => {
  try {

    const { title, option1, option2, option3, option4, answer, classId, meetlink } = req.body;

    const ques = new Question({
      title: title,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      answer: answer,
      classId: classId,
      meetlink: meetlink
    });

    const newQues = await ques.save();

    // Send back the user and token as response
    res.json({
      question: newQues
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/getAllQuestions", verification, async (req, res) => {
  try {
    const {classId} = req.body;
    // Get the user profile from database using the user id
    const ques = await Question.find({classId: classId}, 'title option1 option2 option3 option4 answer classId meetlink').exec();

    res.json({
      questions: ques
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.get("/getAllClasses", verification, async (req, res) => {
  try {
    // Get the user profile from database using the user id
    const classes = await Class.find({}, 'name description semester meetlink teacher').exec();

    res.json({
      classes: classes
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/getMyClasses", verification, async (req, res) => {
  const { teacher } = req.body;

  try {
    // Get the user profile from database using the user id
    const classes = await Class.find({teacher: teacher}, 'name description semester meetlink teacher').exec();

    res.json({
      classes: classes
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/getClass", verification, async (req, res) => {
  try {
    const {classId} = req.body;
    // Get the user profile from database using the user id
    const classData = await Class.findOne({_id: classId}, 'name description semester meetlink teacher').exec();

    const teacherName = await Teacher.findOne({_id: classData.teacher}, 'name').exec();

    res.json({
      classData: classData,
      teacherName: teacherName.name
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post('/addStudent', verification, async (req, res) => {
  try {

    const { classId, student } = req.body;

    const classAdd = await Class.findOneAndUpdate(
      { _id: classId },
      { $push: { students: student } }
    ).exec();

    // Send back the user and token as response
    res.json({
      updated: true
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
