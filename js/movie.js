async function moviePage() {

    nav.innerHTML = `
    <button id=lightningMenu></button>
    <button id=logout>Logout</button>
    `;

    let logoutBtn = nav.querySelector("#logout");
    logoutBtn.addEventListener("click", logout);

    let menuBtn = nav.querySelector("#lightningMenu");
    menuBtn.addEventListener("click", menuPage);

    main.innerHTML = `
    <header>
        <h1>MOVIES</h1>
    </header>

    <section id=movies>
        <div id=loading>Loading, kindly wait...</div>
    </section>
    `;

    let movies = main.querySelector("#movies");

    try {
        // GET MOVIES AND INFO
        let response = await fetch("api/movies.php");
        let data = await response.json();
        movies.innerHTML = "";

        data.forEach(movie => {
            let movieElement = document.createElement("div");
            //let plotText = document.createElement("div");
            movieElement.style.backgroundImage = `url(${movie.cover})`;
            movieElement.classList.add("cover");
            //plotText.classList.add("plot");

            movieElement.innerHTML = `
                <h4>${movie.title}</h4>
                <hp>${movie.year}</p>
            `;

            //plotText.innerHTML = `
            //    <p class=overlayText>${movie.plot}</p>
            //`;

            movies.appendChild(movieElement);
            //movies.appendChild(plotText);

            movieElement.addEventListener('mouseover', function() {
                movieElement.innerHTML = `${data[movie].title}<br>${data[movie].year}`;
            });
            movieElement.addEventListener('mouseleave', function() {
                movieElement.innerHTML = "";
            });
        });
    } catch (error) {
        console.error("Failed to fetch", error);
    }
}
