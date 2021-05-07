const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const teacherSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String
  },
  role: {
    type: String
  }
}, {
  timestamps: true
});



const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
