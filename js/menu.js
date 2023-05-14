async function menuPage() {

    const user = JSON.parse(localStorage.getItem("user"));

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
            <div class="listMenu"><button id=houseBtn class=allBtn>Houses</button></div>
            <div class="listMenu"><button id=characterBtn class=allBtn>Characters</button></div>
            <div class="listMenu"><button id=movieBtn class=allBtn>Movies</button></div>  
            <div class="listMenu"><button id=infoBtn class=allBtn>Info</button></div>

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

    let infoBtn = main.querySelector("#infoBtn");
    infoBtn.addEventListener("click", infoPage);

     // GET HOUSES DATA
     try {
        let response = await fetch("api/houses.php");
        let data = await response.json();
        
        // CHANGE BACKGROUND COLOR BASED ON HOUSE BUTTON CLICKED
        let gryffindorBtn = main.querySelector("#gryffindor");
        let slytherinBtn = main.querySelector("#slytherin");
        let ravenclawBtn = main.querySelector("#ravenclaw");
        let hufflepuffBtn = main.querySelector("#hufflepuff");

        function setHouseBackground(houseName) {
            let houseBackground = data.find(house => house.name === houseName)["background"];
            document.querySelector("#menu").style.backgroundImage = `url(${houseBackground})`;
        }

        async function sendHouseToServer(houseName) {
            try {
                let response = await fetch("api/updateUserHouse.php", {
                    method: "POST",
                    body: JSON.stringify({house: houseName, user: user.username}),
                    headers: {"Content-Type": "application/json"}
                });

                console.log(response);

                let data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Failed to update user house", error);
            }
        }
    
        gryffindorBtn.addEventListener("click", () => {
            setHouseBackground("Gryffindor");
            sendHouseToServer("Gryffindor");
            document.querySelector("#houseBtn").style.color = "#cf9906";
            document.querySelector("#characterBtn").style.color = "#cf9906";
            document.querySelector("#movieBtn").style.color = "#cf9906";
            document.querySelector("#infoBtn").style.color = "#cf9906";
            document.querySelector(".changeHousesHeader").style.color = "#cf9906";
        });
    
        slytherinBtn.addEventListener("click", () => {
            setHouseBackground("Slytherin");
            sendHouseToServer("Slytherin");
            document.querySelector("#houseBtn").style.color = "#1d6a1a";
            document.querySelector("#characterBtn").style.color = "#1d6a1a";
            document.querySelector("#movieBtn").style.color = "#1d6a1a";
            document.querySelector("#infoBtn").style.color = "#1d6a1a";
            document.querySelector(".changeHousesHeader").style.color = "#1d6a1a";
        });
    
        ravenclawBtn.addEventListener("click", () => {
            setHouseBackground("Ravenclaw");
            sendHouseToServer("Ravenclaw");
            document.querySelector("#houseBtn").style.color = "#01779e";
            document.querySelector("#characterBtn").style.color = "#01779e";
            document.querySelector("#movieBtn").style.color = "#01779e";
            document.querySelector("#infoBtn").style.color = "#01779e";
            document.querySelector(".changeHousesHeader").style.color = "#01779e";
        });
    
        hufflepuffBtn.addEventListener("click", () => {
            setHouseBackground("Hufflepuff");
            sendHouseToServer("Hufflepuff");
            document.querySelector("#houseBtn").style.color = "#c99506";
            document.querySelector("#characterBtn").style.color = "#c99506";
            document.querySelector("#movieBtn").style.color = "#c99506";
            document.querySelector("#infoBtn").style.color = "#c99506";
            document.querySelector(".changeHousesHeader").style.color = "#c99506";
        });

    } catch (error) {
        console.error("Failed to fetch", error);
    }

}
