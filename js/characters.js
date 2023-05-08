async function characterPage() {
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    nav.innerHTML = `
        <button id=lightningMenu></button>
        <div class="headerCharacters">
            <h1 class="titleCharacters">Characters</h1>  
        </div>
        
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
    <div class=characterContainer>
        <div id="characters"></div>
    </div>
    `;
    
    try {
        let response = await fetch("api/characters.json");
        let data = await response.json();
    
        const charactersDiv = document.getElementById("characters");
        //create info tag and add it to the characterDiv
        const info = document.createElement("a");
    
        Object.keys(data).forEach(async (character) => {

            //create div element
            const characterWrapper = document.createElement("div");
            characterWrapper.classList.add("characterWrapper");
    
            const tempDiv = document.createElement("div");
            tempDiv.classList.add("name", character);
            tempDiv.style.backgroundImage = `url(${data[character].imageSource})`;
    
            const likeBtn = document.createElement("button");
            likeBtn.classList.add("likeStyle", character);
            
            const likesIndex = data[character].likes.indexOf(user.username);
            likeBtn.innerHTML = `
                <p>${likesIndex === -1 ? 0 : likesIndex + 1}</p>
                <span>&#9825;</span>
            `;
    
            tempDiv.addEventListener("mouseover", function() {
                //tempDiv.style.filter = "blur(3px)";
                info.href = data[character].info;               
                info.innerHTML = `${data[character].name}<br>${data[character].house}`;             
                tempDiv.appendChild(info); 
            });
    
            tempDiv.addEventListener("mouseleave", function() {
                tempDiv.innerHTML = "";
            });
    
            //append tempDiv element to charactersDiv container
            characterWrapper.appendChild(tempDiv);
            characterWrapper.appendChild(likeBtn);
    
            //add event listener to likeBtn
            likeBtn.addEventListener("click", async function() {
                //toggle "liked" class on likeBtn
                likeBtn.classList.toggle("liked");
    
                const characterName = character;
                const action = likeBtn.classList.contains("liked") ? "like" : "unlike";
                
                try {
                    const likeResponse = await fetch("api/likes.php", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user: user.username,
                            character: characterName,
                            action: action
                        })
                    });
    
                    const data = await likeResponse.json();
                    console.log(data);

                    const updatedResponse = await fetch("api/characters.json");
                    const updatedData = await updatedResponse.json();
                    const likesIndex = updatedData[characterName].likes.indexOf(user.username);
                    if (likesIndex === -1) {
                        likeBtn.style.backgroundColor = "white";
                        likeBtn.style.color = "black";
                    } else {
                        likeBtn.style.backgroundColor = "red";
                        likeBtn.style.color = "white";
                    }

                    likeBtn.querySelector("p").textContent = likesIndex === -1 ? 0 : likesIndex + 1;
    
                } catch (error) {
                    console.error(error);
                }
            
            });
    
            charactersDiv.appendChild(characterWrapper);
        });
    } catch (error) {
        console.error(error)
   
    }
}