const blocksButton = document.getElementById("blocksButton");
const audioFileLoader = document.createElement("input");
const audioPlayer = document.querySelector(".audio-player");
const musicPlayer = document.getElementById("musicPlayer");

audioPlayer.style.display = "none";
audioFileLoader.type = "file";
audioFileLoader.accept = ".mp3 , .wav";

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
        const selectedAudioFile = audioFileLoader.files[0];
        const audioURL = URL.createObjectURL(selectedAudioFile);
        musicPlayer.src = audioURL;
        if (selectedAudioFile)
        {
            console.log("Audio file selected: ", selectedAudioFile.name);

        }
    }
})