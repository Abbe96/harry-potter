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
            <div class="listMenu"><button id=characterBtn>CHARACTERS</button></div>
            <div class="listMenu"><button id=movieBtn>MOVIES</button></div>  
            <div class="listMenu"><button id=infoBtn>INFO</button></div>

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

     // GET HOUSES DATA
     try {
        let response = await fetch("api/houses.php");
        let data = await response.json();
        
        // CHANGE BACKGROUND COLOR BASED ON HOUSE BUTTON CLICKED
        let gryffindorBtn = main.querySelector("#gryffindor");
        let slytherinBtn = main.querySelector("#slytherin");
        let ravenclawBtn = main.querySelector("#ravenclaw");
        let hufflepuffBtn = main.querySelector("#hufflepuff");

        gryffindorBtn.addEventListener("click", () => {
            document.querySelector("#menu").style.backgroundColor = data.find(house => house.name === "Gryffindor")["color"];
        });

        slytherinBtn.addEventListener("click", () => {
            document.querySelector("#menu").style.backgroundColor = data.find(house => house.name === "Slytherin")["color"];
        });

        ravenclawBtn.addEventListener("click", () => {
            document.querySelector("#menu").style.backgroundColor = data.find(house => house.name === "Ravenclaw")["color"];
        });

        hufflepuffBtn.addEventListener("click", () => {
            document.querySelector("#menu").style.backgroundColor = data.find(house => house.name === "Hufflepuff")["color"];
        });

    } catch (error) {
        console.error("Failed to fetch", error);
    }

}
