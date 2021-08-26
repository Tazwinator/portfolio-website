const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
	path     : String,
	filename : String
});

const textSchema = new Schema({
	fav1 : String,
	fav2 : String,
	fav3 : String,
	fav4 : String
});

ImageSchema.virtual('thumbnail').get(function () {
	return this.url.replace('/upload', '/upload/w_200');
});

const UserSchema = new Schema({
	email      : {
		type     : String,
		required : true,
		unique   : true
	},
	images     : [ ImageSchema ],
	favourites : { textSchema }
});

UserSchema.plugin(passportLocalMongoose);
// Adds username & password + some attributes for them and some methods we can use on the schema

module.exports = mongoose.model('User', UserSchema);
