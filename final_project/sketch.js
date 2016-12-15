//########## Global Game Settings ##########\\
var health = 10;
var score = 0;
var score_increase = 0.015;
var final_score= 0;
var time;
gameOver = false;



// Overall Game Settings

var fade = 255;
var fade2 = 255;
var fade3 = 255;
var fade4 = 255;
var fade5 = 255;
var fade6 = 255;

// gameScreen = 1 (Start Screen)
// gameScreen = 2 (Tutorial)
// gameScreen = 3 (Tutorial Game 1)
// gameScreen = 4 (Tutorial Game 2)
// gameScreen = 5 (Tutorial Game 3)
// gameScreen = 6 (Full Game)
// gameScreen = 7 (Gameover)
var gameScreen = 0;



//    ################################################################### \\
//    ####################  GAME 1 GLOBAL VARIABLES  #################### \\
//    ################################################################### \\
// player1
var player1;
var player1_position = 300;

// wall_top and wall_bottom base speed
var wall_speed = 0.10;


//    ################################################################### \\
//    ####################  GAME 2 GLOBAL VARIABLES  #################### \\
//    ################################################################### \\
// player2
var player2;
var player2_position_y = 600;
var player2_position_x = 600;


//    ################################################################### \\
//    ####################  GAME 3 GLOBAL VARIABLES  #################### \\
//    ################################################################### \\
// player3
var player3;
var platform3;

// Acceleration used to make the player's ball move back and forth at an increasing speed
var horizontalAcceleration = 0.01;
var horizontalAccelerationNegative = -0.01;

// Controls verticle acceleration
var gravity = .01;


function preload(){
  tutorial = loadImage("assets/tutorial0001.png");
}

//___________________________________________________________________________________\\
//                        ########## SETUP ##########

function setup() {
  createCanvas(1600, 800);

  //Keep the Games Separate with immovable boundaries
  boundaryX = createSprite(0, 400, 3200, 50);
  boundaryX.immovable = true;
  boundaryY = createSprite(872, 0, 50, 1600);
  boundaryY.immovable = true;


  //    ######################################################## \\
  //    ####################  GAME 1 SETUP  #################### \\
  //    ######################################################## \\

  // Walls
  wall_top = createSprite(10, 200);
  wall_top.addAnimation("normal", "assets/sun1.png", "assets/sun3.png");
  wall_bottom = createSprite(10, 100);
  wall_bottom.addAnimation("normal", "assets/sun1.png", "assets/sun3.png");

  
  // Create the Player  
  player1 = createSprite(50, 50);
  player1.addAnimation("normal", "assets/asterisk_explode0008.png", "assets/asterisk_explode0011.png");


  //    ######################################################## \\
  //    ####################  GAME 2 SETUP  #################### \\
  //    ######################################################## \\

  // Player
  player2 = createSprite(200, 500, 25, 25);
  player2.addAnimation("normal", "assets/pone_0001.png", "assets/pone_0004.png");

  // Enemy
  enemy = createSprite(700, 550, 100, 100);
  enemy.addAnimation("normal", "assets/ghost_spin0001.png", "assets/ghost_spin0003.png");

  //    ####################################################### \\
  //    ####################  GAME 3 SETUP #################### \\
  //    ####################################################### \\

  // Creating player3 and setting base speed (Ball)
  player3 = createSprite(1250, 100, 50, 50);
  player3.maxSpeed = 1000;
  player3.addAnimation("normal", "assets/cloud_pulsing0001.png", "assets/cloud_pulsing0004.png");
  

  // Creating Platform
  platform3 = createSprite(1250, 370, 150, 25);
  platform3.immovable = true;


}

// DRAW FUNCTION \\


function draw() {
  background(236, 240, 241);
  forward();
  // GAMEOVER
  if (gameOver === true) {
    background(0);
    fill(random(255), random(255), random(255), random(255));
    rect(400, 200, 800, 375);
    textAlign(CENTER);
    textSize(100);
    fill(255);
    text("You survived for", 800, 300);
    text("Seconds", 800, 500);
    text(time, 800, 400)
    textSize(60);
    text("Press Any Key To Restart", 800, 650);
    restart();
  }
}

//    ############################################################ \\
//    ####################  GAME 1 FUNCTIONS  #################### \\
//    ############################################################ \\

// Control the player1 "w"= move up  "s"= move down
function keyTyped() {
  if (key == 'w' && player1_position > 0) {
    player1_position = player1_position - 50;
  }
  if (key == 's' && player1_position < 350) {
    player1_position = player1_position + 50;
  }
}

