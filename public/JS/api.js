/* Dad jokes */
const dadList = document.querySelector('#dadList');
const dadBtn = document.querySelector('#dadBtn');

const getDadJoke = async () => {
	try {
		const config = { headers: { accept: 'application/json' } };
		const res = await axios.get('https://icanhazdadjoke.com/', config);
		return res.data.joke;
	} catch (e) {
		return 'NO JOKES AVAILABLE! SORRY :(';
	}
};

const addDadJoke = async () => {
	dadBtn.disabled = true;
	setTimeout(() => (dadBtn.disabled = false), 1100);
	const jokeText = await getDadJoke();
	const newLi = document.createElement('LI');
	newLi.append(jokeText);
	dadList.prepend(newLi);
	if (dadList.children.length == 5) {
		delJk = dadList.children[4];
		delJk.classList.add('hidden');
		setTimeout(() => {
			delJk.remove();
		}, 1000);
	}
};

dadBtn.addEventListener('click', addDadJoke);

/* Geeky Jokes */

const geekList = document.querySelector('#geekList');
const geekBtn = document.querySelector('#geekBtn');

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

const addGeekJoke = async () => {
	geekBtn.disabled = true;
	setTimeout(() => (geekBtn.disabled = false), 1100);
	const jokeText = await getGeekJoke();
	const newLi = document.createElement('LI');
	newLi.append(jokeText);
	geekList.prepend(newLi);
	if (geekList.children.length == 5) {
		delJk = geekList.children[4];
		console.log(delJk);
		delJk.classList.add('hidden');
		setTimeout(() => {
			delJk.remove();
		}, 1000);
	}
};

geekBtn.addEventListener('click', addGeekJoke);

// ---------------------------------------------------------------------

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
	zoom      : 4 // starting zoom
});

new mapboxgl.Marker()
	.setLngLat(lngLat)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<h3>Your Home?</h3><p>Defaults to: lng: -0.5, lat: 52.0. Don't worry this isn't stored in the database.</p>`
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
