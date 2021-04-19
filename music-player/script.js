const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// BOOLEAN TO CHECK IF PLAYING
let isPlaying = false;

// PLAY
function playSong() {
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaying = true;
}

// PAUSE
function pauseSong() {
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    isPlaying = false;
}

//PLAY OR PAUSE EVENT LISTENER
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong()
});

