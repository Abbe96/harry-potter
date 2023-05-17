let isMenuDisplayed = false;

function toggleMenuPage() {
    if (!isMenuDisplayed) {
        menuPage();
        isMenuDisplayed = true;
    } else {
        homePage();
        isMenuDisplayed = false;
    }
}

async function setTheme() {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
        let response = await fetch("api/houses.php");
        let data = await response.json();

        async function checkUserHouse() {
            try {
                let response = await fetch(`api/getUserHouse.php?user=${user.username}`);
                let userHouseData = await response.json();
                console.log(userHouseData);

                if (userHouseData.house) {
                    setHouseBackground(userHouseData.house, userHouseData);
                } else {
                    document.querySelector("body").style.backgroundImage = 'url("../Bild/background-login.jpg")';
                }
            } catch (error) {
                console.error("Failed to get user's house", error);
            }
        }

        checkUserHouse();

        function setHouseBackground(houseName) {
            let houseBackground = data.find(house => house.name === houseName)["background"];
            document.querySelector("body").style.backgroundImage = `url(${houseBackground})`;
        }

    } catch (error) {
        console.error("Failed to fetch", error);
    }
}

  