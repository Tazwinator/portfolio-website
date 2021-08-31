const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const axios = require('axios');

const getGeoData = async (ip) => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get(`https://freegeoip.app/json/${ip}`, config);
		return res.data;
	} catch (e) {
		console.log('GeoIp not worked', e);
	}
};

/* const geo = `${data.country_code}/${data.region_code}/${data.city}/${data.zip_code}/IP:${data.ip}`;
 */

/* const geoData = await geocoder.forwardGeocode({
  query: req.body.campground.location,
  limit: 1
}).send(); */

module.exports.api = async (req, res) => {
	const ip = '82.31.227.182';
	const data = await getGeoData(ip);
	const location = { lng: data.longitude, lat: data.latitude };
	res.render('pages/api', { location });
};
