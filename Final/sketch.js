// Overall Game Settings

// gameScreen = 0 (Start Screen)
// gameScreen = 1 (Transition)
// gameScreen = 2 (Transition)
// gameScreen = 3 (Game1)
// gameScreen = 4 (Game2)
// gameScreen = 5 (Game3)
// gameScreen = 6 (Game4)
// gameScreen = 7 (All Games)
// gameScreen = 8 (Gameover)


var gameScreen = 0;  
var score = 0;
var health = 1;

var fade = 255;  // Fade screens for transitions
var fade2 =255;
var fade3 =255;

// Top Left Game Mechanics (Player_1)
var player1;
var player1_position;

var wall_speed = 0.15;

// Top Right Game Mechanics (Player_2)
var player2;
var player2_position;

// Bottom Left Game Mechanics (Player_3)
var player3;
var player3_position;

// Bottom Right Game Mechanics (Player_4)
var player4;
var player4_position;


// ############# SETUP ############ \\
  function setup() {
  createCanvas(1600,800);

}
  

//###############################\\
//############# DRAW ############\\
//###############################\\
function draw() {
if (mouseIsPressed){
  fade += -5;
}

// Transition between game states
if(fade < 10){
  startGame();
}
if(fade2 <10){
  transition();
}
if(fade3 <10){
  game1_start();
}
  if (gameScreen === 0) { 
    initScreen();
    } else if (gameScreen == 1) { 
       transitionScreen();
     } else if (gameScreen == 2) { 
        transitionScreen2();
    } else if (gameScreen ==3){
      gameplayScreen();
    }

}

//########## SCREEN CONTENTS ##########\\

function initScreen() {
  
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94, fade);
  textSize(70);
  text("How well can you multitask?", width/2, height/2);
  textSize(15); 
  text("Click and hold to progress", width/2, height-30);

}
function transitionScreen() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94, fade2);
  textSize(80);
  text("Are you Ready?",width/2,height/2);
  fade2 += -1.5;
  if (fade2 == 5 ){
    gameScreen == 2;
    fade2 = fade2 + 250;
  } 
}

function transitionScreen2() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94, fade3);
  textSize(80);
  text("Good Luck.",width/2,height/2);
  fade3 += -1.5;
  if (fade3 <5 ){
    fade3 == 255;
    gameScreen == 3;
  } 
}

function gameplayScreen() {
  background(236, 240, 241);
  
}

function gameOverScreen() {
  background(44, 62, 80);
  textAlign(CENTER);
  fill(236, 240, 241);
  textSize(12);
  text("Your Score", width/2, height/2 - 120);
  textSize(130);
  text(score, width/2, height/2);
  textSize(15);
  text("Click to Try Again", width/2, height-30);
}

function startGame() {
  gameScreen=1;
  fade == 255;
}
function transition(){
  gameScreen=2;
}
function game1_start(){
  gameScreen=3
}
function gameOver() {
  gameScreen=7;
}

/********* INPUTS *********/

function mousePressed() {
  // if we are on the initial screen when clicked, start the game 
  if (gameScreen===0) { 
    if(fade < 10){
      startGame();
    }
    }
  if (gameScreen==2) {
    restart();
  }
}

