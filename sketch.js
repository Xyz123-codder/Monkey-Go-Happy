
var monkey , monkey_running
var banana ,bananaImage;
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  
  monkey = createSprite(60,350,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(70,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  score = 0;
  survivalTime = 0;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  
}


function draw() {

  background("lightblue");
  stroke("black");
  fill("black");
  textSize(20);
  text("score:" + score,300,100);
  
  stroke("black");
  fill("black");
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time :" + survivalTime,110,50);
  
  monkey.collide(ground);
  
  
  
  if(gameState === PLAY){
     if(ground.x <0){
       ground.x = ground.width/2;
     }
    
    if(keyDown("space")){
      monkey.velocityY = -10;
    }
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destoryEach()
      score = score+1;
      
    }
    
    monkey.velocityY = monkey.velocityY +0.8;
    
    obstacleGroup.setLifetimeEach(-1);
    
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
  }
  
   if(gameState === END){
     obstacleGroup.destroyEach();
     foodGroup.destroyEach();
     ground.visible = false;
     monkey.visible = false;
     
     stroke("red");
     fill("red");
     textSize(30);
     text("Game Over",110,200);
     
   }
  
  
  drawSprites();
}

function food (){
 if(frameCount % 80 === 0) {
   banana = createSprite(400,350,40,10);
   banana.addImage(bananaImage);
   banana.y = Math.round(random(120,200));
   banana.scale = 0.1;
   
   banana.velocityX = -3;
   banana.Lifetime = 200;
   
   foodGroup.add(banana);
}
  
  }

function obstacles (){
  if(frameCount % 100 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.Lifetime = 200;
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
}
  
  }


