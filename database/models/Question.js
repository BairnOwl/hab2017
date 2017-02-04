const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
	questText = String
})

module.exports = mongoose.model('User', userSchema);
