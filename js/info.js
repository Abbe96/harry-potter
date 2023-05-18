async function infoPage() {
    const user = JSON.parse(localStorage.getItem("user"));
      
    nav.innerHTML = `
        <button id=lightningMenu></button>

        <h1>INFO</h1>

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
      <div id=infoContainer>
      
        <div id=whatIsHarryPotter></div>
        <div id=author></div>
        <div id=books></div>
      
      </div>
    `;

    let whatIsHarryPotter = main.querySelector("#whatIsHarryPotter");
    let author = main.querySelector("#author");
    let books = main.querySelector("#books");

    try {
      let response = await fetch("api/info.php");
      let data = await response.json();
      
      whatIsHarryPotter.innerHTML = `
        <h2>What is Harry Potter?</h2>
        <p>${data.What_is_Harry_Potter}</p>
      `;

      author.innerHTML = `
        <h2>J.K Rowling</h2>
        <p>${data.JK_Rowling}</p>
      `;

      books.innerHTML = `
        <h2>Books</h2>
        <ul class=bookList></ul>
      `;

      let bookList = main.querySelector(".bookList");

      Object.keys(data.Books).forEach(async(bookTitle) => {
        let bookUrl = data.Books[bookTitle];
        
        let liElement = document.createElement("li");
        liElement.classList.add("listedBooks");

        let aElement = document.createElement("a");
        aElement.href = bookUrl;
        aElement.textContent = bookTitle;

        liElement.appendChild(aElement);
        bookList.appendChild(liElement)
      })
      
    } catch (error) {
      console.error("Failed to fetch", error);
    }

}
