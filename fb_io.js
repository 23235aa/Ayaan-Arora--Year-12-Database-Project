var GLOBAL_user; //This is the googles user object
 var authenticationListener; //This is a global varaible that stores the listner
 function fb_login(){ //Ths function sets up a listner for the log in state of the user 
     authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
 }
   function fb_handleLogin(_user){ //This functions runs if the log in state of the user changes, for example if they are logged in or out
     if(_user){
         console.log("User is logged in")
         GLOBAL_user = _user;
         firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).update(
            {
                name: GLOBAL_user.displayName
            }
         );

         
     } else{
         console.log("User is NOT logged in - Starting the popup process")
           fb_popupLogin();
     }
 }
   function fb_popupLogin(){ //Actually runs the google log in
     var provider = new firebase.auth.GoogleAuthProvider();
 
     firebase.auth().signInWithPopup(provider).then((result) => {
         GLOBAL_user = result.user; //Save the user details object to a global variable
         console.log("User has logged in")
     });
 }  