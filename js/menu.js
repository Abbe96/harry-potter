async function menuPage() {

    nav.innerHTML = `
        <button id="lightningMenu"></button>
        <h2 class="titleMenu">Menu</h2>
        <button id="logout">Logout</button>
    `;

    let logoutBtn = nav.querySelector("#logout");
    logoutBtn.addEventListener("click", logout);

    let menuBtn = nav.querySelector("#lightningMenu");
    menuBtn.addEventListener("click", homePage);

    main.innerHTML = `
        <div id="menu">
            <div class="listMenu"><button id=houseBtn>HOUSE</button></div>
            <div class="listMenu"> <button id=characterBtn>CHARACTERS</button></div>
            <div class="listMenu"><button id=filmBtn>FILMS</button></div>  
            <div class="listMenu"><button id=infoBtn>INFO</button></div>

            <div class="changeHouses">
                <p class="changeHousesHeader">Change Houses</p>
                <div class="allHouses">
                    <div class="changeAllHouses changeHousesGryffindor"></div>
                    <div class="changeAllHouses changeHousesSlytherin"></div>
                    <div class="changeAllHouses changeHousesRavenclaw"></div>
                    <div class="changeAllHouses changeHousesHufflepuff"></div>
                </div>
            </div>
        </div>
    `;

    let houseBtn = main.querySelector("#houseBtn");
    houseBtn.addEventListener("click", housePage);
    
    document.querySelector(".changeHousesGryffindor").addEventListener("click", changeHousesGryffindor);
    document.querySelector(".changeHousesSlytherin").addEventListener("click", changeHousesSlytherin);
    document.querySelector(".changeHousesRavenclaw").addEventListener("click", changeHousesRavenclaw);
    document.querySelector(".changeHousesHufflepuff").addEventListener("click", changeHousesHufflepuff);

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
}

