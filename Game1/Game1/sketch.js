var player1;
var player1_position = 200;
var wall_speed = 0.15;
var health = 1;

function setup() {
  createCanvas(1600,800);
//Keep the Game in the Top Left Corner
  boundaryX = createSprite(0,400, 3200, 50);
  boundaryY = createSprite(872,0, 50, 1600);
  // ########## Game 1 Settings
    // Walls
    wall_top = createSprite(10,200);
    wall_bottom = createSprite(10,100);
  
// Create the Player  
    player1 = createSprite(50, 50);
    player1.addAnimation("normal","assets/pone_0001.png", "assets/pone_0004.png");
    

}

function draw() {
  background(236, 240, 241);
  
wall_top.overlap(boundaryX);
wall_bottom.overlap(boundaryY);

// Gradually increase the Incoming Walls' velocity
  wall_top.velocity.x += wall_speed;
  wall_bottom.velocity.x += wall_speed;
  
// Keep the player in the same spot, giving only control of Up and Down Keys  
  player1.position.x = 650;
  player1.position.y = player1_position;
  player1.collide(wall_top);
  player1.collide(wall_bottom);
  
// Kill the player if any walls touch them
  if (player1.overlap(wall_top)){
    health = 0;
}
  if (player1.overlap(wall_bottom)){
    health = 0;
}
  if(health === 0){
    player1.life = 0;
  }
// For collision-detection checking: Will be removed in final.
  player1.debug = mouseIsPressed;
  wall_top.debug = mouseIsPressed;
  wall_bottom.debug = mouseIsPressed;
 

kill_wall_top();  
kill_wall_bottom();
drawSprites();

}

// Control the Player

function keyTyped() {
  if (key == 'w' && player1_position > 0) {
    player1_position= player1_position - 50;
  }
  if (key == 's' && player1_position < 350) {
    
    player1_position= player1_position + 50;
}
}


// Call one of the walls, as well as delete it when it reaches the end
function kill_wall_top() {
  if(wall_top.position.x > 800)
    wall_top.position.x = 0;
  if(wall_top.position.x === 0)
    wall_top.position.y = random(350);
  if(wall_top.velocity.x > 15.5){
    wall_top.velocity.x = 1
}
}

// Call one of the walls, as well as delete it when it reaches the end
function kill_wall_bottom() {
  if(wall_bottom.position.x > 800)
    wall_bottom.position.x = 0;
  if(wall_bottom.position.x === 0)
    wall_bottom.position.y = random(350);
  if(wall_bottom.velocity.x > 15.5){
    wall_bottom.velocity.x = 1
}
}