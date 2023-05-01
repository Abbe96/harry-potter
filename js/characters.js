

async function loadCharacters() {

    document.querySelector("body").style.backgroundImage = "url(Images-characters/background.png)";

    main.innerHTML = `
    <h1 class="headerCharacters">Characters</h1>  
    <div id="characters"></div>
    `;

    try {
        const response = await fetch("characters.json");
        const data = await response.json();
  
        const charactersDiv = document.getElementById("characters");
  
        Object.keys(data).forEach(character => {
            //create newcharacterDiv element
            const characterDiv = document.createElement("div");
            characterDiv.classList.add("name", character);
            characterDiv.style.backgroundImage = `url(${data[character].imageSource})`;
    
            //add eventlisteners to characterDiv element
            characterDiv.addEventListener('mouseover', function() {
                characterDiv.innerHTML = `${data[character].name}<br>${data[character].house}`;
                //characterDiv.style.filter = "blur(3px)";
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
  