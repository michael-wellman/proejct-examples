const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//Promp the use to select a media stream, pass that to our video element and then play
async function selectMediaStream() {
	//TRY CATCH STATEMENT
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};
	} catch (error) {
		console.log('whoops, error here', error);
	}
}

button.addEventListener('click', async () => {
	//DISABLE BUTTON WHEN CLICKES
	button.disabled = true;

	//START PIC IN PIC
	await videoElement.requestPictureInPicture();

	//RESET BUTTON
	button.disabled = false;
});

//onLoad
selectMediaStream();
