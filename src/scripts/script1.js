const blocksButton = document.getElementById("blocksButton");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

blocksButton.addEventListener("click", function() {
    blocksButton.style.display= "none";
    searchBar.classList.remove("hidden");

    setTimeout(function() {
        centerButton.style.display = "none";
        searchBar.style.display = "block";
        searchButton.style.display = "block";
    }, 300);
});
