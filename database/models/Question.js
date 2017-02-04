const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
	questText = String,
	isStandard = boolean,
	weight = Number
})

module.exports = mongoose.model('User', userSchema);
