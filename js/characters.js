async function characterPage() {

    nav.innerHTML = `
        <button id=lightningMenu></button>
        <div class="headerCharacters">
            <h1 class="titleCharacters">Characters</h1>  
        </div>
        <button id=logout>Logout</button>
    `;

    let logoutBtn = nav.querySelector("#logout");
    logoutBtn.addEventListener("click", logout);

    let menuBtn = nav.querySelector("#lightningMenu");
    menuBtn.addEventListener("click", toggleMenuPage);

    main.innerHTML = `
    <div class=characterContainer>
        <div id="characters"></div>
    </div>
    `;

    try {
        const response = await fetch("api/characters.json");
        const data = await response.json();
  
        const charactersDiv = document.getElementById("characters");
        //create info tag and add it to the characterDiv
        const info = document.createElement("a")
  
        Object.keys(data).forEach(character => {
            //create newcharacterDiv element
            const characterDiv = document.createElement("div");
            characterDiv.classList.add("name", character);
            characterDiv.style.backgroundImage = `url(${data[character].imageSource})`;
    
            //add eventlisteners to characterDiv element
            characterDiv.addEventListener('mouseover', function() {

                //characterDiv.style.filter = "blur(3px)";
                info.href = data[character].info;               
                info.innerHTML = `${data[character].name}<br>${data[character].house}`;             
                characterDiv.appendChild(info); 
            });
    
            characterDiv.addEventListener('mouseleave', function() {
                characterDiv.innerHTML = "";
                //characterDiv.style.filter = "none";
            });
            //append characterDiv element to charactersDiv container
            charactersDiv.appendChild(characterDiv);
        });
    } catch (error) {
      console.error(error);
    }
}