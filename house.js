async function housePage() {
    let main = document.querySelector("main");

    main.innerHTML = `
        <header>
            <h1>HOGWARDS HOUSES</h1>
        </header>

        <button>Registered members</button>

        <section id=theFourHouses>
            <div id=loading>Loading, kindly wait...</div>
        </section>
    `;

    let houses = main.querySelector("#theFourHouses");

    try {
        // GET HOUSE-NAME AND INFO
        let response = await fetch("api/houses.php");
        let data = await response.json();
        console.log(data);
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

housePage();
