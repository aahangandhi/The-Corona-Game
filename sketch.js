var mask1, mask2, maskIMG;
var border;
var cHeight, cWidth;
var corona;
var death = 0, gameState = "play", health = 100, masks = 0;
var coronaGroup

function preload() {
  maskIMG = loadImage("mask.png")
  coronaIMG = loadImage("corona.png")
}

function setup() {
  cHeight = displayHeight-142.5;
  cWidth = displayWidth;

  createCanvas(cWidth,cHeight);

  border = createSprite(cWidth/2,cHeight*7/8 + 10,cWidth,5);
  border.shapeColor = "blue";

  mask1 = createSprite(cWidth/2,cHeight-150,20,20);
  mask1.addImage(maskIMG);
  mask1.scale = 0.3

  mask2 = createSprite(100000000,cHeight-150,20,20);
  mask2.addImage(maskIMG);
  mask2.scale = 0.3;

  coronaxpos = Math.round(random(10,cWidth-10));

  coronaGroup = new Group();

}


















function draw() {
  background("red")

  if(gameState!="end"){
  if (frameCount % 90 === 0) {
    var coronaxpos = random(10,cWidth-10)
    var corona = createSprite(coronaxpos,-10,40,10);    
    corona.addImage(coronaIMG);
    corona.scale = 0.1;
    corona.velocityY = 8;
    coronaGroup.add(corona)
  }
}

    if(coronaGroup.isTouching(border))
    {
      health = health - 10
      death = death + 10;
      coronaGroup.destroyEach();
    }

  if(health<100){
    if(coronaGroup.isTouching(mask1)||
    coronaGroup.isTouching(mask2))
    {
      health = health + 10
      death = death - 10;
    }
  }

  if(coronaGroup.isTouching(mask1)||
    coronaGroup.isTouching(mask2))
    {
      coronaGroup.destroyEach();
    }
    // =============
    // moving mask 1
    // =============
    
  if(keyDown("right")&&gameState!=="end")
  {
    mask1.x = mask1.x + 10;
  }

  if(keyDown("left")&&gameState!=="end")
  {
    mask1.x = mask1.x - 10;
  }

    // =============
    // changing state
    // =============

    if (health===0){
      textSize(35)
    fill('green')
text("Corona cought you and you have died; but no problem follow all precautions and you will be safe",cWidth*1/66,cHeight*2/5)
text("India will win, Corona will lose",cWidth*9/25,cHeight*2/4)
textSize(20)
  fill('blue')
  text("If you want to play again press 'Space'",cWidth*2/5,cHeight*4/7);
    gameState="end";
    coronaGroup.velocityY = -8
    if(keyCode === 32){
      window. location. reload()
    }
    }

    if(gameState==="end"&&health>95){
      textSize(35)
      fill('green')
    text("Great Job! You now have full health. Double masks up and reduce the spread of COVID-19",cWidth*1/26,cHeight*2/5)
    text("India will win, Corona will lose",cWidth*9/25,cHeight*2/4)
    textSize(20)
      fill('blue')
      text("If you want to play again press 'Space'",cWidth*2/5,cHeight*4/7);
      coronaGroup.velocityY = -8
      if(keyCode === 32){
        window. location. reload()
      }
    }

    if(death===50&&gameState==="play"){
      gameState="twoMasks"
    }

    if(gameState==="twoMasks"){
      mask2.x = World.mouseX
    }


  if(gameState==="twoMasks"&&health>95){
    gameState="end";
  }

  fill('yellow')
  textSize(20)
  text("Health = "+health,cWidth*1/6,cHeight*1/10)
  text("Weakness = "+death,cWidth*3/4,cHeight*1/10)

  if(gameState==="twoMasks"){
  textSize(23.5)
      fill('white')
      text("Your masks have been doubled up, which gives you extra protection. Control the other mask using your mouse or finger depending on the device",cWidth*1/100,cHeight*24/25)
  }

  drawSprites();
}
