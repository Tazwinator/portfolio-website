const scriptSrcUrls = [
	'https://stackpath.bootstrapcdn.com/',
	'https://api.tiles.mapbox.com/',
	'https://api.mapbox.com/',
	'https://kit.fontawesome.com/',
	'https://cdnjs.cloudflare.com/',
	'https://cdn.jsdelivr.net'
];

const styleSrcUrls = [
	'https://kit-free.fontawesome.com/',
	'https://cdn.jsdelivr.net',
	'https://api.mapbox.com/',
	'https://api.tiles.mapbox.com/',
	'https://fonts.googleapis.com/',
	'https://use.fontawesome.com/',
	'https://fonts.gstatic.com'
];

const connectSrcUrls = [
	'https://api.mapbox.com/',
	'https://a.tiles.mapbox.com/',
	'https://b.tiles.mapbox.com/',
	'https://events.mapbox.com/',
	'https://api.cryptonator.com',
	'https://geek-jokes.sameerkumar.website',
	'https://icanhazdadjoke.com',
	'https://freegeoip.app'
];

const fontSrcUrls = [
	'https://fonts.googleapis.com/',
	'https://fonts.gstatic.com'
];

module.exports.CSPConfig = {
	directives : {
		defaultSrc : [],
		connectSrc : [ "'self'", ...connectSrcUrls ],
		scriptSrc  : [ "'unsafe-inline'", "'self'", ...scriptSrcUrls ],
		styleSrc   : [ "'self'", "'unsafe-inline'", ...styleSrcUrls ],
		workerSrc  : [ "'self'", 'blob:' ],
		objectSrc  : [],
		imgSrc     : [
			"'self'",
			'blob:',
			'data:',
			`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`, //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
			'https://images.unsplash.com/'
		],
		fontSrc    : [ "'self'", ...fontSrcUrls ]
	}
};
