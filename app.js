var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Dummy array
    var blogs = [
        {name : "Best restaurant in LA", image: "https://farm8.staticflickr.com/7264/6891827500_af9647bbe4.jpg"},
        {name : "Best restaurant in GA", image: "https://farm4.staticflickr.com/3008/2870275945_1862ca59aa.jpg"},
        {name : "Best restaurant in NY", image: "https://farm3.staticflickr.com/2642/4480922982_9247c79dfb.jpg"},
        {name : "Best restaurant in SC", image: "https://farm3.staticflickr.com/2455/3767568642_a6124a082e.jpg"}
    ]

// won't have to use the extension ejs when rendering the page
app.set("view engine", "ejs");

// middleware to handle post requests
app.use(bodyParser.urlencoded({extended: true}));

// Landing page route
app.get("/", function(req, res){
    res.render("landing");
});

// route for displaying the blogs
app.get("/blogs", function(req, res){
    // page to render and the data we want to pass through
    res.render("blogs", {blogs:blogs});
});

app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    //get data from form and add to blogs array
    var name = req.body.name;
    var image = req.body.image;
    var newBlog = {name: name, image: image};
    //push to the array
    blogs.push(newBlog);
    console.log("Pushed");
    //redirect back to the blogs page
    res.redirect("/blogs");
});

app.listen(process.env.PORT | 3000, process.env.IP, function(){
    console.log("server has started");
});