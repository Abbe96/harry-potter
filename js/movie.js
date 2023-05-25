async function moviePage() {

    const user = JSON.parse(localStorage.getItem("user"));

    footer.innerHTML = "";

    nav.innerHTML = `
    <button id=lightningMenu></button>
    <h1>MOVIES</h1>

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

    <section id=movies>
        <div id=loading>Loading, kindly wait...</div>
    </section>
    `;

    const movies = document.getElementById("movies");

    try {
        // GET MOVIES AND INFO
        let response = await fetch("api/movies.php");
        let data = await response.json();
        movies.innerHTML = "";
        console.log(data);

        data.forEach(async (movie) => {
            console.log(movie);

            let movieWrapper = document.createElement("div");
            movieWrapper.classList.add("movieWrapper");

            let plotText = document.createElement("div");
            plotText.style.backgroundImage = `url(${movie.cover})`;
            plotText.classList.add("plot");
            plotText.innerHTML = `
                <p class=overlayText>${movie.plot}</p>
            `;

            let movieElement = document.createElement("div");
            movieElement.classList.add("cover");
            movieElement.innerHTML = `
                <h4>${movie.title}</h4>
                <hp>${movie.year}</p>
            `;

            let likeBtn = document.createElement("button");
            likeBtn.classList.add("likeStyle");

            let likesIndexUsers = movie.likes;
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

            likeBtn.addEventListener("click", async () => {
                
                likeBtn.classList.toggle("liked");
            
                const movieTitle = movie.title;
                const action = likeBtn.classList.contains("liked") ? "like" : "unlike";
                            
                try {
                    const likeResponse = await fetch("api/likes-m.php", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user: user.username,
                            movie: movieTitle,
                            action: action
                        })
                    });
            
                    const data = await likeResponse.json();
                    console.log(data);

                    const updatedResponse = await fetch("api/movies.json");
                    const updatedData = await updatedResponse.json();

                    let movieObject = updatedData.find(movie => movie.title === movieTitle);
                    let likesIndex = movieObject.likes.length;
                    let likesIndexUsers = movieObject.likes;

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
            
            movieWrapper.appendChild(plotText);
            movieWrapper.appendChild(movieElement);
            movieWrapper.appendChild(likeBtn);
            movies.appendChild(movieWrapper); 

        });

    } catch (error) {
        console.error("Failed to fetch", error);
    }

}
