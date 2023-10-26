// import Vibrant from 'node-vibrant';

const blocksButton = document.getElementById("blocksButton");
const audioFileLoader = document.createElement("input");
const audioPlayer = document.querySelector(".audio-player");
const musicPlayer = document.getElementById("musicPlayer");
const coverArt = document.getElementById("coverArt");

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
        
        jsmediatags.read(selectedAudioFile, {
            onSuccess: function(tag)
            {
                if (tag.tags.artist && tag.tags.title && tag.tags.album)
                {
                    const artist = tag.tags.artist;
                    const track = tag.tags.title;
                    const album = tag.tags.album;

                    trackDetails(artist, track, album);

                    if (tag.tags.picture)
                    {
                        const pic = tag.tags.picture;
                        const base64String = btoa(String.fromCharCode.apply(null, pic.data));
                        const coverArtURL = `data:${pic.format};base64,${base64String}`;

                        coverArt.src = coverArtURL;
                    }
                    else
                    {
                        coverArt.src = "public/default.jpg"; //doesn't work to set to default image
                    }

                    const sections = document.querySelectorAll("section");
                    const colorThief = new ColorThief();

                    coverArt.onload = function ()
                    {
                        const colorPalette = colorThief.getPalette(coverArt, 12);
                        console.log(colorPalette);

                        sections.forEach((section, index) => 
                        {
                            const color1 = colorPalette[2 * index];
                            const color2 = colorPalette[2 * index + 1];
                            section.style.background = `linear-gradient(75deg, rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.4))`;
                        });

                        const body = document.querySelector(".container");
                        body.style.background = `linear-gradient(75deg, rgb(${colorPalette[0][0]}, ${colorPalette[0][1]}, ${colorPalette[0][2]}), rgb(${colorPalette[5][0]}, ${colorPalette[5][1]}, ${colorPalette[5][2]})`;
                    };


                }
                else
                {
                    console.log("Metadata retrieval failed!");
                }
            },
            onError: function(error)
            {
                console.error("Error in reading metadata:", error,type, error.info);
            }
        });
    }
});

function trackDetails(artist, track, album)
{
    const artistName = document.getElementById("artistName");
    const trackTitle = document.getElementById("trackTitle");
    const albumTitle = document.getElementById("albumTitle");

    artistName.textContent = `${artist.toUpperCase()}`;
    trackTitle.textContent = `${track.toUpperCase()}`;
    albumTitle.textContent = `${album.toUpperCase()}`;
}