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

    let movies = main.querySelector("#movies");

    try {
        // GET MOVIES AND INFO
        let response = await fetch("api/movies.php");
        let data = await response.json();
        movies.innerHTML = "";

        data.forEach(movie => {
            let movieElement = document.createElement("div");
            let plotText = document.createElement("div");
            //let plotText = document.createElement("div");
            movieElement.style.backgroundImage = `url(${movie.cover})`;
            movieElement.classList.add("cover");
            plotText.classList.add("plot");
            //plotText.classList.add("plot");

            

            movieElement.innerHTML = `
                <h4>${movie.title}</h4>
                <hp>${movie.year}</p>
            `;

            plotText.innerHTML = `
                <p class=overlayText>${movie.plot}</p>
            `;
            movies.appendChild(movieElement);
            movies.appendChild(plotText);
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

// async function like_button(event) { // AC

//     try {
//         const response = await fetch("api/likes_db.php", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify({ movie: event.target.querySelector("h4").textContent, like_count: 1 }) });
//         const resource = await response.json();
//         alert(resource.message)
//     } catch (err) {
//         console.log(err)
//     }
// }
