// USER STARTS NULL UNTIL LOGGED IN
let user = null;
let main = document.querySelector("main");

// SHOW LOGIN PAGE OR QUIZ PAGE IF LOGGED IN OR NOT
if (!window.localStorage.getItem("home-user")) {
    loginPage();
} else {
    // GRAB USER FROM LOCALSTORAGE AND STORE IN 'USER' TO USE LATER
    user = JSON.parse(window.localStorage.getItem("home-user"));
    // TRY TO LOGIN
    tryLogin();
}

function loginPage() {
    main.innerHTML = `
        <h2>Login</h2>
        <p id=message><p>

        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Login</button>
        </form>
        <button id=register>New to this? Become a wizard member!</button>
    `;

    let registerBtn = main.querySelector("#register");
    registerBtn.addEventListener("click", registerPage);

    let loginForm = main.querySelector("form");
    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            let response = await fetch("api/login.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.elements.username.value,
                    password: this.elements.password.value,
                }),
            });

            let data = await response.json();

            // FEEDBACK 
            if (!response.ok) {
                message.innerHTML = `THE SERVER GONE MAD! we got this from the server <span>${data.message}</span>.`;
            } else {
                // RECEIVE THE USER
                window.localStorage.setItem(("home-user", JSON.stringify(data)));
                user = data;
                //!! ÄNDRA TILL HOME PAGE
                housePage();
            }
        } catch (error) {
            message.textContent = `Error: ${error.message}`;
        }

    });
}

loginPage();