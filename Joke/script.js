// VoiceRSS Javascript SDK
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
	console.log('tell me:', joke);

	VoiceRSS.speech({
		key: '75811966d4af44c7be876265c7901f1b',
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = '';
	const apiUrl =
		'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (data.setup) {
			joke = `${data.setup} ...${data.delivery}`;
		} else {
			joke = data.joke;
		}
		//Text-to-speech
		tellMe(joke);

		//Disable Button
		toggleButton();
	} catch (error) {
		// Catch Errors
		console.log('Whoops:', error);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
