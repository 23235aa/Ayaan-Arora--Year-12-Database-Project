
function writeForm() {
    //Check if the user is logged in by seeing if Global_user is empty
    if (!GLOBAL_user) {
        alert("Please log in before submitting the form!");
        return;
    }
    // Get the form data
    const Name_field = document.getElementById("name").value;
    const userAge = document.getElementById("userAge").value;
    console.log("Here")
    console.log(userAge)
    if (Name_field.trim() === ""){ //Checks if the Name_field is empty, and then sends an alert to fill the field
        alert("You need a username")
        return;
    }
    if(userAge.trim() ==="" ||userAge <13 || userAge > 100 ) { //Checks if the user gae is less than 13 and more than 100   
        alert("You have to be between 13 and 100 to use this site")
        return;
    }

    console.log(GLOBAL_user.displayName + " username is  " + Name_field)
    //Updates the users info that they got from the form to the firebase in the userInfo branch
    firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).update(
        {
            username: Name_field,
            age: userAge,
            profilePicture: GLOBAL_user.photoURL,
            email: GLOBAL_user.email

        }
    )
    //Move to the game page after the data is processed
    window.location.href = "gamePage.html";
}
//The function reads the high scores of the users for tennis fever from firebase
function fb_readHighScoresTennisFever() {
    firebase.database().ref('/Highscores/tennisfever').orderByChild('tennisfeverscore').limitToFirst(5).once('value', fb_displayHighScoresTennisFever)
    //Tells the computer to get the information from the tennisfever branch in firebase
    //The .orderByChild tells the computer to order the users score that they got for tennisfever from lowest to highest
    //The limiToFirst(5) gets the 5 highest score
}
//Gets the top five users with the highest score for tennis fever
function fb_displayHighScoresTennisFever(snapshot) {
    snapshot.forEach(fb_showOneScoreTennisFever)
}
//This function gets called for each user entry for the top five scores and then displays their username, profile picture and score
//data is a single user entry from the snapshot
function fb_showOneScoreTennisFever(data) {
    let entry = data.val()
    document.getElementById('HTML_OUTPUT').innerHTML +=
     "<img src='"+ entry.userProfilePicture + "'width = '50' height = '50'>" + entry.username + ": " +
      entry.tennisfeverscore * -1 + "<br>" //To show the scores in positive when it is displayed on the leaderboard.
    //Multliplying it by negative is what allows the computer to store the score from highest to lowest
}
if (document.getElementById('HTML_OUTPUT')) {
    fb_readHighScoresTennisFever(); //When it lands on a page that has the id called 'HTML_OUTPUT' it does the fb_readHighscores function
    //In our case this happens when it lands on the tennisLeaderboard.html
}
function fb_readHighScoresGeoDash() {//The function reads the high scores of the users from firbase for Geodash
    firebase.database().ref('/Highscores/Geodash').orderByChild('Geodashscore').limitToFirst(5).once('value', fb_displayHighScoresGeoDash)
    //Tells the computer to get the information from the Geodash branch in firebase
    //The .orderByChild tells the computer to order the users score that they got for tennisfever from lowest to highest
    //The limiToFirst(5) gets the 5 highest scores
}
//Gets the top 5 users with the highest score for Geo dash
function fb_displayHighScoresGeoDash(snapshot2) {
    snapshot2.forEach(fb_showOneScoreGeoDash)
}
//This function gets called for each user entry in the top five and displays their username, profile picture and score
//data2 is a single user entry from the snapshot2
function fb_showOneScoreGeoDash(data2) {
    let entry2 = data2.val()
    document.getElementById('HTML_OUTPUT2').innerHTML += "<img src='"+ entry2.userProfilePicture + "'width = '50' height = '50'>"+ entry2.username + ": " + entry2.Geodashscore * -1 + "<br>" // Multiply the score by negative 1 so it displays as a positive number.
}
if (document.getElementById('HTML_OUTPUT2')) {
    fb_readHighScoresGeoDash() //When it lands on a page that has the id called 'HTML_OUTPUT2' it does the fb_readHighscores2 function
    //In our case this happens when it lands on the GeoDashLeaderboard.html
}