var t; // Intervals in which Squares will Spawn
var health = 10;
var direction_change = 90;
var s;
var player2;
var player2_position_y = 600;
var player2_position_x = 600;

function setup() {
  createCanvas(1600, 800);
  player2 = createSprite(200, 500, 25, 25); // Player
  s = createSprite(700, 450, 100, 100); // Square to avoid
// Keep the Game in the Bottom Left Corner
  boundaryX = createSprite(0,400, 3200, 50);
  boundaryY = createSprite(872,0, 50, 1600);
}

function draw() {
  background(255, 255, 255);
  print(log(health));
// Make the two objects interact
player2.collide(boundaryX);
s.collide(boundaryX);

player2.collide(boundaryY);
s.collide(boundaryY);


  player2.overlap(s);
  s.attractionPoint(0.01, player2.position.x, player2.position.y); // make the big square follow the player
  s.maxSpeed = 1;

drawSprites();
player2_Movement();
squashed();
}

// Controlling the player's movements
function player2_Movement(){
  
  player2.attractionPoint(2, mouseX, mouseY);
  player2.maxSpeed = 4;
  
}

// Kills the player if the Big Square touches them
function squashed (){
  if (s.overlap(player2)){
    player2.remove();
    health += -1;
  }
}

