var player3;
var platform3;
// Acceleration used to make the player's ball move back and forth at an increasing speed
var horizontalAcceleration = 0.02;
var horizontalAccelerationNegative = -0.02;

var gravity = .03;

function setup() {
    createCanvas(1600, 800);
// Making the boundaries immovable and defining them
  boundaryX = createSprite(0,400, 3200, 50);
  boundaryX.immovable=true;
  boundaryY = createSprite(872,0, 50, 1600);
  boundaryY.immovable=true;
// Creating the player and the platform
  player3 = createSprite(1250, 100, 50,50);
  player3.maxSpeed = 1000;

  platform3 = createSprite(1250, 350, 150, 25);
  platform3.immovable=true;
}

function draw() {
  background(255);



// Make the ball bounce off the left wall    
  player3.bounce(boundaryY);
// Increase the ball's horizontal velocity  
  player3.velocity.x += horizontalAcceleration; 
// Increase the ball's vertical velocity 
  player3.velocity.y += gravity; 
  player3.bounce(platform3);



// Make the ball bounce off the platform and gain height
  if(player3.collide(platform3)) {
  player3.velocity.x += random(5);
    s.position.y = height-1;
    s.velocity.y = -abs(s.velocity.y); // when it bounces off the platform, it gains speed
    } 
    
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  
  //bounces off the left wall, and when it does it gains acceleration and goes right
  if(s.position.x<0) {
    s.position.x = 1;
    s.velocity.x = abs(s.velocity.x);   // sets the velocity to an absolute value to simulate a bounce
    horizontalAccelerationNegative = horizontalAcceleration;
    horizontalAcceleration += 0.04;
    player3.velocity.x = player3.velocity.x + horizontalAcceleration;
    
  }
  
  //bounces off the right wall, and when it does it gains acceleration and goes left
  if(s.position.x>width) {
    s.position.x = width-1;
    s.velocity.x = -abs(s.velocity.x);
    horizontalAcceleration = horizontalAccelerationNegative;
    horizontalAccelerationNegative += -0.02;
    }
  
 drawSprites();
 movePlatform3();
 loseGame3();
}
}

// "a" moves the platform to the left, "d" moves the platoform to the right
function movePlatform3(){
  if(keyIsPressed === true && key == "a" && platform3.position.x > 975){
    platform3.position.x += -3;
  }
  if(keyIsPressed === true && key == "d" && platform3.position.x <1500){
    platform3.position.x += 3;
  }
  
}

// Lose the game when the player is under the platform
function loseGame3(){
  if (player3.position.y >platform3.position.y-1){
    player3.remove();
  }
}