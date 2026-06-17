//firebase.database().ref('/').set(
    //{
        //message: "Hello World"
    //}
//)

function writeForm(){
     //Check if the user is logged in by seeing if Global_user is empty
  if (!GLOBAL_user) {
    alert("Please log in before submitting the form!");
    return; 
}
    // Get the form data
    const Name_field = document.getElementById("name").value;
    const userAge  = document.getElementById("userAge").value;
    console.log("Here")
    console.log(userAge)
    
    console.log(GLOBAL_user.displayName + " username is  " + Name_field)
firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).update(
{
  username: Name_field,
  age: userAge
}
)
//Move to the game page after the data is processed
window.location.href= "gamePage.html";
}
//The function reads the high scores of the users from firbase
function fb_readHighScores(){
    firebase.database().ref('/Highscores/tennisfever').orderByChild('tennisfeverscore').limitToLast(3).once('value',fb_displayHighScores)
    //Tells the computer to get the information from the tennisfever branch in firebase
    //The .orderByChild tells the computer to order the users score that they got for tennisfever from lowest to highest
    //The limiTolast(3) gets the 3 highest score
}
//Gets the top three users with the highest score for tennis fever
function fb_displayHighScores(snaphot){
    snaphot.forEach(fb_showOneScore)
}
//This function gets called for each user entry
//data is a single user entry from the snapshot
function fb_showOneScore(data){
    let entry= data.val()
    document.getElementById('HTML_OUTPUT').innerHTML += entry.username + ": " + entry.tennisfeverscore*-1 + "<br>" //To show the scores in positive when it is displayed on the leaderboard.
    //Multliplying it by negative is what allows the computer to store the score from highest to lowest
}
if (document.getElementById('HTML_OUTPUT')){
    fb_readHighScores(); //When it lands on a page that has the id called 'HTML_OUTPUT' it does the fb_readHighscores function
    //In our case this happens when it lands on the tennisLeaderboard.html
}
function fb_readHighScores2(){//The function reads the high scores of the users from firbase for Geodash
    firebase.database().ref('/Highscores/Geodash').orderByChild('Geodashscore').limitToLast(3).once('value',fb_displayHighScores2)
    //Tells the computer to get the information from the Geodash branch in firebase
    //The .orderByChild tells the computer to order the users score that they got for tennisfever from lowest to highest
    //The limiTolast(3) gets the 3 highest scores
}
//Gets the top three users with the highest score for tennis fever
function fb_displayHighScores2(snaphot2){
    snaphot2.forEach(fb_showOneScore2)
}
//This function gets called for each user entry
//data2 is a single user entry from the snapshot
function fb_showOneScore2(data2){
    let entry2= data2.val()
    document.getElementById('HTML_OUTPUT2').innerHTML += entry2.username + ": " + entry2.Geodashscore + "<br>"
}
if (document.getElementById('HTML_OUTPUT2')){
    fb_readHighScores2() //When it lands on a page that has the id called 'HTML_OUTPUT2' it does the fb_readHighscores2 function
    //In our case this happens when it lands on the GeoDashLeaderboard.html
}