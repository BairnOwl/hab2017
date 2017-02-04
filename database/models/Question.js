const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
	questText: String,
	isStandard: Boolean,
	weight: Number
})

module.exports = mongoose.model('Question', questionSchema);
