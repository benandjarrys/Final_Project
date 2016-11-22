// UP and DOWN arrow keys to change position of square to dodge bullets

var gameScreen = 0;

// gameplay settings
var score = 0;

// square settings
var squareX, squareY;
var squareSpeedVert = 0;
var squareSize = 20;
var squareColor;
var health = 1;
var healthDecrease =1;

// bullet settings
var bulletSpeed = 5;
var bulletInterval = 1000;
var lastAddTime = 0;
var minGapHeight = 200;
var maxGapHeight = 300;
var bulletWidth = 80;
var bulletColors;
var bullets = [];

/********* SETUP BLOCK *********/

function setup() {
  createCanvas(500, 500);
  // set the initial coordinates of the square
  squareX=width/4;
  squareY=height/5;
  smooth();
  squareColor = color(0);
  bulletColors = color(44, 62, 80)
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

  drawsquare();
  bulletAdder();
  bulletHandler();

}


/********* INPUTS *********/
function keyPressed() {
  if (keyCode == UP_ARROW && squareY != 100) {
    squareY -= 50;
  } else if (keyCode == DOWN_ARROW && squareY != 400) {
    squareY += 50;
  }
  return false; // prevent default
}

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

  squareX=width/4;
  squareY=height/5;
  lastAddTime = 0;
  bullets = [];
  gameScreen = 1;
}

function drawsquare() {
  fill(squareColor);
  rect(squareX, squareY, squareSize, squareSize);
}


function bulletAdder() {
  if (millis()-lastAddTime > bulletInterval) {
    var randHeight = round(random(minGapHeight, maxGapHeight));
    var randY = round(random(0, height-randHeight));
    // {gapbulletX, gapbulletY, gapbulletWidth, gapbulletHeight, scored}
    var randbullet = [width, randY, bulletWidth, randHeight, 0]; 
    bullets.push(randbullet);
    lastAddTime = millis();
  }
}
function bulletHandler() {
  for (var i = 0; i < bullets.length; i++) {
    bulletRemover(i);
    bulletMover(i);
    bulletDrawer(i);
    watchbulletCollision(i);
  }
}
function bulletDrawer(index) {
  var bullet = bullets[index];
  // get gap bullet settings 
  var gapbulletX = bullet[0];
  var gapbulletY = bullet[1];
  var gapbulletWidth = bullet[2];
  var gapbulletHeight = bullet[3];
  
  // draw actual bullets
  rectMode(CORNER); 
  noStroke();
  strokeCap(ROUND);
  fill(bulletColors);
  rect(gapbulletX, 0, gapbulletWidth, gapbulletY );
  rect(gapbulletX, gapbulletY+gapbulletHeight, gapbulletWidth, height-(gapbulletY+gapbulletHeight));
}
function bulletMover(index) {
  var bullet = bullets[index];
  bullet[0] -= bulletSpeed;
}
function bulletRemover(index) {
  var bullet = bullets[index];
  if (bullet[0]+bullet[2] <= 0) {
    bullets.splice(index, 1);
  }
}

function watchbulletCollision(index) {
  var bullet = bullets[index];
  // get gap bullet settings 
  var gapbulletX = bullet[0];
  var gapbulletY = bullet[1];
  var gapbulletWidth = bullet[2];
  var gapbulletHeight = bullet[3];
  var bulletScored = bullet[4];
  var bulletTopX = gapbulletX;
  var bulletTopY = 0;
  var bulletTopWidth = gapbulletWidth;
  var bulletTopHeight = gapbulletY;
  var bulletBottomX = gapbulletX;
  var bulletBottomY = gapbulletY+gapbulletHeight;
  var bulletBottomWidth = gapbulletWidth;
  var bulletBottomHeight = height-(gapbulletY+gapbulletHeight);
// If square touches a bullet, game over
if (
  (squareX+(squareSize/2)>bulletTopX) &&
  (squareX-(squareSize/2)<bulletTopX+bulletTopWidth) &&
  (squareY+(squareSize/2)>bulletTopY) &&
  (squareY-(squareSize/2)<bulletTopY+bulletTopHeight)
  ) {
  decreaseHealth();
}
if (
  (squareX+(squareSize/2)>bulletBottomX) &&
  (squareX-(squareSize/2)<bulletBottomX+bulletBottomWidth) &&
  (squareY+(squareSize/2)>bulletBottomY) &&
  (squareY-(squareSize/2)<bulletBottomY+bulletBottomHeight)
  ) {
  decreaseHealth();
  }
}
  



