const User = require('../node-files/user-model');
const { ExpressError } = require('../node-files/middleware.js');

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
	res.render('pages/data-upload', { images: images });
};

module.exports.editImgsPage = async (req, res, next) => {
	const user = await User.findById(req.user.id);
	const id = req.params.imgId;
	const img = user.images.filter((image) => id == image._id);
	const imgToEdit = img[0];
	res.render('pages/edit-img', { imgToEdit });
};

module.exports.delImg = async (req, res) => {
	const user = await User.findById(req.user.id);
};
