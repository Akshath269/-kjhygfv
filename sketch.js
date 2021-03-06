var ball, ballImage;
var bg, bgImg;
var hoop;
var platform;
var backboard;
hoopX = 500
hoopY = 150
radius = 20;
var powerup=0;
var gravity = 0.7;
var jump=15;
function preload()
{
  bgImg=loadImage("background.jpg")
  ballImage=loadImage("basketball.png")
}

function setup() {
	createCanvas(displayWidth, displayHeight-150);

  bg= createSprite(width/2,height/2-50)
  bg.addImage(bgImg)
  bg.scale=2

  ball=createSprite(mouseX,mouseY,10,10)
  ball.addImage(ballImage)
  ball.scale=0.2
  ball.friction = 0.01;
  ball.restitution= 0.8
  
  //hoop=createSprite(1250,350,50,10)
  //hoop.setCollider("circle",0,0,30)
  //hoop.debug=true

  backboard=createSprite(1320,240,70,180)
  backboard.shapeColor="black"
  backboard.immovable = true;
  backboard.visible=false

  hoopCircle = createSprite(1334, 400, 25, 25);
  rim = createSprite(943,380,10, 25);

  platform = createSprite(20,790,100,20);
  platform.immovable = true;
  platform.shapeColor="red"


  
  
}


function draw() {  
  background(200);

  ball.velocity.y= ball.velocity.y+ gravity;
  ball.velocity.x= ball.velocity.x+0;
  
  /*if(frameCount%100===0){
     createplatform()
  }*/
  ball.bounce(backboard);

  if(keyDown("UP_ARROW")){
    powerup = powerup+0.1;
    powerup = constrain(powerup, 0, 20);
  }
  if ( keyWentUp(UP_ARROW) ){
    ball.velocityY = -jump - powerup;
    ball.velocityX = jump/2 + powerup/2;
  }

  if(ball.position.x > width +20){
    resetLevel()
  }

 if(ball.position.y > height +20){
   resetLevel()
 }
 
  ball.collide(platform)
  drawSprites(); 
}



/*
function createplatform() {
  
  
  ball.x=platform.x
  ball.y=platform.y
  ball.collide(platform)

}*/


function mousePressed(){
  resetLevel();
}


function resetLevel(){
 var randX = random(0, 470);
  var randY = random(255, 600);
  
  platform.position.x = randX;
  platform.position.y = randY;
  
  ball.position.x = randX;
  ball.position.y = randY - 65;
  
  ball.velocity.x = 0;
  ball.velocity.y = 0;
  
  powerup = 0;
  

}