const blocksButton = document.getElementById("blocksButton");
const audioFileLoader = document.createElement("input");
const audioPlayer = document.getElementById("audioPlayer");
audioFileLoader.type = "file";
audioFileLoader.accept = ".mp3 , .wav";

blocksButton.addEventListener("click", function() 
{
    audioFileLoader.click();
})

audioFileLoader.addEventListener("change", function()
{
    blocksButton.style.display = "none";
    audioPlayer.classList.remove("hidden");
    if (audioFileLoader.files.length > 0)
    {
        const selectedAudioFile = audioFileLoader.files[0];
        const audioURL = URL.createObjectURL(selectedAudioFile);
        audioPlayer.src = audioURL;
        if (selectedAudioFile)
        {
            console.log("Audio file selected: ", selectedAudioFile.name);

        }
    }
})
