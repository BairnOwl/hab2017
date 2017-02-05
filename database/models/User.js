const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    storyIds: [ mongoose.Schema.Types.ObjectId ]
});

module.exports = mongoose.model('User', userSchema);
