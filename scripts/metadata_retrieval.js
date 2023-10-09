musicPlayer.addEventListener('loadedmetadata', () => 
{
    const artist = musicPlayer.getAttribute('artist');
    const title = musicPlayer.getAttribute('title');
    const album = musicPlayer.getAttribute('album');

    return(artist, title, album);
});