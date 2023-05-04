async function menuPage() {

    nav.innerHTML = `
        <button id="lightningMenu"></button>
        <h2 class="titleMenu">Menu</h2>
        <button id="logout">Logout</button>
    `;

    let logoutBtn = nav.querySelector("#logout");
    logoutBtn.addEventListener("click", logout);

    let menuBtn = nav.querySelector("#lightningMenu");
    menuBtn.addEventListener("click", toggleMenuPage);

    main.innerHTML = `
        <div id="menu">
            <div class="listMenu"><button class=btnStyle id=houseBtn>HOUSE</button></div>
            <div class="listMenu"><button class=btnStyle id=characterBtn>CHARACTERS</button></div>
            <div class="listMenu"><button class=btnStyle id=movieBtn>MOVIES</button></div>  
            <div class="listMenu"><button class=btnStyle id=infoBtn>INFO</button></div>

            <div class="changeHouses">
                <p class="changeHousesHeader">Change Houses</p>
                <div class="allHouses">
                    <button id="gryffindor"></button>
                    <button id="slytherin"></button>
                    <button id="ravenclaw"></button>
                    <button id="hufflepuff"></button>
                </div>
            </div>
        </div>
    `;

    let houseBtn = main.querySelector("#houseBtn");
    houseBtn.addEventListener("click", housePage);

    let movieBtn = main.querySelector("#movieBtn");
    movieBtn.addEventListener("click", moviePage);

    let characterBtn = main.querySelector("#characterBtn");
    characterBtn.addEventListener("click", characterPage);

    let selectedHouse = null;

     // GET HOUSES DATA
     try {
        let response = await fetch("api/houses.php");
        let data = await response.json();
        
        // CHANGE BACKGROUND COLOR BASED ON HOUSE BUTTON CLICKED
        let gryffindorBtn = main.querySelector("#gryffindor");
        let slytherinBtn = main.querySelector("#slytherin");
        let ravenclawBtn = main.querySelector("#ravenclaw");
        let hufflepuffBtn = main.querySelector("#hufflepuff");

        function setHouseColor(houseName) {
            let houseColor = data.find(house => house.name === houseName)["color"];
            document.querySelector("#menu").style.backgroundColor = houseColor;
        }
    
        gryffindorBtn.addEventListener("click", () => {
            setHouseColor("Gryffindor");
        });
    
        slytherinBtn.addEventListener("click", () => {
            setHouseColor("Slytherin");
        });
    
        ravenclawBtn.addEventListener("click", () => {
            setHouseColor("Ravenclaw");
        });
    
        hufflepuffBtn.addEventListener("click", () => {
            setHouseColor("Hufflepuff");
        });

    } catch (error) {
        console.error("Failed to fetch", error);
    }

}
