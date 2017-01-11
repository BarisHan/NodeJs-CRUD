var mongoose = require('mongoose');

// User Schema

var UserSchema = mongoose.Schema({
    username : {
        type: String,
        index: true
    },
    password: {
        type: String
    }
   
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
