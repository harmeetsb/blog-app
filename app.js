var express = require("express");
var app = express();

// won't have to use the extension ejs when rendering the page
app.set("view engine", "ejs");

// Landing page route
app.get("/", function(req, res){
    res.render("landing");
});

app.listen(process.env.PORT | 3000, process.env.IP, function(){
    console.log("server has started");
});