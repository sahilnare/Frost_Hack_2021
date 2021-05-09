const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const answerSchema = new Schema({
  title: {
    type: String,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  answer: {
    type: String,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  meetlink: {
    type: String,
  }
});


const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
