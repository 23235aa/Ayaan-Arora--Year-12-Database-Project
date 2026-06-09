var GLOBAL_user;
 var authenticationListener;
 function fb_login(){
     authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
 }
   function fb_handleLogin(_user){
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
   function fb_popupLogin(){
     var provider = new firebase.auth.GoogleAuthProvider();
 
     firebase.auth().signInWithPopup(provider).then((result) => {
         GLOBAL_user = result.user; //Save the user details object to a global variable
         console.log("User has logged in")
     });
 }