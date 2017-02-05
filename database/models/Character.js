const mongoose = require('mongoose');

let characterSchema = mongoose.Schema({
  title: String,
  questionAnswer: [ { questionId: mongoose.Schema.Types.ObjectId, answerText: String} ]
})

module.exports = mongoose.model('Character', characterSchema);
