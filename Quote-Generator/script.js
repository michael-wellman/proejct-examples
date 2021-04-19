// Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loadSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Async Get Quote from API
async function getQuote() {
	loadSpinner();

	//const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		//If author is blank - add 'Unknown'
		if(data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;	
		}
		
		// Reduce font size for long quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;

		// Stop Loader and Show Quote
		removeSpinner();

	} catch (error) {
		console.log('whoops, no quote', error);
	}
}

// Twitter Function
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
