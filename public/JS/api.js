/* Dad jokes */
const jokes1 = document.querySelector('#jokes1');
const button1 = document.querySelector('#jokeBtn1');

const addDadJoke = async () => {
    const jokeText = await getDadJoke();
    const newLI = document.createElement('LI');
    newLI.append(jokeText);
    jokes1.append(newLI)
}

const getDadJoke = async () => {
    try {
        const config = { headers: { accept: 'application/json' } } 
        const res = await axios.get('https://icanhazdadjoke.com/', config)
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }

}

button1.addEventListener('click', addDadJoke)

/* Geeky Jokes */

const jokes2 = document.querySelector('#jokes2');
const button2 = document.querySelector('#jokeBtn2');

const addGeekJoke = async () => {
    const jokeText = await getGeekJoke();
    const newLI = document.createElement('LI');
    newLI.append(jokeText);
    jokes2.append(newLI)
}

const getGeekJoke = async () => {
    try {
        const config = { headers: { accept: 'application/json' } } 
        const res = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json', config)
        return res.data.joke;
    } catch (e) {
        return "NO JOKES AVAILABLE! SORRY :("
    }

}

button2.addEventListener('click', addGeekJoke)


const button3 = document.querySelector('#jokeBtn3');

const getCoins = async () => {
  try {
    const config = { headers: { accept: 'application/json' } } ;
    const res1 = await axios.get('https://api.cryptonator.com/api/ticker/btc-gbp', config);
    console.log(res1)
    const showCoin1 = document.createElement("h1");
    const slide1 = document.querySelector("#coin1");
    const coin1 = res1.data.ticker; 
    showCoin1.append(`${coin1.base} -> ${coin1.target} = ${coin1.price}`);
    slide1.append(showCoin1)
    console.log(showCoin1)
    const res2 = await axios.get('https://api.cryptonator.com/api/ticker/eth-gbp', config);
    const showCoin2 = document.createElement("h1");
    const slide2 = document.querySelector("#coin2");
    const coin2 = res2.data.ticker; 
    showCoin2.append(`${coin2.base} -> ${coin2.target} = ${coin2.price}`);
    slide2.append(showCoin2)
    const res3 = await axios.get('https://api.cryptonator.com/api/ticker/ada-gbp', config);
    const showCoin3 = document.createElement("h1");
    const slide3 = document.querySelector("#coin3");
    const coin3 = res3.data.ticker; 
    showCoin3.append(`${coin3.base} -> ${coin3.target} = ${coin3.price}`);
    slide3.append(showCoin3)
    
  } catch (e) {
      return "NO JOKES AVAILABLE! SORRY :("
  }

}

button3.addEventListener('click', getCoins)

      // https://api.fbi.gov/wanted/v1/list
