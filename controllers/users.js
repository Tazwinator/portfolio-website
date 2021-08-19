const User = require('../node-files/user-model');

module.exports.registerSubmit = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password); // Passport's method for hashing and salting
		console.log(registeredUser); // ------------------- For show, delete when necessary
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Registered and logged in, welcome!');
			res.redirect('/auth');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/auth');
	}
};

module.exports.loginSubmit = (req, res) => {
	req.flash('success', 'Logged in, welcome!'); // Passed in to the next request
	const redirectUrl = req.session.returnTo || '/auth';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Logged out, goodbye!');
	const redirectUrl = req.session.returnTo || '/auth';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};
