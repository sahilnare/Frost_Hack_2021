const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const studentSchema = new Schema({
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



const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
