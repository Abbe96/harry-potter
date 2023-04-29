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
        <h1>HARRY POTTER MOVIES</h1>
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
            movieCover.style.backgroundImage = `${movie.cover}`;

        });
    }
}