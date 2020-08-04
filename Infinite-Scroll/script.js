// CONST
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//Check if all images loaded
function imageLoaded() {
	console.log('image loaded');
	console.log(imagesLoaded);
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		console.log('ready = ', ready);
	}
}

//Create Elements for Links and Photos and add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log('total images ' + totalImages);
	//Run Function to each OBJ
	photosArray.forEach((photo) => {
		//create an <a> element</a>
		const item = document.createElement('a');
		// item.setAttribute('href', photo.links.html);
		// item.setAttribute('target', '_blank');
		setAttributes(item, { href: photo.links.html, target: '_blank' });

		//create <img> for photo
		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// img.setAttribute('alt', photo.alt_description);
		// img.setAttribute('title', photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});

		// Event Listener, check when each is finished loading:
		img.addEventListener('load', imageLoaded);

		//put <img> inside the Anchor, then both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

//Unsplash API
const count = 30;
const apiKey = 'Q1IkrTNZOpRHhI-njq2BQoKh7peyKsrt7ycyhRQ46fM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos From Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		// Call Function to display Photos
		displayPhotos();
		console.log(photosArray);
	} catch (error) {
		//Catch Error Here
	}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

//On Load
getPhotos();
