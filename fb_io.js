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
        var snapshot = await firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).once('value') //Gets the info of the user from the userInfo branch
        var userLogin = snapshot.val() //Store the snapshot inside the varaible and use .val() to turn it into an object
        if (userLogin && userLogin.age && userLogin.username) { //If the user has data in the userInfo branch and if they have an age and username they don't have to fill in the form again
            userLoggedInFlow() //Is a function for people that are already logged in and have completed the registration
             showName() //Shows the name of the user 
        }
        else { //If they don't have any data in the userInfo branch or if they don't have  an age or username they have to fill in the form and login
            userLoggedOutFlowRegister() //Is a function for people that are not logged in or haven't done the registration
        }

    } else { //If the user hasn't logged in or signed up through the google log in
        console.log("User is NOT logged in - Starting the popup process")
         userLoggedOutFlow() //Goes through the log in and registration process
    } 
}
function fb_popupLogin() { //Actually runs the google log in
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user; //Save the user details object to a global variable
        console.log("User has logged in")
    });
}
//This functions job is to show the username of the user on the game and index html page
async function showName() {
    var snapshot = await firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).once('value');
    var userDataLogin = snapshot.val()
    if (document.getElementById('userDetails')){
        document.getElementById('userDetails').innerHTML += "Hello " + userDataLogin.username
    }
}
//This functions job is to hide the registration and just show the game button provided the user is logged in(done by the if else statmetnt above)
function userLoggedInFlow() {
    if (document.getElementById("loginButton")) { //There is an if stametnt to check if the id actually exists on the page
        document.getElementById("loginButton").style.display = "none"; //If the user has already logged into the site before the login button does not appear
    }
    if (document.getElementById("loginWelcome")) {
        document.getElementById("loginWelcome").style.display = "none";
    }
    if (document.getElementById("gameForm")) {
        document.getElementById("gameForm").style.display = "none"; //Hides the form if you are already logged in and done the registration
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
//This function runs if the user hasn't done the login process or if they haven't done the registration. It shows the form and the login button
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
function userLoggedOutFlowRegister(){ //This function runs if the user has logged in but not filled out the form
    if (document.getElementById("loginButton")) {
        document.getElementById("loginButton").style.display = "none" //If the user is not logged in it displays the button
    }
    if (document.getElementById("loginWelcome")) {
        document.getElementById("loginWelcome").style.display = "none"
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