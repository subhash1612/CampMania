const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    }
})

UserSchema.plugin(passportLocalMongoose);//passport automatically adds a password field,makes sure usernames arent duplicated and other methods
module.exports = mongoose.model('User', UserSchema);