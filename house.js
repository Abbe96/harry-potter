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

        if(!response.ok) {
            console.log(`Something went wrong, we got this from the sever <span>${data.message}/span>`)
        } else {
            houses.innerHTML = `
            <h2 id=houseName${data.houseName}</h2>
            <p id=houseInfo>${data.info}</p>
            `;
        }
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

housePage();