async function characterPage() { 
    const user = JSON.parse(localStorage.getItem("user"));

    footer.innerHTML = "";
    
    nav.innerHTML = `
        <button id=lightningMenu></button>
        <h1>CHARACTERS</h1>  
        
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
        <div id="characters"></div>
    
    `;
    
    try {
        let response = await fetch("api/characters.json");
        let data = await response.json();
    
        const charactersDiv = document.getElementById("characters");
        const info = document.createElement("a");
        info.classList.add("linkForCharacter");
    
        Object.keys(data).forEach(async (character) => {

            //create div element
            const characterWrapper = document.createElement("div");
            characterWrapper.classList.add("characterWrapper");
    
            const tempDiv = document.createElement("div");
            tempDiv.classList.add("name");
            tempDiv.style.backgroundImage = `url(${data[character].imageSource})`;
    
            const likeBtn = document.createElement("button");
            likeBtn.classList.add("likeStyle", character);
            
            let likesIndexUsers = data[character].likes;
            let likesIndex = likesIndexUsers.length;
            
            likeBtn.innerHTML = `
                <p>${likesIndex}</p>
                <span>&#9825;</span>
            `;

            let usernameExists = likesIndexUsers.includes(user.username);
            if (usernameExists) {
                likeBtn.style.backgroundColor = "red";
                likeBtn.style.color = "white";
            } else {
                likeBtn.style.backgroundColor = "white";
                likeBtn.style.color = "black";
            }
            
            //HOVER BILD FÖR VARJE KARAKTÄR: NAMN + "LÄNK"
            tempDiv.addEventListener("mouseover", function() {
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

                    //HÄR UPPDATERAS EFTER MAN LIKE/UNLIKE TILL JSON-FIL
                    const updatedResponse = await fetch("api/characters.json");
                    const updatedData = await updatedResponse.json();

                    let likesIndex = updatedData[characterName].likes.length;
                    let likesIndexUsers = updatedData[character].likes;

                    let usernameExists = likesIndexUsers.includes(user.username);
                    if (usernameExists) {
                        likeBtn.style.backgroundColor = "red";
                        likeBtn.style.color = "white";
                    } else {
                        likeBtn.style.backgroundColor = "white";
                        likeBtn.style.color = "black";
                    }

                    likeBtn.querySelector("p").textContent = likesIndex;
    
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