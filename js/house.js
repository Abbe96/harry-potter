async function housePage() {
    const user = JSON.parse(localStorage.getItem("user"));

    footer.innerHTML = "";
    
    nav.innerHTML = `
        <button id=lightningMenu></button>

        <h1>HOGWARTS HOUSES</h1>

        <div id=me>
        <p>${user.username}</p>
        <button id=logout>Logout</button>
        </div>
    `;

    let logoutBtn = nav.querySelector("#logout");
    logoutBtn.addEventListener("click", logout);

    let menuBtn = nav.querySelector("#lightningMenu");
    menuBtn.addEventListener("click", toggleMenuPage);

    main.innerHTML = `
        <button id=membersBtn>Registered members</button>

        <section id=theFourHouses>
            <div id=loading>Loading, kindly wait...</div>
        </section>
    `;

    let houses = main.querySelector("#theFourHouses");
    let membersBtn = main.querySelector("#membersBtn");
    membersBtn.addEventListener("click", showHouseMembers);

    try {
        // GET HOUSE-NAME AND INFO
        let response = await fetch("api/houses.php");
        let data = await response.json();
        houses.innerHTML = "";

        data.forEach(house => {
            let houseElement = document.createElement("div");
            houseElement.innerHTML = `
            <h2>${house.name}</h2>
            <p>${house.description}</p>
            `;
            houses.appendChild(houseElement);
        });
    } catch (error) {
        console.error("Failed to fetch", error);
    }
}

async function showHouseMembers() {

    main.innerHTML = `
        <button id=backToHouses>Back to Houses</button>

        <section id=houseMembers>
            <div id=loading>Loading, kindly wait...</div>
        </section>
    `;

    let backBtn = main.querySelector("#backToHouses");
    backBtn.addEventListener("click", housePage);

    let houseMembers = main.querySelector("#houseMembers");

    try {
        let response = await fetch("api/getMembers.php");
        let data = await response.json();
        console.log(data);

        let houses = {};

        data.members.forEach((member) => {
            const { house, username } = member;
            if (houses.hasOwnProperty(house)) {
                houses[house].push(username);
            } else {
                houses[house] = [username];
            }
        });

        let houseMarkup = "";
        for (let house in houses)  {
            const members = houses[house].join("<br>");
            houseMarkup += `
                <div class="house">
                    <h5>${house}</h5>
                    <p>${members}</p>
                </div>
            `;
        }

        houseMembers.innerHTML = houseMarkup;

    } catch (error) {
        console.warn(error);
    }

}

