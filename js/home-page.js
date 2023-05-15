function homePage() {

    const user = JSON.parse(localStorage.getItem("user"));
    
    nav.innerHTML = `
        <button id=lightningMenu></button>
        <h1>HARRY POTTER</h1>
        
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

        <div class="grid-container">
            <div class="item1"><button class=btnStyle id=movieBtn>MOVIES</button></div>      
            <div class="item2"><button class=btnStyle id=characterBtn>CHARACTERS</button></div>
            <div class="item3"><button class=btnStyle id=houseBtn>HOUSE</button></div>
            <div class="item4"><button class=btnStyle id=infoBtn>INFO</button></div>
        </div>
        
        <div id="cta">
            <div class="wrapper">
                <h3 class="info-title">What is the history of Harry Potter?</h3>
                <p class="info-text">Harry Potter first made an appearance in 1997 in the novel Harry Potter and the Philosopher's Stone. Harry is an orphan living with his guardian aunt and uncle and their son, who mistreat him. On his 11th birthday Harry discovers that his parents were a witch and a wizard. </p>
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

}