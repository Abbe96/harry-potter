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

//!! TODO
function toggleLike(event) {
    const likeBtn = event.target;
    if (likeBtn.classList.contains("liked")) {
      likeBtn.classList.remove("liked");
      likeBtn.innerHTML = "Like";
    } else {
      likeBtn.classList.add("liked");
      likeBtn.innerHTML = "Liked";
    }
  }
  
  