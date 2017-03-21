var mongoose = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

// User Schema

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// adds some of the methods that comes with passport to user schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);