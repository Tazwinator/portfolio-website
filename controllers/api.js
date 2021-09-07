const axios = require('axios');

const getGeoData = async (ip) => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get(`https://freegeoip.app/json/${ip}`, config);
		return res.data;
	} catch (e) {
		console.log('GeoIp not worked' + e);
	}
};

module.exports.api = async (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	const data = await getGeoData(ip);
	if (!data.longitude && !data.latitude) {
		const location = { lng: -0.5, lat: 52.0 };
		res.render('pages/api', { location });
	} else {
		const location = { lng: data.longitude, lat: data.latitude };
		res.render('pages/api', { location });
	}
};
