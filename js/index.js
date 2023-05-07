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


  