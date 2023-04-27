function menuPage() {
    main.innerHTML = `
        <div id="menu">
        <div class="headerMenu">
            <div class="lightningMenu"></div>
            <h1 class="titleMenu">Menu</h1>
            <div></div>
        </div>
        
        <a href="#" class="listMenu housesMenu">Houses</a>
        <a href="#" class="listMenu filmsMenu">Films</a>
        <a href="#" class="listMenu charactersMenu">Characters</a>
        <a href="#" class="listMenu infoMenu">Info</a>

        <div class="changeHouses">
            <p class="changeHousesHeader">Change Houses</p>
            <div class="allHouses">
                <div class="changeAllHouses changeHousesGryffindor"></div>
                <div class="changeAllHouses changeHousesSlytherin"></div>
                <div class="changeAllHouses changeHousesRavenclaw"></div>
                <div class="changeAllHouses changeHousesHufflepuff"></div>
            </div>
        </div>
        <script src="menu.js"></script>
    </div>
    `;
}