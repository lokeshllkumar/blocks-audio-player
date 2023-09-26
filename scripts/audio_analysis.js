const player = document.getElementById('audioPlayer');

const rightElement = document.getElementById('right');
const leftElement = document.getElementById('left');
const leftElement1 = document.getElementById('left-1');
const upElement = document.getElementById('up');
const upElement1 = document.getElementById('up-1');
const downElement = document.getElementById('down');

let audioContext;

let analyser;
const FFTSize = 2048;

const minFrequency = 100; //100Hz
const maxFrequency = 900; //900Hz

function initAudio()
{
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.minDecibels = -100;
    analyser.maxDecibels = 0;
    analyser.fftSize = FFTSize;

    const sampleRate = audioContext.sampleRate;
    const binFrequency = sampleRate / FFTSize;
    const minBin = Math.floor(minFrequency / binFrequency);
    const maxBin = Math.floor(maxFrequency / binFrequency);

    const audioSource = audioContext.createMediaElementSource(player);
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    player.play();

    changeRightSectionColor(minBin, maxBin);
}

function changeRightSectionColor(minBin, maxBin)
{
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const loudnessThreshold = 50;
    const averageAmplitude = dataArray.slice(minBin, maxBin + 1).reduce((acc, value) => acc + value, 0) / dataArray.length;

    if (averageAmplitude > loudnessThreshold)
    {
        console.log('threshold crossed');
        rightElement.style.backgroundImage = `linear-gradient(75deg, rgb(0, 0, 0), rgb(0, 0, 0))`;
    }
    else
    {
        console.log('threshold not crossed');
        rightElement.style.backgroundImage = 'linear-gradient(75deg, rgb(208, 187, 28), rgb(99, 165, 144))';
    }


    requestAnimationFrame(changeRightSectionColor);
}

initAudio();