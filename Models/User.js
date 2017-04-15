//User Schema

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
        name: {
            type : String,
            required : true
        },
        email: {
            type : String,
            required : true
        },
        relation : mongoose.Schema.Types.Mixed,
        createdat: Date,
        modifiedat: Date
    },
    {collection : 'userCollection'}
);

module.exports = mongoose.model('users', UserSchema);