// Call and delete wall_top
function kill_wall_top() {
  if (wall_top.position.x > 800) {
    wall_top.position.x = 0;
    wall_top.velocity.x = 0.5;
  }
  if (wall_top.position.x === 0) {
    wall_top.position.y = random(350);
  }
}

// Call and delete wall_bottom
function kill_wall_bottom() {
  if (wall_bottom.position.x > 800) {
    wall_bottom.position.x = 0;
    wall_bottom.velocity.x = 0.5;
  }
  if (wall_bottom.position.x === 0) {
    wall_bottom.position.y = random(350);
  }
}


//    ############################################################ \\
//    ####################  GAME 2 FUNCTIONS  #################### \\
//    ############################################################ \\


// Controlling the player's movements: Follow mouse
function player2_Movement() {
  player2.attractionPoint(2, mouseX, mouseY);
  player2.maxSpeed = 4;
}

// Kills the player if the Big Square touches them



//    ############################################################ \\
//    ####################  GAME 3 FUNCTIONS  #################### \\
//    ############################################################ \\

// "a" moves the platform to the left, "d" moves the platform to the right
function movePlatform3() {
  if (keyIsPressed === true && key == "a" && platform3.position.x > 975) {
    platform3.position.x += -3;
  }
  if (keyIsPressed === true && key == "d" && platform3.position.x < 1500) {
    platform3.position.x += 3;
  }

}


//    ############################################################ \\
//    #####################  MAIN FUNCTIONS  ##################### \\
//    ############################################################ \\


// Lose the game when the player is under the platform
function loseGame() {
  if (player1.overlap(wall_top) || player1.overlap(wall_bottom) || player2.overlap(enemy) || player3.position.y > platform3.position.y - 1) {
    health === 0;

    gameOver = true;
  }
}

/// The function being called to run the entire program.

function forward() {
  if (mouseIsPressed) {
    fade += -5;
  }
print(gameScreen);
  // Transition between game states
  if (fade < 10) {
    startGame(); 
  }
  if (fade2 == 10) {
    tutorial1_start();
  }
  if (fade3 < 10) {
    tutorial2_start();
  }
  if (fade4 < 10) {
    tutorial3_start();
  }
  if (fade5 < 10) {
    transitionScreen2();
  }
  if (fade6 < 10) {
    full_game();
}

  if (gameScreen === 0) {
    initScreen();
  } else if (gameScreen == 1 && fade2 > 10) {
    transitionScreen();
  }



}



function initScreen() {

  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94, fade);
  textSize(70);
  text("How well can you multitask?", width / 2, height / 2);
  textSize(15);
  text("Click and hold to progress", width / 2, height - 300);
  fade += -1.25;
  if (fade < 5) {
    gameScreen == 1;
  }

}

function transitionScreen() {
  background(236, 240, 241);
  textAlign(CENTER);
  fill(52, 73, 94, fade2);
  textSize(80);
  text("Let's begin with a tutorial.", width / 2, height / 2);
  fade2 += -1.25;
  if (fade2 < 10) {
    gameScreen = gameScreen + 1;
  }
}


function tutorial1_start() {
  background(236, 240, 241);
  image(tutorial);
  textAlign(CENTER);
  fill(52, 73, 94, fade3);
  textSize(80);
  text("Use the 'W' and 'S' keys to avoid the fire", width / 2, height / 2);
  fade3 += -1.25;
  if (fade3 < 5) {
    fade3 == 255;
    gameScreen == 3;
  }

}

function tutorial2_start() {
  background(236, 240, 241);
  image(tutorial);
  textAlign(CENTER);
  fill(52, 73, 94, fade4);
  textSize(80);
  text("Use your mouse to avoid the ghost", width / 2, height / 2);
  fade4 += -1.25;
  if (fade4 < 5) {
    fade4 == 255;
    gameScreen == 4;
   
  }

}

function tutorial3_start() {
  background(236, 240, 241);
  image(tutorial);
  textAlign(CENTER);
  fill(52, 73, 94, fade5);
  textSize(80);
  text("Keep the cloud bouncing with 'A' and 'D' keys", width / 2, height / 2);
  fade5 += -1.25;
  if (fade5 < 5) {
    fade5 == 255;
    gameScreen == 5;

  }
}

function transitionScreen2() {
  background(236, 240, 241);
  image(tutorial);
  textAlign(CENTER);
  fill(52, 73, 94, fade6);
  textSize(80);
  text("Good Luck.", width / 2, height / 2);
  fade6 += -1;
  if (fade6 == 5) {
    gameScreen == 6;
  }
}

