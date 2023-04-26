document.querySelector(".charactersMenu").addEventListener("click", goToCharacters);
document.querySelector(".housesMenu").addEventListener("click", goToHouses);
document.querySelector(".filmsMenu").addEventListener("click", goToFilms);
document.querySelector(".infoMenu").addEventListener("click", goToInfo);
document.querySelector(".changeHousesGryffindor").addEventListener("click", changeHousesGryffindor);
document.querySelector(".changeHousesSlytherin").addEventListener("click", changeHousesSlytherin);
document.querySelector(".changeHousesRavenclaw").addEventListener("click", changeHousesRavenclaw);
document.querySelector(".changeHousesHufflepuff").addEventListener("click", changeHousesHufflepuff);
console.log("Hello");


function goToHouses () {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("").style.display = "block";
}

function goToFilms () {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("").style.display = "block";
}

function goToCharacters () {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("").style.display = "block";
}

function goToInfo () {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("").style.display = "block";
}

function changeHousesGryffindor () {
    document.querySelector("#menu").style.backgroundColor = "#a61d1d";
}

function changeHousesSlytherin () {
    document.querySelector("#menu").style.backgroundColor = "#37671c";
}
function changeHousesRavenclaw () {
    document.querySelector("#menu").style.backgroundColor = "#1c4b67";
}
function changeHousesHufflepuff () {
    document.querySelector("#menu").style.backgroundColor = "#d6ce24";
}