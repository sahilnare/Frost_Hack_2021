const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const classSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  semester: {
    type: Number,
  },
  meetlink: {
    type: String,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
});


const Class = mongoose.model('Class', classSchema);

module.exports = Class;
