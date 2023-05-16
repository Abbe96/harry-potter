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
                <h3 class="info-title">History of Harry Potter</h3>
                <p class="info-text">Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's conflict with Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people).<br>The original seven books were adapted into an eight-part namesake film series by Warner Bros. Pictures. In 2016, the total value of the Harry Potter franchise was estimated at $25 billion, making Harry Potter one of the highest-grossing media franchises of all time.</p>
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