/* Dad jokes */
const jokes1 = document.querySelector('#jokes1');
const button1 = document.querySelector('#jokeBtn1');

const addDadJoke = async () => {
	const jokeText = await getDadJoke();
	const newLI = document.createElement('LI');
	newLI.append(jokeText);
	jokes1.append(newLI);
};

const getDadJoke = async () => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get('https://icanhazdadjoke.com/', config);
		return res.data.joke;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

button1.addEventListener('click', addDadJoke);

/* Geeky Jokes */

const jokes2 = document.querySelector('#jokes2');
const button2 = document.querySelector('#jokeBtn2');

const addGeekJoke = async () => {
	const jokeText = await getGeekJoke();
	const newLI = document.createElement('LI');
	newLI.append(jokeText);
	jokes2.append(newLI);
};

const getGeekJoke = async () => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get(
			'https://geek-jokes.sameerkumar.website/api?format=json',
			config
		);
		return res.data.joke;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

button2.addEventListener('click', addGeekJoke);

/* Crypto */

const btcBtn = document.querySelector('#btcBtn');
const ethBtn = document.querySelector('#ethBtn');
const adaBtn = document.querySelector('#adaBtn');
const coinDetails = document.querySelector('#coinDetails');

const config = { headers: { accept: 'application/json' } };

const getBtc = async () => {
	try {
		const res1 = await axios.get(
			'https://api.cryptonator.com/api/ticker/btc-gbp',
			config
		);
		const coin1 = res1.data.ticker;
		coinDetails.innerText = `${coin1.base} -> ${coin1.target} = ${coin1.price}`;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

const getEth = async () => {
	try {
		const res2 = await axios.get(
			'https://api.cryptonator.com/api/ticker/eth-gbp',
			config
		);
		const coin2 = res2.data.ticker;
		coinDetails.innerText = `${coin2.base} -> ${coin2.target} = ${coin2.price}`;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

const getAda = async () => {
	try {
		const res3 = await axios.get(
			'https://api.cryptonator.com/api/ticker/ada-gbp',
			config
		);
		const coin3 = res3.data.ticker;
		coinDetails.innerText = `${coin3.base} -> ${coin3.target} = ${coin3.price}`;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

btcBtn.addEventListener('click', getBtc);
ethBtn.addEventListener('click', getEth);
adaBtn.addEventListener('click', getAda);

/* MapBox */

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container : 'map', // container ID
	style     : 'mapbox://styles/mapbox/satellite-v9', // style URL
	center    : lngLat, // starting position [lng, lat]
	zoom      : 9 // starting zoom
});

new mapboxgl.Marker()
	.setLngLat(lngLat)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<h3>Your Home?</h3><p>Don't worry this isn't stored in a DB</p>`
		)
	)
	.addTo(map);

// Below is for the map style switching
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

function switchLayer (layer) {
	const layerId = layer.target.id; // id of the input clicked
	map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (let i = 0; i < inputs.length; i++) {
	inputs[i].onclick = switchLayer;
}

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');
