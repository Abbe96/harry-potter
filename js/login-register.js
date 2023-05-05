// USER STARTS NULL UNTIL LOGGED IN
let user = null;
let main = document.querySelector("main");
let nav = document.querySelector("nav");

// SHOW LOGIN PAGE OR HOME PAGE IF LOGGED IN OR NOT
if (!window.localStorage.getItem("home-user")) {
    loginPage();
} else {
    // GRAB USER FROM LOCALSTORAGE AND STORE IN 'USER' TO USE LATER
    user = JSON.parse(window.localStorage.getItem("home-user"));
    // TRY TO LOGIN
    attemptLogin();
}

//document.querySelector("#bg").style.backgroundImage = "url(Bild/background-login.jpg)"

function loginPage() {

    nav.innerHTML = "";
    main.innerHTML = `
    
    <div class=logRegContainer>
        <div id="bg"></div>
        <h2 class=h2Size>Login</h2>
        <p id=message><p>

        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Login</button>
            <button id=register>New to this? Become a wizard member!</button>
        </form>
    </div>
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
                window.localStorage.setItem("home-user", JSON.stringify(data));
                user = data;
       
                homePage();
            }
        } catch (error) {
            message.textContent = `Error: ${error.message}`;
        }

    });
}

async function attemptLogin() {
    try {
        let response = await fetch("api/login.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
        });
        
        let data = await response.json();

        // IF NOT LOGIN, REDIRECT USER TO LOGIN PAGE
        if (!response.ok) {
            loginPage();
        } else {
            window.localStorage.setItem("home-user", JSON.stringify(data));
            user = data;

            homePage();
        }
    } catch (error) {
        loginPage();
    }
}

function registerPage() {
    main.innerHTML = `
    <div class=logRegContainer>
        <div id="bg"></div> 
        <h2 class=h2Size>Register</h2>
        <p id=message></p>

        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Register</button>
            <button id=login>Already a wizard member? Login here</button>
        </form>
    </div>
    `;

    let loginBtn = main.querySelector("#login");
    loginBtn.addEventListener("click", loginPage);

    let registerForm = main.querySelector("form");
    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            let response = await fetch("api/register.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: this.elements.username.value,
                    password: this.elements.password.value,
                }),
            });

            let data = await response.json();

            // FEEDBACK IN CASE ERROR
            if (!response.ok) {
                message.innerHTML = `THE SERVER GONE MAD! we got this from the server <span>${data.message}</span>.`;
            } else {
                message.innerHTML = `The wizard <b>${data.username}</b> is now a Hogwarts student! Click on the link below to login.`;
            }
        } catch (error) {
            message.textContent = `Error: ${error.message}`;
        }
    });
}

function logout() {
    window.localStorage.clear();
    user = null;
    loginPage();
}