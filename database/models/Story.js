const mongoose = require('mongoose');

let storySchema = mongoose.Schema({
	title: String
	chars: [ charId: ObjectId ]
})

module.exports = mongoose.model('Story', userSchema);

