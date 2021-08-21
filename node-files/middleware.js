// This class bascially edits the Error class with the parameters passed in
class ExpressError extends Error {
	// Express Error is an extension of Error
	constructor (message, statusCode) {
		// These parameters are passed in from the ExpressError class
		super(); // Calls the parent (Error class) so that "this" can be used to refer to Error class
		this.message = message; // Translates to "Error.message = message(passed in)" etc etc
		this.statusCode = statusCode;
	}
}
module.exports.ExpressError = ExpressError;

module.exports.catchAsyncErr = (func) => {
	// A fucntion is passed in
	return (req, res, next) => {
		// A new function is returned with req, res & next (from app.get) passed in
		func(req, res, next).catch((e) => next(e)); // func is excecuted with parameters passed in from the new function
	}; // And if there is an error .catch gets it and passed it to next.
};

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in first!');
		return res.redirect('/auth');
	}
	next();
};
