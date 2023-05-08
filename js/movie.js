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
            let movieElement = document.createElement("div");
            let plotText = document.createElement("div");

            movieWrapper.classList.add("movieWrapper");
            movieElement.style.backgroundImage = `url(${movie.cover})`;
            movieElement.classList.add("cover");
            plotText.classList.add("plot");

            movieElement.innerHTML = `
                <h4>${movie.title}</h4>
                <hp>${movie.year}</p>
            `;

            plotText.innerHTML = `
                <p class=overlayText>${movie.plot}</p>
            `;

            movieWrapper.appendChild(movieElement);
            movieWrapper.appendChild(plotText);
            

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