function full_game() {
  background(236, 240, 241);
  fill(0);
  rect(850, 400, 1600, 800);
  textSize(50);
  fill(255, 0, 0);
  time = round(score,1)
  textAlign(RIGHT);
  text("Time Ellapsed:", 1250, 475);
  textAlign(CENTER);
  text(time, 1300, 475);
  game_1();
  game_2();
  game_3();
  if (gameOver === false){
    score = score + 0.015;
  }
  print(time);

}








// #################################### \\
// ########## FUNCTION CALLS ########## \\
// #################################### \\


function startGame() {
  gameScreen = 1;
}

function transition() {
  gameScreen = 1;
}

function tutorial1_end() {
  gameScreen = 2
}

function tutorial2_end() {
  gameScreen = 3
}

function tutorial3_end() {
  gameScreen = 4
}

function full_game_end() {
  gameScreen = 5
}

function gameOver() {
  gameScreen = 7;
}

/********* INPUTS *********/

function mousePressed() {
  // if we are on the initial screen when clicked, start the game 
  if (gameScreen === 0) {
    if (fade < 10) {
      startGame();
    }
  }
}

function restart() {
  if (keyIsPressed) {
    gameScreen = 0;
    gameOver = false;
    score = 0;
    player3.position.x = 1250;
    player3.position.y = 100;
    player3.velocity.x = 0.5;
    player3.velocity.y = 0.5;
    enemy.position.x = 700;
    enemy.position.y = 550;
    player2.position.x = 200;
    player2.position.y = 600;
    score_increase = 0.015;
  }
}


function game_1() {

  //    ####################################################### \\
  //    ####################  GAME 1 DRAW  #################### \\
  //    ####################################################### \\

  wall_top.overlap(boundaryY);
  wall_bottom.overlap(boundaryY);

  // Gradually increase the Incoming Walls' velocity
  wall_top.velocity.x += wall_speed;
  wall_bottom.velocity.x += wall_speed;

  // Keep the player in the same spot, giving only control of Up and Down Keys  
  player1.position.x = 800;
  player1.position.y = player1_position;
  player1.collide(wall_top);
  player1.collide(wall_bottom);

  // Kill the player if any walls touch them
  if (player1.overlap(wall_top)) {
    health = 0;
  }
  if (player1.overlap(wall_bottom)) {
    health = 0;
  }


  kill_wall_top();
  kill_wall_bottom();
  drawSprites();
  loseGame();
}

function game_2() {

  //    ####################################################### \\
  //    ####################  GAME 2 DRAW  #################### \\
  //    ####################################################### \\


  // Make Player and Enemy collide with boundaryX and boundaryY
  player2.collide(boundaryX);
  enemy.collide(boundaryX);

  player2.collide(boundaryY);
  enemy.collide(boundaryY);

  // Make Enemy Follow Player 
  player2.overlap(enemy);
  enemy.attractionPoint(0.01, player2.position.x, player2.position.y); // make the big square follow the player

  // Make ghost spin
  enemy.rotation-= 10;

  enemy.maxSpeed = 1;

  // Game 2: Function Calls

  player2_Movement();

  loseGame();

}

function game_3() {

  //    ####################################################### \\
  //    ####################  GAME 3 DRAW  #################### \\
  //    ####################################################### \\

  // Make the ball bounce off the left wall    
  player3.bounce(boundaryY);

  // Increase the ball's horizontal velocity  
  player3.velocity.x += horizontalAcceleration;
  
  // Increase the ball's vertical velocity 
  player3.velocity.y += gravity;
  player3.bounce(platform3);

  // Make the ball bounce off the platform and gain height
  if (player3.collide(platform3)) {
    player3.velocity.x += random(5);
    s.position.y = height - 1;
    s.velocity.y = -abs(s.velocity.y); // when it bounces off the platform, it gains speed
  }

  // Summon random  
  for (var i = 0; i < allSprites.length; i++) {
    var s = player3;

    //bounces off the left wall, and when it does it gains acceleration and goes right
    if (s.position.x < 0) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x); // sets the velocity to an absolute value to simulate a bounce
      horizontalAccelerationNegative = horizontalAcceleration;
      horizontalAcceleration += 0.04;
      player3.velocity.x = player3.velocity.x + horizontalAcceleration;

    }

    //bounces off the right wall, and when it does it gains acceleration and goes left
    if (s.position.x > width) {
      s.position.x = width - 1;
      s.velocity.x = -abs(s.velocity.x);
      horizontalAcceleration = horizontalAccelerationNegative;
      horizontalAccelerationNegative += -0.02;
    }
    movePlatform3();
    loseGame();
  }
}