

async function loadCharacters() {

    main.innerHTML = `
    <div class=characterContainer>
        <div class="headerCharacters">
            <nav class="menuBar"></nav>
            <h1 class="titleCharacters">Characters</h1>  
            <div class="hidden">hej</div>
        </div>

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

/*
document.querySelector("body").style.backgroundImage = "url(Images-characters/background.png)";
document.querySelector(".menuBar").style.backgroundImage = "url(Images-characters/lightning.png)";

async function loadCharacters() {
    try {
        const response = await fetch("characters.json");
        const data = await response.json();
  
        const charactersDiv = document.getElementById("characters");
        //create info tag and add it to the characterDiv
        const info = document.createElement("a");

        Object.keys(data).forEach(character => {
            //create characterDiv element, and class .name
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
                //characterDiv.style.filter = "none";
                characterDiv.innerHTML = "";
            });
            //append characterDiv element to charactersDiv container
            charactersDiv.appendChild(characterDiv);
        });
    } catch (error) {
      console.error(error);
    }
}
  
loadCharacters();
*/
  