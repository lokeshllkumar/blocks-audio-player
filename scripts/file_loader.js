import Vibrant from 'node-vibrant';

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
                        coverArt.src = "public/prih.jpg";
                    }
                }
                else
                {
                    console.log("Metadata retrieval failed!");
                }

                backgroundUpdate();
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

function backgroundUpdate()
{
    Vibrant.from(coverArt.src).getPalette((err, palette) => 
    {
        if (err)
        {
            console.log(err);
            return;
        }

        const up = document.getElementById('up');
        const up1 = document.getElementById('up-1');
        const down = document.getElementById('down');
        const left = document.getElementById('left');
        const left1 = document.getElementById('left-1');
        const right = document.getElementById('right');

        up.style.backgroundImage = `linear-gradient(75deg, ${palette.LightVibrant.getHex()}, ${palette.Vibrant.getHex()})`;
        up1.style.backgroundImage = `linear-gradient(75deg, ${palette.Muted.getHex()}, ${palette.DarkMuted.getHex()})`;
        down.style.backgroundImage = `linear-gradient(75deg, ${palette.LightMuted.getHex()}, ${palette.Vibrant.getHex()})`;
        left.style.backgroundImage = `linear-gradient(75deg, ${palette.DarkMuted.getHex()}, ${palette.Vibrant.getHex()})`;
        left1.style.backgroundImage = `linear-gradient(75deg, ${palette.LightMuted.getHex()}, ${palette.Muted.getHex()})`;
        right.style.backgroundImage = `linear-gradient(75deg, ${palette.Vibrant.getHex()}, ${palette.DarkVibrant.getHex()})`;
    });
}