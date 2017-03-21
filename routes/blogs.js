var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");

// route for displaying the blogs
router.get("/blogs", function(req, res){
    // page to render and the data we want to pass through
    //res.render("blogs", {blogs:blogs});
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("Error occured in getting data");
        } else {
            res.render("blogs/index", {blogs:blogs, currentUser: req.user});
        }
    });
});

// creating new blog
router.get("/blogs/new", isLoggedIn, function(req, res){
    res.render("blogs/new");
});


//===========
//SHOW Route
//===========
router.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err) {
            console.log("Error in finding blog");
        } else {
            res.render("blogs/show_blog", {blog : foundBlog});
        }
    });
});

// edit route
router.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("blogs/index");
        } else {
            res.render("blogs/edit", {blog: foundBlog});
        }
    });
});

// update route
router.put("/blogs/:id",isLoggedIn, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            console.log("Did not update");
        } else {
            console.log("Done");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
//=============
//Adding a blog
//=============
// creating new blog
router.get("/blogs/new", isLoggedIn, function(req, res){
    res.render("blogs/new");
});

router.post("/blogs",isLoggedIn, function(req, res){
    //get data from form and add to blogs array
    var title = req.body.blog.title;
    var image = req.body.blog.image;
    var body = req.body.blog.body;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    console.log(author);
    var newBlog = {title: title, image: image, body: body, author:author};
    // persisting in database
    Blog.create(newBlog, function(err, blog){
        if(err) {
            console.log("not inserted");
        } else {
            console.log("inserted");
            res.redirect("/blogs");
        }
    });
});

router.delete("/blogs/:id",isLoggedIn ,function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err) {
            console.log("Couldn't delete the blog");
        } else {
            console.log("Blog deleted")
            res.redirect("/blogs");
        }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
