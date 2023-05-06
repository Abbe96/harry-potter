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
    
        Object.keys(data).forEach(async character => {
            //create div element
            const characterWrapper = document.createElement("div");
            characterWrapper.classList.add("characterWrapper");
    
            const tempDiv = document.createElement("div");
            tempDiv.classList.add("name", character);
            tempDiv.style.backgroundImage = `url(${data[character].imageSource})`;
    
            const likeBtn = document.createElement("button");
            likeBtn.classList.add("likeStyle", character);
            likeBtn.innerHTML = `<span>&#9825;</span>`;
    
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
                    const response = await fetch("api/likes.php", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user: user.username,
                            character: characterName,
                            action: action
                        })
                    });
    
                    const data = await response.json();
                    console.log(data);
                    } catch (error) {
                    console.error(error);
                    }
            });
    
            charactersDiv.appendChild(characterWrapper);
        });

    } catch (error) {
        console.error(error);
    }
    
}