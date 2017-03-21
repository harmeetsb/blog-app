var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
//==============
//Comments Routes
//==============

router.get("/blogs/:id/comments/new", function(req, res){

});

router.post("/blogs/:id/comments",isLoggedIn, function(req, res){
    // lookup blog using id
    Blog.findById(req.params.id, function(err, blog){
        if(err) {
            console.log("Error looking up blog")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author._id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    blog.comments.push(comment); // associating comment to the blog
                    blog.save();
                    res.redirect("/blogs/"+blog._id);
            }
            });
        }
    });
    // create new comment
    // connect comment to blog
    // redirect
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
