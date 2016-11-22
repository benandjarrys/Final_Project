// Hold Spacebar to raise ball, release to lower

var gameScreen = 0;

// gameplay settings
var gravity = 0.0;
var airfriction = 0.00000;
var friction = 0.1;
var score = 0;

// ball settings
var ballX, ballY;
var ballSpeedVert = 0;
var ballSize = 20;
var ballColor;
var health = 1;
var healthDecrease =1;

// wall settings
var wallSpeed = 5;
var wallInterval = 1000;
var lastAddTime = 0;
var minGapHeight = 200;
var maxGapHeight = 300;
var wallWidth = 80;
var wallColors;
var walls = [];

/********* SETUP BLOCK *********/

function setup() {
  createCanvas(500, 500);
  // set the initial coordinates of the ball
  ballX=width/4;
  ballY=height/5;
  smooth();
  ballColor = color(0);
  wallColors = color(44, 62, 80)
}


/********* DRAW BLOCK *********/

function draw() {
  // Display the contents of the current screen
  if (gameScreen == 0) { 
    initScreen();
  } else if (gameScreen == 1) { 
    gameplayScreen();
  } else if (gameScreen == 2) { 
    gameOverScreen();
  }
  if(keyIsDown(32)) {
    ballY += 4;
  } else if (ballY-=1){
  }
}

/********* SCREEN CONTENTS *********/

function initScreen() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94);
  textSize(15); 
  text("Click to start", width/2, height-30);
}
function gameplayScreen() {
  background(236, 240, 241);
  drawBall();
  applyGravity();
  keepInScreen();
  wallAdder();
  wallHandler();
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

function decreaseHealth() {
  health -= healthDecrease;
  if (health <= 0) {
    gameOver();
  }
}


// This method sets the necessery variables to start the game  
function startGame() {
  gameScreen=1;
}
function gameOver() {
  gameScreen=2;
}

function restart() {
  score = 0;

  ballX=width/4;
  ballY=height/5;
  lastAddTime = 0;
  walls = [];
  gameScreen = 1;
}

function drawBall() {
  fill(ballColor);
  ellipse(ballX, ballY, ballSize, ballSize);
}


function wallAdder() {
  if (millis()-lastAddTime > wallInterval) {
    var randHeight = round(random(minGapHeight, maxGapHeight));
    var randY = round(random(0, height-randHeight));
    // {gapWallX, gapWallY, gapWallWidth, gapWallHeight, scored}
    var randWall = [width, randY, wallWidth, randHeight, 0]; 
    walls.push(randWall);
    lastAddTime = millis();
  }
}
function wallHandler() {
  for (var i = 0; i < walls.length; i++) {
    wallRemover(i);
    wallMover(i);
    wallDrawer(i);
    watchWallCollision(i);
  }
}
function wallDrawer(index) {
  var wall = walls[index];
  // get gap wall settings 
  var gapWallX = wall[0];
  var gapWallY = wall[1];
  var gapWallWidth = wall[2];
  var gapWallHeight = wall[3];
  
  // draw actual walls
  rectMode(CORNER); 
  noStroke();
  strokeCap(ROUND);
  fill(wallColors);
  rect(gapWallX, 0, gapWallWidth, gapWallY, 0, 0, 15, 15);
  rect(gapWallX, gapWallY+gapWallHeight, gapWallWidth, height-(gapWallY+gapWallHeight), 15, 15, 0, 0);
}
function wallMover(index) {
  var wall = walls[index];
  wall[0] -= wallSpeed;
}
function wallRemover(index) {
  var wall = walls[index];
  if (wall[0]+wall[2] <= 0) {
    walls.splice(index, 1);
  }
}

function watchWallCollision(index) {
  var wall = walls[index];
  // get gap wall settings 
  var gapWallX = wall[0];
  var gapWallY = wall[1];
  var gapWallWidth = wall[2];
  var gapWallHeight = wall[3];
  var wallScored = wall[4];
  var wallTopX = gapWallX;
  var wallTopY = 0;
  var wallTopWidth = gapWallWidth;
  var wallTopHeight = gapWallY;
  var wallBottomX = gapWallX;
  var wallBottomY = gapWallY+gapWallHeight;
  var wallBottomWidth = gapWallWidth;
  var wallBottomHeight = height-(gapWallY+gapWallHeight);
// If ball touches a wall, game over
if (
  (ballX+(ballSize/2)>wallTopX) &&
  (ballX-(ballSize/2)<wallTopX+wallTopWidth) &&
  (ballY+(ballSize/2)>wallTopY) &&
  (ballY-(ballSize/2)<wallTopY+wallTopHeight)
  ) {
  decreaseHealth();
}
if (
  (ballX+(ballSize/2)>wallBottomX) &&
  (ballX-(ballSize/2)<wallBottomX+wallBottomWidth) &&
  (ballY+(ballSize/2)>wallBottomY) &&
  (ballY-(ballSize/2)<wallBottomY+wallBottomHeight)
  ) {
  decreaseHealth();
  }
}
  



function applyGravity() {
  ballSpeedVert += gravity;
  ballY += ballSpeedVert;
  ballSpeedVert -= (ballSpeedVert * airfriction);
}
// ball falls and hits the floor (or other surface) 
function makeBounceBottom(surface) {
  ballY = surface-(ballSize/2);
  ballSpeedVert*=-1;
  ballSpeedVert -= (ballSpeedVert * friction);
}
// ball rises and hits the ceiling (or other surface)
function makeBounceTop(surface) {
  ballY = surface+(ballSize/2);
  ballSpeedVert*=-1;
  ballSpeedVert -= (ballSpeedVert * friction);
}

// keep ball in the screen
function keepInScreen() {
  // ball hits floor
  if (ballY+(ballSize/2) > height) { 
    makeBounceBottom(height);
  }
}