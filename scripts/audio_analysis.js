document.addEventListener("DOMContentLoaded", function()
{
    const audioPlayer = document.getElementById("audioPlayer");
    const gradientContainer = document.querySelector(".container");

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);  

    analyser.fftSize = 256;
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    let prevVol = 0;
    let colorChangeThreshold = 20;

    function updateColorGradient()
    {
        analyser.getByteFrequencyData(frequencyData);

        let sum = 0;
        for (let i = 50; i < 100; i++)
        {
            sum += frequencyData[i];
        }

        const curVol = sum / 50;

        if (curVol - prevVol > colorChangeThreshold)
        {
            const red = frequencyData[0];
            const green = frequencyData[100];
            const blue = frequencyData[200];

            const gradient = `linear-gradient(75deg, rgb(${red}, ${green}, ${blue}), rgb(${blue}, ${red}, ${green}))`;
            gradientContainer.computedStyleMap.backgroundColor = gradient;
        }

        prevVol = curVol;
        requestAnimationFrame(updateColorGradient);
    }

    audioPlayer.play();
    updateColorGradient();
});