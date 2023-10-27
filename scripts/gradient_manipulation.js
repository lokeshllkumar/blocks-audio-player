const coverArtImg = document.getElementById("coverArt");
const sections = document.querySelectorAll("section");
const colorThief = new ColorThief();

coverArtImg.onload = function ()
{
    const colorPalette = colorThief.getPalette(coverArtImg, 12);
    sections.forEach((section, index) => 
    {
        const color1 = colorPalette[2 * index];
        const color2 = colorPalette[2 * index + 1];
        section.style.background = `linear-gradient(75deg, rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.4))`;
    });

    const body = document.querySelector(".container");
    body.style.background = `linear-gradient(75deg, rgb(${colorPalette[0][0]}, ${colorPalette[0][1]}, ${colorPalette[0][2]}), rgb(${colorPalette[5][0]}, ${colorPalette[5][1]}, ${colorPalette[5][2]})`;
};