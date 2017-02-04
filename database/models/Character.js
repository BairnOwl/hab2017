const mongoose = require('mongoose');

let characterSchema = mongoose.Schema({
  title: String,
  questionAnswer: [ { questionId: ObjectId, answerText: String} ]
})

module.exports = mongoose.model('User', characterSchema);
