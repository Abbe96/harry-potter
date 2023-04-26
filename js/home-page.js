function homePage() {

    nav.innerHTML = `
    <button id=logout>Logout</button>
    `;

    main.innerHTML = `
        <body>
        <header>
            <h1>HARRY POTTER</h1>
        </header>
        
        <div class="grid-container">
            <div class="item1"><button id=houseBtn>HOUSE</button></div>
            <div class="item2"> <button id=characterBtn>CHARACTERS</button></div>
            <div class="item3"><button id=filmBtn>FILMS</button></div>  
            <div class="item4"><button id=infoBtn>INFO</button></div>
        </div>
        
        <div id="cta">
            <div class="wrapper">
                <h3 class="info-title">What is the history of Harry Potter?</h3>
                <p class="info-text">Harry Potter first made an appearance in 1997 in the novel Harry Potter and the Philosopher's Stone. Harry is an orphan living with his guardian aunt and uncle and their son, who mistreat him. On his 11th birthday Harry discovers that his parents were a witch and a wizard. </p>
                <a href="#" class="button-2">Get Started</a>
            </div>
        </div>
        
        <footer>
            <div class="wrapper">
                <div id="footer-info">
                    <p>Webbaserad design och utveckling 2023</p>
                    <p><a href="#">Terms of Service</a> I <a href="#">Privacy</a></p>
                </div>
                <div id="footer-links">
                    <ul>
                        <li><h5>Company</h5></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">CHARACTERS</a></li>
                        <li><a href="#">FILM</a></li>
                        <li><a href="#">INFO</a></li>
                    </ul>
                    
                </div>
                
                <div class="clear"></div>
            </div>
        </footer>
    `;

    let houseBtn = main.querySelector("#houseBtn");
    houseBtn.addEventListener("click", housePage);
}