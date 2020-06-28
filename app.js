const { stringify } = require('querystring');

var express    = require('express'),
    http       = require('http'),

    app        = express(),
    server     = http.createServer(app),

    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy= require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    expressSession = require("express-session"),
    seedDB     = require("./seeds");
    
    
var commentRoutes    =  require("./routes/comments"),
    campgroundRoutes =  require("./routes/campgrounds"),
    indexRoutes       =  require("./routes/index");


    
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));



app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
seedDB();

//passport configuration
app.use(expressSession({
    secret:"Lucknow is known as Nawaboon Ka Saher",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(commentRoutes );
app.use(campgroundRoutes);
app.use(indexRoutes);

server.listen(3000);
console.log('Express server started on port %s', server.address().port);