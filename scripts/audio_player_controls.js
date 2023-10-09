const playButton = document.getElementById('playButton');
const backwardButton = document.getElementById('backwardButton');
const forwardButton = document.getElementById('forwardButton');
const loopButton = document.getElementById('loopButton');

const musicPlayer1 = document.getElementById('musicPlayer');

let loopStatus = false;

//an object for #audioPlayer is already present in file_loader.js

playButton.addEventListener('click', () => 
{
    if (musicPlayer1.paused)
    {
        musicPlayer1.play();
        playButton.textContent = 'II';
    }
    else
    {
        musicPlayer1.pause();
        playButton.textContent = 'I>';
    }
});

backwardButton.addEventListener('click', () => 
{
    if (!musicPlayer1.paused && !musicPlayer1.ended)
    {
        musicPlayer1.currentTime = 0;
    }
});

loopButton.addEventListener('click', () => 
{
    loopStatus = !loopStatus;

    if (loopStatus)
    {
        loopButton.classList.add('loop-active');
    }
    else
    {
        loopButton.classList.remove('loop-active');
    }
});

musicPlayer1.addEventListener('ended', () =>
{
    playButton.textContent = 'I>';
});

musicPlayer1.addEventListener('timeupdate', () =>
{

    const elapsedTime = document.querySelector('.elapsed-time');

    const elapsedTimeMins = Math.floor(musicPlayer1.currentTime / 60);
    const elapsedTimeSecs = Math.floor(musicPlayer1.currentTime % 60);

    elapsedTime.textContent = `${elapsedTimeMins}:${elapsedTimeSecs < 10 ? '0' : ''}${elapsedTimeSecs}`;

    const totalTime = document.querySelector('.total-time');

    const totalTimeMins = Math.floor(musicPlayer1.duration / 60);
    const totalTimeSecs = Math.floor(musicPlayer1.duration % 60);
    
    totalTime.textContent = `${totalTimeMins}:${totalTimeSecs < 10 ? '0' : ''}${totalTimeSecs}`;
});

// must add functionality for the forward and shuffle buttons