var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

// Landing page route
router.get("/", function(req, res){
    res.render("landing");
});

//=============
// Auth routes
//=============
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({username: username});
    User.register(newUser, password, function(err, user){
        if(err) {
            console.log("user not inserted", err);
            return res.render("register");
        } else {
            console.log("user inserted");
            passport.authenticate("local")(req, res, function(){
                res.redirect("/blogs");
            })
        }
    })
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/blogs",
    failureRedirect: "/login"
}) , function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;