const mongoose = require('mongoose');

let storySchema = mongoose.Schema({
	title: String,
	chars: [ mongoose.Schema.Types.ObjectId  ]
})

module.exports = mongoose.model('Story', storySchema);
