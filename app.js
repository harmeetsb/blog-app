var express                 = require("express"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    Blog                    = require("./models/blog"),
    Comment                = require("./models/comment"),
    seedDB                  = require("./seeds"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

var commentRoutes = require("./routes/comments"),
    blogRoutes    = require("./routes/blogs"),
    authRoutes    = require("./routes/auth");

    //seedDB();
var app = express();
// connect to the database
mongoose.connect("mongodb://localhost/blog");

app.use(require("express-session")({
    secret: "Secret key",
    resave: false,
    saveUninitialized: false
}));
// won't have to use the extension ejs when rendering the page
app.set("view engine", "ejs");

// middleware to handle post requests
app.use(bodyParser.urlencoded({extended: true}));

// serve the public directory..for using stylesheet __dirname gives current directory
app.use(express.static(__dirname +"/public"));
// so we can use our public style sheet
//app.use(express.static("public"));

// to support PUT and DELETE request with HTML
app.use(methodOverride("_method"));

// passport related stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// encoding and decoding message from the session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware that runs for all the routes. (to show the user info)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// user router
app.use(authRoutes);
app.use(blogRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT | 3000, process.env.IP, function(){
    console.log("server has started");
});