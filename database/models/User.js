const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    storyIds: [ id : ObjectId ]
});

module.exports = mongoose.model('User', userSchema);
