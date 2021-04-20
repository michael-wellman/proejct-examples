//CONSTS - AUDIO
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//MUSIC
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Jacinto Design'
    }
]

//CHECK IF PLAYING
let isPlaying = false;

//PLAY
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//PAUSE
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//EVENT LISTENER 
//PLAY OR PAUSE EVENT LISTENER
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// UPDATE DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//CURRENT SONG
let song = songIndex = 0;

//PREV SONG
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//NEXT SONG
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//UPDATE PROGRESS BAR
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } =e.srcElement;
        // UPDATE PROGRESS BAR WIDTH
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // CAL DISPLAY OF DURATION
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        //DELAY SWITCHING DURATIN ELEMENT TO AVOID NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
        }

        // CAL DISPLAY OF CURRENT TIME
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// SET PROGRESS BAR
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    console.log(music.duration);
    music.currentTime = (clickX / width) * duration;
}



//ON LOAD - SELECT FIRST SONG
loadSong(songs[songIndex]);

// EVENT LISTENER
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);