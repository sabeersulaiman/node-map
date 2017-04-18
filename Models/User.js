//User Schema

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
        name: String,
        mobile: {
            type : String,
            required : true
        },
        bmi: String,
        diabetes : String,
        veg: String,
        createdat: Date,
        modifiedat: Date
    },
    {collection : 'users'}
);

module.exports = mongoose.model('users', UserSchema);