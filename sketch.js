var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var invisibleGround;

function preload(){
  
  monkey_running =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("jungle.jpg")
 
}

function setup() {
  createCanvas(500,500);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.velocityX = -4;
  invisibleGround.x = invisibleGround.width/2;
  console.log(invisibleGround.x);
  invisibleGround.visible = false;
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {

  background(225);
  
  
  
  if (invisibleGround.x<0) {
    invisibleGround.x = invisibleGround.width/2;
  }
  
  if (ground.x<0) {
    ground.x = ground.width/2;
  }
  
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
  
 
  
  if(obstaclesGroup.isTouching(monkey)){
        invisibleGround.velocityX = 0;
        monkey.velocityY = 0;
        invisibleGround.visible = false;
        monkey.scale = 0.1;
 }
  
  banana1();
 obstacles();
  
  if (FoodGroup.isTouching(monkey)) {
    monkey.scale = 0.2;
    score = score+2;
  }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 400,50);
  
}

function banana1 () {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,360,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.10;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    monkey.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
    
    
  }
}

function obstacles () {
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=200;
    
    obstaclesGroup.add(obstacle);
  }
}