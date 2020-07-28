const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loading.hidden) {
		quoteContainer.hidden = false;
		loading.hidden = true;
	}
}

// ASYNC FETCH Get Quote from API
async function getQuote() {
	showLoadingSpinner();

	const proxy = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxy + apiUrl);
		const data = await response.json();

		//If Author is blank - we are setting it as UNKNOWN
		if (data.quoteAuthor === '') {
			authorText.innerText = 'UNKNOWN';
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		if (data.quoteText.length > 50) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;

		//Stop Loader, Show Quote
		removeLoadingSpinner();
	} catch (error) {
		let counter = 0;

		if (counter < 10) {
			counter = counter + 1;
			getQuote();
		} else {
			console.log('whoops, 10th time and no quote', error);
		}
	}
}

//Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

	window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();
