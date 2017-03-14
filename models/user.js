var mongoose = require("mongoose");

// User Schema

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

module.exports = mongoose.model("Blog", userSchema);