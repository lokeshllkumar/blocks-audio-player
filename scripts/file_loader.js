const blocksButton = document.getElementById("blocksButton");
const audioFileLoader = document.createElement("input");
const audioPlayer = document.querySelector(".audio-player");
const musicPlayer = document.getElementById("musicPlayer");
const coverArt = document.getElementById("coverArt");

audioPlayer.style.display = "none";
audioFileLoader.type = "file";
audioFileLoader.accept = ".mp3 , .wav";

let isPlaying = true;
let curSong;

blocksButton.addEventListener("click", function() 
{
    audioFileLoader.click();
});

audioFileLoader.addEventListener("change", function()
{
    blocksButton.style.display = "none";
    audioPlayer.style.display = "block";
    if (audioFileLoader.files.length > 0)
    {
        curSong = audioFileLoader.files[0];
        musicPlayer.src = URL.createObjectURL(curSong);
        metadataRetrieval(curSong);
    }
});

function trackDetails(artist, track, album)
{
    let artistName = document.getElementById("artistName");
    let trackTitle = document.getElementById("trackTitle");
    let albumTitle = document.getElementById("albumTitle");

    artistName.textContent = `${artist.toUpperCase()}`;
    trackTitle.textContent = `${track.toUpperCase()}`;
    albumTitle.textContent = `${album.toUpperCase()}`;
}

const sections = document.querySelectorAll("section");
const colorThief = new ColorThief();

coverArt.onload = function ()
{
    const colorPalette = colorThief.getPalette(coverArt, 12);
    sections.forEach((section, index) => 
    {
        const color1 = colorPalette[2 * index];
        const color2 = colorPalette[2 * index + 1];
        section.style.background = `linear-gradient(75deg, rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.4))`;
    });

    const body = document.querySelector(".container");
    body.style.background = `linear-gradient(75deg, rgb(${colorPalette[0][0]}, ${colorPalette[0][1]}, ${colorPalette[0][2]}), rgb(${colorPalette[5][0]}, ${colorPalette[5][1]}, ${colorPalette[5][2]})`;
};

const playButton = document.getElementById('playButton');
const backwardButton = document.getElementById('backwardButton');
const forwardButton = document.getElementById('forwardButton');

const songQueue = [];

const filePicker = document.getElementById("filePicker");
const addToQueueButton = document.getElementById("queueButton");
let selectedFiles;

addToQueueButton.addEventListener("click", () => {
    filePicker.click();
});

filePicker.addEventListener("change", (event) => {
    selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++)
    {
        const file = selectedFiles[i];
        addToQueue(file);
    }

    if(!isPlaying)
    {
        playNextInQueue();
    }
});

function addToQueue(audioFile)
{
    const newTrack = {
        audio: audioFile,
        title: audioFile.name
    };
    console.log(newTrack.title);

    songQueue.push(newTrack);
}

function playNextInQueue()
{
    if (songQueue.length > 0)
    {
        curSong = songQueue.shift();
        musicPlayer.src = URL.createObjectURL(curSong.audio);
        musicPlayer.play();
        isPlaying = true;
        metadataRetrieval(curSong.audio);
    }
}

//an object for #audioPlayer is already present in file_loader.js

playButton.addEventListener('click', () => 
{
    if (musicPlayer.paused)
    {
        musicPlayer.play();
        playButton.textContent = 'II';
        isPlaying = true;
    }
    else
    {
        musicPlayer.pause();
        playButton.textContent = 'I>';
        isPlaying = false;
    }
});

backwardButton.addEventListener('click', () => 
{
    if (!musicPlayer.paused && !musicPlayer.ended)
    {
        musicPlayer.currentTime = 0;
    }
});

forwardButton.addEventListener('click', () => 
{
    playButton.textContent = 'II';
    playNextInQueue();
});

musicPlayer.addEventListener('ended', () =>
{
    playButton.textContent = 'I>';
    console.log("hello");
    playNextInQueue();
});

musicPlayer.addEventListener('timeupdate', () =>
{

    const elapsedTime = document.querySelector('.elapsed-time');

    const elapsedTimeMins = Math.floor(musicPlayer.currentTime / 60);
    const elapsedTimeSecs = Math.floor(musicPlayer.currentTime % 60);

    elapsedTime.textContent = `${elapsedTimeMins}:${elapsedTimeSecs < 10 ? '0' : ''}${elapsedTimeSecs}`;

    const totalTime = document.querySelector('.total-time');

    const totalTimeMins = Math.floor(musicPlayer.duration / 60);
    const totalTimeSecs = Math.floor(musicPlayer.duration % 60);
    
    totalTime.textContent = `${totalTimeMins}:${totalTimeSecs < 10 ? '0' : ''}${totalTimeSecs}`;
});

function metadataRetrieval(selectedAudioFile)
{
    jsmediatags.read(selectedAudioFile,{
        onSuccess: function(tag)
        {
            if (tag.tags.artist && tag.tags.title && tag.tags.album)
            {
                let artist = tag.tags.artist;
                let track = tag.tags.title;
                let album = tag.tags.album;

                trackDetails(artist, track, album);

                if (tag.tags.picture)
                {
                    let pic = tag.tags.picture;
                    let base64String = btoa(String.fromCharCode.apply(null, pic.data));
                    let coverArtURL = `data:${pic.format};base64,${base64String}`;

                    coverArt.src = coverArtURL;
                }
                console.log("metadata updation successful!");
            }
            else
            {
                console.log("Metadata retrieval failed!");
            }
        },
        onError: function(error)
        {
            console.error("Error in reading metadata:", error.type, error.info);
        }
    });
}