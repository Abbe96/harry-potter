async function moviePage() {

    const user = JSON.parse(localStorage.getItem("user"));

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

        let movieWrapper; 

        data.forEach(movie => {

            movieWrapper = document.createElement("div");
            movieWrapper.classList.add("movieWrapper");

            let movieElement = document.createElement("div");
            movieElement.style.backgroundImage = `url(${movie.cover})`;
            movieElement.classList.add("cover");
            movieElement.innerHTML = `
                <h4>${movie.title}</h4>
                <hp>${movie.year}</p>
            `;

            let plotText = document.createElement("div");
            plotText.classList.add("plot");
            plotText.innerHTML = `
                <p class=overlayText>${movie.plot}</p>
            `;

            let likeBtn = document.createElement("button");
            likeBtn.classList.add("likeStyle");
            likesIndex = movie.likes.indexOf(user.username);
            likeBtn.innerHTML = `
            <p>${likesIndex === -1 ? 0 : likesIndex + 1}</p>
            <span>&#9825;</span>
            `;

            if (likesIndex === -1) {
                likeBtn.style.backgroundColor = "white";
                likeBtn.style.color = "black";
            } else {
                likeBtn.style.backgroundColor = "red";
                likeBtn.style.color = "white";
            }

            likeBtn.addEventListener("click", async () => {
                //toggle "liked" class on likeBtn
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
            
                    // Update the like button appearance based on the response
                    if (data.liked) {
                        likeBtn.style.backgroundColor = "red";
                        likeBtn.style.color = "white";
                    } else {
                        likeBtn.style.backgroundColor = "white";
                        likeBtn.style.color = "black";
                    }

                    likeBtn.querySelector("p").textContent = data.likes.length;

                    if (action === "like") {
                        let movieResponse = await fetch("api/likes-m.php");
                        let moviesData = await movieResponse.json();

                        let movieData = moviesData.find(m => m.title === movieTitle);

                        // ADD THE USER TO THE LIKES ARRAY FOR THE MOVIE
                        if (movieData.likes) {
                            movieData.likes.push(user.username);
                        } else {
                            movieData.likes = [user.username];
                        }

                        // Update the movie data on the server
                        let updateResponse = await fetch(`api/likes-m.php?id=${movieData.id}`, {
                            method: "PUT",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(movieData)
                        });

                        let updatedMovieData = await updateResponse.json();
                        console.log(updatedMovieData);
                    }

                } catch (error) {
                    console.error(error);
                }
            });
            
            movieWrapper.appendChild(movieElement);
            movieWrapper.appendChild(plotText);
            movieWrapper.appendChild(likeBtn);

            movieElement.addEventListener('mouseover', function() {
                movieElement.innerHTML = `${data[movie].title}<br>${data[movie].year}`;
            });
            movieElement.addEventListener('mouseleave', function() {
                movieElement.innerHTML = "";
            });

            movies.appendChild(movieWrapper); 
        });

    } catch (error) {
        console.error("Failed to fetch", error);
    }

}
