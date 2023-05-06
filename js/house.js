async function housePage() {

    const user = JSON.parse(localStorage.getItem("user"));
    
    nav.innerHTML = `
        <button id=lightningMenu></button>

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
        <header>
            <h1>HOGWARTS HOUSES</h1>
        </header>

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
        <header>
            <h1>HOGWARTS HOUSES</h1>
        </header>

        <button id=back>Back to Houses</button>

        <section id=houseMembers>
            <div id=loading>Loading, kindly wait...</div>
        </section>
    `;

    let backBtn = main.querySelector("#back");
    backBtn.addEventListener("click", housePage);

    let houseMembers = main.querySelector("#houseMembers");

    try {
        let response = await fetch("api/houses.php");
        let data = await response.json();

        // EDIT HERE
        let members = data.map((user) => {
            return `
            <div class=house>
                <div>${user.house}</div>
            </div>
            `;
        }).join("");

        houseMembers.innerHTML = `
            <h2>${data.house}</h2>
            ${members}
        `;
    } catch (error) {
        console.warn(error);
    }

}

