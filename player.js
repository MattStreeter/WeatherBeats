const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

songIndex = 0;
songs = ['./assets/music/Clear/Believe.wav',
         './assets/music/Clear/Kokiri Forest.wav',
         './assets/music/Clear/Kokiri Forest.wav',
         './assets/music/Cloudy/Covenant.wav',
         './assets/music/Cloudy/Midnight.wav',
         './assets/music/Cloudy/Ripple.wav',
         './assets/music/Foggy/Bloodlust.wav',
         './assets/music/Foggy/Eclipse.wav',
         './assets/music/Foggy/Moon.wav',
         './assets/music/Heavy Rain/Prayer.wav',
         './assets/music/Heavy Rain/Slumped.wav',
         './assets/music/Heavy Rain/Rain.wav',
         './assets/music/Light Rain/Days.wav',
         './assets/music/Light Rain/Kingdom of Hearts.mp3',
         './assets/music/Light Rain/SkyTree.wav',
         './assets/music/Snowy/Jimmy Neutron.wav',
         './assets/music/Snowy/Left On Read.mp3',
         './assets/music/Snowy/New World.wav',
         "./assets/music/Thunderstorms/Majora's Mask.wav",
         './assets/music/Thunderstorms/Nah!!!.wav',
         './assets/music/Thunderstorms/Yikes!.wav'
       ]; // object storing paths for audio objects

thumbnails = ['./assets/images/Clear/clearsky.jpg',
              './assets/images/Cloudy/cloudy.jpg',
              './assets/images/Foggy/fog.jpg',
              './assets/images/Heavy Rain/heavyrain.jpg',
              './assets/images/Light Rain/lightrain.jpg',
              './assets/images/Snowy/snow.jpg',
              './assets/images/Thunderstorms/thunder.jpg']; // object storing paths for album covers and backgrounds

songArtists = ['H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI',
               'H1 DJINNOBI'
                ]; // object storing track artists

songTitles = ["Believe",
              "Kokiri Forest",
              "Sunshine",
              "Covenant",
              "Midnight",
              "Ripple",
              "Bloodlust",
              "Eclipse",
              "Moon",
              "Prayer",
              "Rain",
              "Slumped",
              "Days",
              "Kingdom of Hearts",
              "SkyTree",
              "Jimmy Neutron",
              "Left On Read",
              "New World",
              "Majora's Mask",
              "Nah!!!",
              "Yikes!"]; // object storing track titles

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track
function nextSong() {
    songIndex++;
    if (songIndex > 21) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 21;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};
