// move square over other squares before they disappear

var gameScreen = 0;
//score
var score = 0;

// square settings
var squareX, squareY;
var squareSize = 50;
var health = 1;
var healthDecrease = 1;

// square settings
var t;
var squareSpeed = 5;
var squareInterval = 1000;
var lastAddTime = 0;
var minGapHeight = 200;
var maxGapHeight = 300;
var squareWidth = 80;
var squareColors;
var squares = [];

/********** SETUP ***********/
function setup() {
  createCanvas(500, 500);
  squareX= width/4;
  squareY= height/5;

  squareColors = color(44,62,80);
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
}

function drawSquare(){
  fill(255, 255, 0);
  rect(squareX, squareY, squareSize, squareSize);
}


/********* SCREEN CONTENTS *********/

function initScreen() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94);
  textSize(15); 
  text("Click to start", width/2, height-30);
}
function gameplayScreen(){
  background(23, 240, 241);
  drawSquare();
  squareMovement();
  squareAdder();
  squareHandler();
  
}
/********** INPUTS ***********/
function mousePressed() {
  // if we are on the initial screen when clicked, start the game 
  if (gameScreen==0) { 
    startGame();
  }
  if (gameScreen==2) {
    restart();
  }
}  
/*********** FUNCTIONS **********/
function squareMovement(){
  if (keyIsDown(65))
    squareX-=5;
  if (keyIsDown(68))
    squareX+=5;
  if (keyIsDown(87))
    squareY-=5;
  if (keyIsDown(83))
    squareY+=5;
  
}

function squareAdder() {
t+=1
  if (t == 10) {
    var randHeight = round(random(minGapHeight, maxGapHeight));
    var randY = round(random(0, height-randHeight));
    // {gapsquareX, gapsquareY, gapsquareWidth, gapsquareHeight, scored}
    var randsquare = [width, randY, squareWidth, randHeight, 0]; 
    squares.push(randsquare);
    lastAddTime = millis();
    t === 0;
  }
}
function squareHandler() {
  for (var i = 0; i < squares.length; i++) {
    squareDrawer(i);
    watchsquareCollision(i);
  }
}
function squareDrawer(index) {
  var square = squares[index];
  // get gap square settings 
  var gapsquareX = square[0];
  var gapsquareY = square[1];
  var gapsquareWidth = square[2];
  var gapsquareHeight = square[3];
  
  // draw actual squares
  rectMode(CORNER); 
  noStroke();
  strokeCap(ROUND);
  fill(squareColors);
  rect(random(500), random(500), 50, 50);
  rect(random(500), random(500), 50, 50);
}


function watchsquareCollision(index) {
  var square = squares[index];
  // get gap square settings 
  var gapsquareX = square[0];
  var gapsquareY = square[1];
  var gapsquareWidth = square[2];
  var gapsquareHeight = square[3];
  var squareScored = square[4];
  var squareTopX = gapsquareX;
  var squareTopY = 0;
  var squareTopWidth = gapsquareWidth;
  var squareTopHeight = gapsquareY;
  var squareBottomX = gapsquareX;
  var squareBottomY = gapsquareY+gapsquareHeight;
  var squareBottomWidth = gapsquareWidth;
  var squareBottomHeight = height-(gapsquareY+gapsquareHeight);
// If ball touches a square, game over
if (
  (squareX+(squareSize/2)>squareTopX) &&
  (squareX-(squareSize/2)<squareTopX+squareTopWidth) &&
  (squareY+(squareSize/2)>squareTopY) &&
  (squareY-(squareSize/2)<squareTopY+squareTopHeight)
  ) {
  decreaseHealth();
}
if (
  (squareX+(squareSize/2)>squareBottomX) &&
  (squareX-(squareSize/2)<squareBottomX+squareBottomWidth) &&
  (squareY+(squareSize/2)>squareBottomY) &&
  (squareY-(squareSize/2)<squareBottomY+squareBottomHeight)
  ) {
  decreaseHealth();
  }
}


function decreaseHealth() {
  health -= healthDecrease;
  if (health <= 0) {
    gameOver();
  }
}

/********** SETUP FOR GAME ********/
function startGame() {
  gameScreen=1;
}
function gameOver() {
  gameScreen=2;
}
function restart() {
  gameScreen=1;
  squareX=width/4;
  squareY=height/5;
  lastAddTime = 0;
  squares = [];
  score = 0;
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

