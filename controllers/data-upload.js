const User = require('../node-files/user-model');
const { ExpressError } = require('../node-files/middleware.js');
const { cloudinary } = require('../cloudinary');

// Main Data Page GET

module.exports.dataPage = async (req, res) => {
	const user = await User.findById(req.user.id);
	const images = user.images;
	const favs = user.favourites.toObject();
	// Beacuse mongoose returns a document not an object and it won't get displayed otherwise
	res.render('pages/data-upload', { images: images, favs });
};

// For Images

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
		req.flash('success', 'Imaged added');
		res.redirect(`/data`);
	}
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
	const id = req.params.imgId;
	for (let image of user.images) {
		if (id == image._id) {
			await cloudinary.uploader.destroy(image.filename);
			await user.updateOne({ $pull: { images: { _id: id } } });
			// Pull out of the user document all images where their _id is equal to id.
		}
	}
	req.flash('success', 'Image deleted');
	res.redirect('/data');
};

// For Text

module.exports.newFavs = async (req, res) => {
	console.log(req.body.favs);
	const user = await User.findByIdAndUpdate(req.user.id, {
		$set : { favourites: req.body.favs }
	});
};
