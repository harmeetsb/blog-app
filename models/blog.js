var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Blog", blogSchema);