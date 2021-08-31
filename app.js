if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const axios = require('axios');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const { ExpressError } = require('./node-files/middleware.js');

const { catchAsyncErr, isLoggedIn } = require('./node-files/middleware');
const users = require('./controllers/users');
const dataUpload = require('./controllers/data-upload');
const api = require('./controllers/api');

// --------- Session / Cookies --------------------------- //
const session = require('express-session');
const MongoDBStore = require('connect-mongo');

const cookieParser = require('cookie-parser');

// --------- Cloudinary & Multer --------------------------- //

const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });

// --------- Static Files --------------------------- //
const ejsMate = require('ejs-mate');
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// --------- Parsing POST data --------------------------- //

app.use(express.urlencoded({ extended: true }));

// --------- Mongo --------------------------- //

const Mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

Mongoose.connect(dbUrl, {
	useNewUrlParser    : true,
	useCreateIndex     : true,
	useUnifiedTopology : true,
	useFindAndModify   : false // This one fixes a deprication error with findByIdAndDelete
});

const db = Mongoose.connection;
db.on('error', console.error.bind('console', 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

// --------- Session --------------------------- //

const secret = process.env.SECRET || 'thishouldbeabettersecret!';

const store = new MongoDBStore({
	mongoUrl   : dbUrl,
	secret     : secret,
	touchAfter : 24 * 60 * 60 // In seconds.
});

store.on('error', function (e) {
	console.log('SESSION STORE ERROR', e);
});

const sessionConfig = {
	// Sets up the sessionId cookie
	store,
	name              : 'SID',
	secret            : secret, // this and SHA256 encrypt the cookie
	resave            : false,
	saveUninitialized : false,
	cookie            : {
		// cookie attributes
		httpOnly : true,
		// secure: true; ONLY SETS SESSION COOKIES ON SECURE CONNECTIONS (HTTPS), DOES NOT WORK ON LOCALHOST!!!!!!!!!!!!
		expires  : Date.now() + 1000 * 60 * 60 * 24 * 7, // Milliseconds
		maxAge   : 1000 * 60 * 60 * 24 * 7
	}
};
app.use(session(sessionConfig));

// --------- Cookies --------------------------- //

app.use(cookieParser());

const getGeoData = async (ip) => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get(`https://freegeoip.app/json/${ip}`, config);
		return res.data;
	} catch (e) {
		console.log('GeoIp not worked', e);
	}
};

app.use(async (req, res, next) => {
	if (!req.cookies.GeoIp) {
		const ip = req.socket.remoteAddress;
		const data = await getGeoData(ip);
		const geo = `${data.country_code}/${data.region_code}/${data.city}/${data.zip_code}/IP:${data.ip}`;
		console.log(geo);
		res.cookie('GeoIp', geo, {
			httpOnly : true,
			expires  : Date.now() + 1000 * 60 * 60 * 24 * 7, // In Milliseconds
			maxAge   : 1000 * 60 * 60 * 24 * 7 // In milliseconds
		});
		next();
	}
	next();
});

// --------- Passport --------------------------- //

const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./node-files/user-model');

app.use(passport.initialize()); // Sets up passport
app.use(passport.session()); // Makes it use the express-session for persistant sessions
passport.use(new passportLocal(User.authenticate()));
// This line tells passport that with the local strategy of authentication we are going to use -
// the "User" model.
// The authenticate method on the "User" model comes from the plugin we added in the model file

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --------- FLash --------------------------- //

const flash = require('connect-flash');

app.use(flash());

app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

// --------- Other (also to play around with and test stuff) --------------------------- //

app.use((req, res, next) => {
	res.locals.currentUser = req.user; // req.user is set by passport
	req.session.returnTo = req.header('Referrer');
	/* 	console.log(req.user);
 */ next();
});

// ----------------------- Routes ------------------------------- //

// Home
app.get('/', (req, res) => {
	res.render('pages/home');
});

// auth page get
app.route('/auth').get((req, res) => {
	res.render('pages/auth');
});

// User auth routes
app.route('/register').post(catchAsyncErr(users.registerSubmit));

app.route('/login').post(
	passport.authenticate('local', {
		failureFlash    : true,
		failureRedirect : '/auth'
	}),
	users.loginSubmit
);

app.get('/logout', isLoggedIn, users.logout);

// Data Uplaod routes

app.route('/data').get(catchAsyncErr(dataUpload.dataPage));

app
	.route('/img-data')
	.post(upload.single('image'), catchAsyncErr(dataUpload.newImg));

app
	.route('/img-data/edit-img/:imgId')
	.get(catchAsyncErr(dataUpload.editImgsPage))
	.delete(catchAsyncErr(dataUpload.delImg));

app
	.route('/txt-data')
	.post(catchAsyncErr(dataUpload.newFavs))
	.delete(catchAsyncErr(dataUpload.delFavs));

// API routes

app.route('/api').get(catchAsyncErr(api.api));

// Tech stack routes

app.route('/tech').get((req, res) => {
	res.render('pages/tech');
});

app.all('*', (req, res, next) => {
	// .all is for all HTTP methods (so nto just if the app is used like .use)
	next(new ExpressError('Webpage not found', 404));
});

// Handling unhandled errors and passing them onto the errors page.
app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Something went wrong!';
	if (err.message === 'Something went wrong!') console.log(err);
	res.status(statusCode).render('pages/error', { err, statusCode });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});
