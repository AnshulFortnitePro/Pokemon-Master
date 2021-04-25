

var hero , sword,  drag1b, drag4B, drag3B ,drag2b ,swordGroup;
var heroimage, swordimage, drag3image, drag1image, drag4image ,drag2image, bg;
var gameOver , gameOverimg,restart,restartimage;
PLAY = 1;
END =0;
var start;
var gameState = "serve";


function preload(){
  
  bg = loadImage("bg.jpg");
  
  swordimage = loadImage("pokeball.png");
  heroimage = loadImage("ash.png");
  drag1image = loadImage("pokemon1.png");
  drag3image = loadImage("pokemon3.png");
  drag4image = loadImage("pokemon4.png");
  drag2image = loadImage("pokemon2.png");

  gameOverimg = loadImage("game over.png");
  restartimg = loadImage("restart.png");
  gameOverSound = loadSound("game over.wav");
  slashingSound = loadSound("Pokeball Catch.mp3");
  
}



function setup() {
  createCanvas(displayWidth, displayHeight);
  
  //creating background
  //background = createSprite(0,0,600,600);
 // background.addImage(bg);
 // background.scale = 2.5
  
  // creating bow to shoot arrow
  hero = createSprite(80,220,20,50);
  hero.addImage(heroimage); 
  hero.scale = 0.4;

  
   score = 0 ;
   drag1b= new Group();
   drag3b= new Group();
   drag2b= new Group();
   drag4b= new Group();
  swordGroup= new Group();

  restart = createSprite(displayWidth/2,displayHeight/2+50);
  restart.addImage(restartimg);
  restart.scale = 0.3;

  gameOver = createSprite(displayWidth/2,displayHeight/2-40);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 1;
 
  
}

function draw() {

   // moving ground
    //background.velocityX = -3 
    background(bg);
    //if (background.x < 0){
    //  background.x = background.width/2;
    //}
  
   //moving bow
  
  
   // release arrow when space key is pressed
   if(gameState === "serve"){


  fill("red");
  textSize(50);
  text("Press Up Arrow to shoot Pokeballs",350,150);
  fill("orange");
  textSize(50);
  text("Press Down Arrow to start the game",350,350);
  
  restart.visible = false;
  gameOver.visible = false;
}
if(keyDown("DOWN_ARROW") && gameState === "serve"){
  //serve();
  gameState = PLAY;
  
}

if (gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;
  hero.y = World.mouseY
   if (keyDown("UP_ARROW")) {
    createsword();
    
  }
  
  //creating continous enemies
  var select_dragon = Math.round(random(1,4));
  
  if (World.frameCount % 60 == 0) {
    if (select_dragon == 1) {
      dragon1();
    } else if (select_dragon == 2) {
      dragon2();
    } else if (select_dragon == 3) {
      dragon3();
    } else {
      dragon4();
    }
  }

if(swordGroup.isTouching(drag1b))
  {
    slashingSound.play();
    drag1b.destroyEach();
    swordGroup.destroyEach();
    score = score+1;
    
  }
  
  if(swordGroup.isTouching(drag2b))
  {
    slashingSound.play();
    drag2b.destroyEach();
    swordGroup.destroyEach();
    score = score+1;
   
  }
  
  if(swordGroup.isTouching(drag3b))
  {
    slashingSound.play();
    drag3b.destroyEach();
    swordGroup.destroyEach();
    score = score+1;
   
  }
  
  if(swordGroup.isTouching(drag4b))
  {

    slashingSound.play();
    drag4b.destroyEach();
    swordGroup.destroyEach();
    score = score+1;
   
  }

  if(hero.isTouching(drag1b) || hero.isTouching(drag2b) || hero.isTouching(drag3b) || hero.isTouching(drag4b) ){
    gameState = END;
   // sound.stop();
    gameOverSound.play();
  } 
}
else if (gameState === END){

  //sound.stop();
  
  gameOver.visible = true;
  restart.visible = true;
  drag1b.setVelocityXEach(0);
  drag1b.setVisibleEach = false;
  drag2b.setVelocityXEach(0);
  drag2b.setVisibleEach = false;
  drag3b.setVelocityXEach(0);
  drag3b.setVisibleEach = false;
  drag4b.setVelocityXEach(0);
  drag4b.setVisibleEach = false;
  swordGroup.setVelocityXEach(0);
  if(mousePressedOver(restart)) {
    reset();
  }
}
  drawSprites();
  fill("cyan");
  textSize(30);
    text("Pokemons Caught: "+ score, 1000,50);
}


function dragon1() {
  var drag1 = createSprite(1200,Math.round(random(20, 370)), 10, 10);
  drag1.addImage(drag1image);
  drag1.velocityX = -5;
  drag1.lifetime = 300;
  drag1.scale = 0.3;
  drag1b.add(drag1);
  
  
}

function dragon2() {
  var drag2 = createSprite(1200,Math.round(random(20, 370)), 10, 10);
  drag2.addImage(drag2image);
  drag2.velocityX = -5;
  drag2.lifetime = 300;
  drag2.scale = 0.4;
  drag2b.add(drag2);
  
}

function dragon3() {
  var drag3 = createSprite(1200,Math.round(random(20, 370)), 10, 10);
  drag3.addImage(drag3image);
  drag3.velocityX = -5;
  drag3.lifetime = 300;
  drag3.scale = 0.3;
  drag3b.add(drag3); 
   
}

function dragon4() {
  var drag4 = createSprite(1200,Math.round(random(20, 370)), 10, 10);
  drag4.addImage(drag4image);
  drag4.velocityX = -5;
  drag4.lifetime = 300;
  drag4.scale = 0.3
  drag4b.add(drag4);
  
}


// Creating  arrows for bow
 function createsword() {
  var sword = createSprite(100, 100, 60, 10);
  sword.addImage(swordimage);
  sword.x = 360;
  sword.y= hero.y;
  sword.velocityX = 4;
  sword.lifetime = 1200;
  sword.scale = 0.1;
   swordGroup.add(sword);
   
   sword.setCollider("rectangle",0,0,400,sword.height);
}

function reset(){
  gameState = "serve" ;
  
 gameOver.visible = false;
  restart.visible = false;
  
 
  score = 0;
}
