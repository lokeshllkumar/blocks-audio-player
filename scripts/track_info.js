window.addEventListener('load', function() {
    const adjustSpanHeight = function(span) {
        const lineHeight = parseFloat(window.getComputedStyle(span).lineHeight);
        const spanHeight = span.offsetHeight;
        const numberOfLines = Math.ceil(spanHeight / lineHeight);
        
        if (numberOfLines > 1) {
            span.style.height = `${lineHeight * numberOfLines}px`;
        }
    }

    const artistName = document.getElementById("artistName");
    const trackTitle = document.getElementById("trackTitle");
    const albumTitle = document.getElementById("albumTitle");

    adjustSpanHeight(artistName);
    adjustSpanHeight(trackTitle);
    adjustSpanHeight(albumTitle);
});
