/*******************************************************/
// P5.play: A simple game
// 
// This game can be used as an extra game for the 12COMP
// and 13COMP Databases assessments
//
// Written by Mr Britton
/*******************************************************/
let scoreSavedGeodash = false;
console.log("Running the game");


// End game code
function endGame(_player, _obstacle){
    console.log("Game ended, you got "+score+" points.")
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
    // Put your database writes here:



}

































const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 200;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;


const OBSTACLE_HEIGHT = PLAYER_HEIGHT;
const OBSTACLE_WIDTH = PLAYER_WIDTH;

var spawnDist = 0;
var nextSpawn = 0;
var score = 0;
var player;
  
var screenSelector = "start";  

var obstacles;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    cnv= new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    obstacles = new Group();

    floor =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's');
    floor.color = color("black");
    world.gravity.y = 80;
    
    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            }else{
                if(player.y > 184 ){// 184 - found from testing - floor level
                    player.vel.y = -20;
                }
            }
    });

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if(screenSelector=="game"){
        gameScreen();
    }else if(screenSelector=="end"){
        endScreen();
    }else if(screenSelector=="start"){
        startScreen();
    }else{
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function newObstacle(){
    obstacle = new Sprite((SCREEN_WIDTH + 50),  SCREEN_HEIGHT - OBSTACLE_HEIGHT/2, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    obstacle.color = color("yellow");
    obstacle.vel.x = -10;
    
    obstacles.add(obstacle);
}

// Main screen functions

function startScreen(){
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to the game", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110);    textSize(24);
    text("Press space to jump", 50, 150);
}

function gameScreen(){
    background("#C39BD3");
    allSprites.visible = true;
    score++;
    if(frameCount> nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(10,100);
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen(){
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Too bad :-(", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
   if(!scoreSavedGeodash){//checks if scoreSaved is still false
    scoreSavedGeodash = true;// Turns the scoreSaved to true so the if statment can't be triggered again
		//This stops the score being saved multiple times
    saveScoreGeodash() //Tells it to go to saveScoreGeodash function
   }
}
async function saveScoreGeodash(){
	//Await waits until ifrebase gets the information from the userInfo branch
	var snapshot = await firebase.database().ref('/Highscores/userInfo/' + GLOBAL_user.uid).once('value');	
    var userDataGeodash = snapshot.val(); //.val turns the snapshot into a usable object and we strore that object in a varaible
	//Here it writes the info into a new branch called tennis fever. We await(pause) until the info is actually done
	//Then we console log "save score" to see if it worked
    await firebase.database().ref('/Highscores/Geodash/' + GLOBAL_user.uid).update({
        username: userDataGeodash.username, //Gets the username from the varaible we stored the snapshot in
        userAge: userDataGeodash.age, //Gets the age from the varaible we stored the snapshot in
        Geodashscore: score * -1 // We multiply the score by negative 1 so the scores are stored in negative. This helps display them in order
    });
	console.log("score saved")
}

function resetGame(){
    player = new Sprite(PLAYER_WIDTH*1.2,  SCREEN_HEIGHT/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.color = color("purple");
    player.collides(obstacles, endGame);
    score = 0;
}

/*******************************************************/
//  END OF APP
/*******************************************************/