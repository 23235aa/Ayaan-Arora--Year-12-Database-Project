var GLOBAL_user; //This is the googles user object
var authenticationListener; //This is a global varaible that stores the listner
function fb_login() { //Ths function sets up a listner for the log in state of the user 
    authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}
async function fb_handleLogin(_user) { //This functions runs if the log in state of the user changes, for example if they are logged in or out
    if (_user) {
        console.log("User is logged in " + _user.displayName)
        GLOBAL_user = _user;
        firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).update(
            {
                name: GLOBAL_user.displayName //Sets the actual name of the user that they have for the google account, not their username
            });
        //Checks if the button is on the HTML page through document.getElementById and if it is it runs the code
        var snapshot = await firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).once('value')
        var userLogin = snapshot.val()
        if (userLogin && userLogin.age && userLogin.username) { //
            userLoggedInFlow()
        }
        else {
            userLoggedOutFlow()
        }

    } else {
        console.log("User is NOT logged in - Starting the popup process")
         userLoggedOutFlow()
    }
    showName()
}
function fb_popupLogin() { //Actually runs the google log in
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user; //Save the user details object to a global variable
        console.log("User has logged in")
    });
}

async function showName() {
    var snapshot = await firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).once('value');
    var userDataLogin = snapshot.val()
    document.getElementById('userDetails').innerHTML += "Hello " + userDataLogin.username
}
function userLoggedInFlow() {
    if (document.getElementById("loginButton")) {
        document.getElementById("loginButton").style.display = "none"; //If the user has already logged into the site before the login button does not appear
    }
    if (document.getElementById("loginWelcome")) {
        document.getElementById("loginWelcome").style.display = "none";
    }
    if (document.getElementById("gameForm")) {
        document.getElementById("gameForm").style.display = "none"; //Hides the form if you are already logged in
    }
    if (document.getElementById("gameButton")) { //Shows you a game button that takes you straight to game page 
        document.getElementById("gameButton").style.display = "block";
    }
    if (document.getElementById("welcomeBack")) { //If you are logged in it says welcome back
        document.getElementById("welcomeBack").style.display = "block"
    }
    if (document.getElementById("register")) { //Doesn't show you register text 
        document.getElementById("register").style.display = "none"
    }
    //We do this through style.display="none" which hides the login button
}
function userLoggedOutFlow() {
    if (document.getElementById("loginButton")) {
        document.getElementById("loginButton").style.display = "block" //If the user is not logged in it displays the button
    }
    if (document.getElementById("loginWelcome")) {
        document.getElementById("loginWelcome").style.display = "block"
    }
    if (document.getElementById("gameForm")) {
        document.getElementById("gameForm").style.display = "block" //Shows you the form if you are not logged in
    }
    if (document.getElementById("gameButton")) {
        document.getElementById("gameButton").style.display = "none" //Doesn't show you the game button if you are not logged in
    }
    if (document.getElementById("register")) {
        document.getElementById("register").style.display = "block"
    }
    if (document.getElementById("welcomeBack")) {
        document.getElementById("welcomeBack").style.display = "none"
    }
}