var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Pet  = require("./models/pet"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seed")

// our routes
var commentRoutes    = require("./routes/comments"),
    petRoutes = require("./routes/pets"),
    indexRoutes      = require("./routes/index")

var url = process.env.DATABASEURL || "mongodb://localhost/campy"

mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seeds some data to the database

// PASSPORT
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/pets", petRoutes);
app.use("/pets/:id/comments", commentRoutes);

var port = process.env.PORT || 3000;


app.listen(port, function(){
   console.log("The Server Has Started on " + port );
});