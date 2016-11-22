/********* VARIABLES *********/

// We control which screen is active by settings / updating
// gameScreen variable. We display the correct screen according
// to the value of this variable.
// 
// 0: Initial Screen
// 1: Game Screen
// 2: Game-over Screen 

var gameScreen = 0;

// gameplay settings
var gravity = 0.3;
var airfriction = 0.00001;
var friction = 0.1;

// scoring
var score = 0;
var health = 1;
var healthDecrease = 1;

// ball settings
var ballX, ballY;
var ballSpeedVert = 0;
var ballSpeedHorizon = 0;
var ballSize = 20;
var ballColor;

// racket settings
var racketColor;
var racketWidth = 100;
var racketHeight = 10;



/********* SETUP BLOCK *********/

function setup() {
  createCanvas(500, 500);
  // set the initial coordinates of the ball
  ballX=width/4;
  ballY=height/5;
  smooth();

  ballColor = color(0);
  racketColor = color(0);
}


/********* DRAW BLOCK *********/

function draw() {
  // Display the contents of the current screen
  if (gameScreen == 0) { 
    initScreen();

  } else if (gameScreen == 1) { 
    gameplayScreen();
//If ball drops below certain point, game over
    if(ballY > 500){
      decreaseHealth();
    }
  } else if (gameScreen == 2) { 
    gameOverScreen();
  }
}


/********* SCREEN CONTENTS *********/

function initScreen() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94);
  textSize(70);
  text("Flappy Pong", width/2, height/2);
  textSize(15); 
  text("Click to start", width/2, height-30);
}
function gameplayScreen() {
  background(236, 240, 241);
  drawRacket();
  ballSlideSpeed();
  drawBall();
  applyGravity();
  applyHorizontalSpeed();
  printScore();

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
  text("Click to Restart", width/2, height-30);
}


/********* INPUTS *********/

function mousePressed() {
  // if we are on the initial screen when clicked, start the game 
  if (gameScreen==0) { 
    startGame();
  }
  if (gameScreen==2) {
    restart();
  }
}


/********* OTHER FUNCTIONS *********/

// This method sets the necessery variables to start the game  
function startGame() {
  gameScreen=1;
}
function gameOver() {
  gameScreen=2;
}

function restart() {
  score = 0;
  health = health;
  ballX=width/4;
  ballY=height/5;
  ballSpeedVert = 0;
  lastAddTime = 0;
  gameScreen = 1;
}

function drawBall() {
  fill(ballColor);
  ellipse(ballX, ballY, ballSize, ballSize);
}
function drawRacket() {
  fill(racketColor);
  rectMode(CENTER);
  rect(mouseX, mouseY, racketWidth, racketHeight, 5);
}



function decreaseHealth() {
  health -= healthDecrease;
  if (health <= 0) {
    gameOver();
  }
}

//not sure how I'm going to keep track of score yet
function addScore() {
  score++;
}
function printScore() {
  textAlign(CENTER);
  fill(0);
  textSize(30); 
  text(score, height/2, 50);
}

function ballSlideSpeed() {
  //to keep the ball on top of the platform
  var overhead = mouseY - pmouseY; 
  //conditions for the ball to stay on top of the platform
  if ((ballX+(ballSize/2) > mouseX-(racketWidth/2)) && (ballX-(ballSize/2) < mouseX+(racketWidth/2))) {
    if (dist(ballX, ballY, ballX, mouseY)<=(ballSize/2)+abs(overhead)) {
      slideBottom(mouseY);
      ballSpeedHorizon = (ballX - mouseX)/100;
      // racket moving up
      if (overhead<0) {
        ballY+=(overhead/2);
        ballSpeedVert+=(overhead/2);
      }
    }
  }
}
function applyGravity() {
  ballSpeedVert += gravity;
  ballY += ballSpeedVert;
  ballSpeedVert -= (ballSpeedVert * airfriction);
}
function applyHorizontalSpeed() {
  ballX += ballSpeedHorizon;
  ballSpeedHorizon -= (ballSpeedHorizon * airfriction);
}
// ball falls and hits the floor (or other surface) 
function slideBottom(surface) {
  ballY = surface-(ballSize/2);
  ballSpeedVert =0;
  ballSpeedVert -= (ballSpeedVert * friction);
}
// ball is on left side of platform
function slideLeft(surface) {
  ballX = surface+(ballSize/2);
  ballSpeedHorizon*=-0.00001;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}
// ball is on right side of platform
function slideRight(surface) {
  ballX = surface-(ballSize/2);
  ballSpeedHorizon*=-0.00001;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}
