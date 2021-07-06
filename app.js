if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
};

const express = require("express");
const app = express();
const path = require("path");
const { catchAsyncErr, isLoggedIn } = require("./middleware");
const users = require("./userControllers");

// Session
const session = require("express-session");
const MongoDBStore = require("connect-mongo");


// --------- Static Files --------------------------- //
const ejsMate = require("ejs-mate");
app.set("view engine", "ejs");
app.engine("ejs", ejsMate)
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({extended: true}));

// --------- Mongo --------------------------- //

const Mongoose = require("mongoose");

const dbUrl = process.env.DB_URL

Mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false // This one fixes a deprication error with findByIdAndDelete
});

const db = Mongoose.connection;
db.on("error", console.error.bind("console", "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


// --------- Session --------------------------- //



const secret = process.env.SECRET || "thishouldbeabettersecret!";

const store = new MongoDBStore ({
  mongoUrl: dbUrl,
  secret: secret,
  touchAfter: 24 * 60 * 60 // In seconds.
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e)
});

const sessionConfig = { // Sets up the sessionId cookie
  store,
  name: "SID",
  secret: secret, // this and SHA256 encrypt the cookie
  resave: false,
  saveUninitialized: false,
  cookie: { // cookie attributes
    httpOnly: true,
    // secure: true; ONLY SETS SESSION COOKIES ON SECURE CONNECTIONS (HTTPS), DOES NOT WORK ON LOCALHOST!!!!!!!!!!!!
    expires: Date.now() + 1000 * 60 * 60 *24 * 7, // Milliseconds
    maxAge: 1000 * 60 * 60 *24 * 7
  }
};
app.use(session(sessionConfig));


// --------- Passport --------------------------- //


const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./userModel");

app.use(passport.initialize()); // Sets up passport
app.use(passport.session()); // Makes it use the express-session for persistant sessions
passport.use(new passportLocal(User.authenticate()));
// This line tells passport that with the local strategy of authentication we are going to use -
// the "User" model.
// The authenticate method on the "User" model comes from the plugin we added in the model file

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// --------- FLash --------------------------- //

const flash = require("connect-flash");

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// --------- Other (also to play around with and test stuff) --------------------------- //

app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user is set by passport
  req.session.returnTo = req.header("Referrer");
  next();
});


// ----------------------- Routes ------------------------------- //

app.get("/", (req, res) => { // Home
  res.render("pages/home")
});

app.route("/auth") // auth page get
.get((req, res) => {
  res.render("pages/auth")
});

// User auth routes
app.route("/register")
  .post(catchAsyncErr(users.registerSubmit));

app.route("/login")
  .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/auth"}), users.loginSubmit);

app.get("/logout", isLoggedIn, users.logout);

// Data Uplaod routes

app.route("/data")
.get((req, res) => {
  res.render("pages/data")
});

// API routes

app.route("/api")
.get((req, res) => {
  res.render("pages/api")
});

// Tech stack routes

app.route("/tech")
.get((req, res) => {
  res.render("pages/tech")
});



app.listen(3000, () => {
  console.log("Listening on port 3000")
});

// Plan:
// Auth page shows me doing it
// Tech stack page shows itself in a frontend-backend layout with api inbetween
// Data upload page shows me uploading images and form data and you have to be logged in
// api page shows me using external api