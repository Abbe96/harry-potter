async function infoPage() {
    const user = JSON.parse(localStorage.getItem("user"));
      
    nav.innerHTML = `
        <button id=lightningMenu></button>

        <h1>INFO</h1>

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
      <div id=infoContainer>
      
        <div id=whatIsHarryPotter></div>
        <div id=author></div>
        <div id=books></div>
      
      </div>
    `;

    let whatIsHarryPotter = main.querySelector("#whatIsHarryPotter");
    let author = main.querySelector("#author");
    let books = main.querySelector("#books");

    try {
      let response = await fetch("api/info.php");
      let data = await response.json();
      
    }

}
