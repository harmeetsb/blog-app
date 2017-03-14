var express         = require("express"),
    mongoose        = require("mongoose"),
    app             = express(),
    bodyParser      = require("body-parser");
    Blog            = require("./models/blog");

// connect to the database
mongoose.connect("mongodb://localhost/blog");

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
    //res.render("blogs", {blogs:blogs});
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("Error occured in getting data");
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
    res.render("new");
});

// blog detail
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            console.log("Error in finding blog");
        } else {
            res.render("show_blog", {blog : foundBlog});
        }
    });
});

app.post("/blogs", function(req, res){
    //get data from form and add to blogs array
    var name = req.body.name;
    var image = req.body.image;
    var newBlog = {name: name, image: image};
    // persisting in database
    var toInsert = new Blog(newBlog);
    toInsert.save(function(err, addedBlog){
        if(err) {
            console.log("error occured while adding blog to the database");
        } else {
            console.log("added to the database");
            //redirect back to the blogs page
            res.redirect("/blogs");
        }
    });

});

app.listen(process.env.PORT | 3000, process.env.IP, function(){
    console.log("server has started");
});