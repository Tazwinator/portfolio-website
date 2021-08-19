const User = require('../node-files/user-model');

module.exports.newImg = async (req, res) => {
	const user = await User.findById(req.user.id);
	const { filename, path } = req.file;
	if (!user.images.length) {
		user.images = { filename, path };
		user.save();
		req.flash(
			'success',
			'Success, you have successfully made a new campground!'
		);
		res.redirect(`/data`);
	} else {
		user.images.push({ filename, path });
		user.save();
		req.flash(
			'success',
			'Success, you have successfully made a new campground!'
		);
		res.redirect(`/data`);
	}
};

module.exports.dataPage = async (req, res) => {
	const user = await User.findById(req.user.id);
	const images = user.images;
	console.log(images);
	res.render('pages/data-upload', { images: images });
};

module.exports.delImg = async (req, res) => {
	const user = await User.findById(req.user.id);
};
