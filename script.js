//firebase.database().ref('/').set(
    //{
        //message: "Hello World"
    //}
//)

function writeForm(){
     //Check if the user is logged in
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
}