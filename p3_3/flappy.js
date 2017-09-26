// the functions associated with preload, create and update.
var actions = { preload: preload, create: create, update: update };
// the Game object used by the phaser.io library
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
// Global score variable initialised to 0.
var score = 0;
// Global variable to hold the text displaying the score.
var labelScore;
// Global player variable declared but not initialised.
var player;
//more random text
var probA = 1000000;
//more random text
var probB = 1000000;
//more random text
var probC = 1000000;
//more random text
var allProb = probA + probB + probC;
//more random text
var objectA;
//more random text
var objectB;
//even more random text
var objectC;
// the interval (in seconds) at which new pipe columns are spawned
var secondCount = 1.00;

var locationX = 0;

var locationY = 0;

var velocityX = 0;

var velocityY = 0;

var scoreCount = 0;

var scoreCountNumb;

var waitTime = 3.00;

// Loads all resources for the game and gives them names.
function preload() {
    // make image file available to game and associate with alias playerImg
    game.load.image("playerImg","../p3_3/Hoop4.png");
    // make image file available to game and associate with alias playerImg
    game.load.image("nameB","../p3_3/basket.png");
    //gyuigfyu
    game.load.image("nameC","../p3_3/netball.png");
    //gyuigfyu
    game.load.image("nameA","../p3_3/foot.png");
}

// Initialises the game. This function is only called once.
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FFFFFF");
    // add welcome text
    game.add.text(20, 20, "Welcome to my game",
        {font: "30px Arial", fill: "#FFFFFF"});
    // add score text
    labelScore = game.add.text(20, 60, "0",
        {font: "30px Arial", fill: "#000000"});
    // initialise the player and associate it with playerImg
    scoreCountNumb = game.add.text(700, 60, "0",
        {font: "30px Arial", fill: "#000000"});
    // initialise the player and associate it with playerImg
    player = game.add.sprite(80, 200, "playerImg");
    // Start the ARCADE physics engine.
    // ARCADE is the most basic physics engine in Phaser.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // enable physics for the player sprite
    game.physics.arcade.enable(player);
    // associate spacebar with jump function
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(playerUp);
    // associate spacebar with jump function
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(playerDown);
    // associate spacebar with jump function
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(playerLeft);
    // associate spacebar with jump function
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(playerRight);
    // time loop for game to update
    game.time.events.loop(secondCount * Phaser.Timer.SECOND, changeScore);
    //Random meaningless text to seperate lines in a neat fashion
    game.add.text(500, 20, "Random text",
        {font: "30px Arial", fill: "#555555"});
    //vnuostpgfeh
    game.time.events.loop(waitTime * Phaser.Timer.SECOND, sidePick);
}
// This function updates the scene. It is called for every new frame.
function update() {
    // Call gameOver function when player overlaps with any pipe

    if(scoreCount < 0){
      gameOver();
    }

    if(scoreCount >= 12){
      probA = 500000
      probB = 1500000
    }else{
      probA = 1000000
      probB = 1000000
      //I am assuming when the score is below 12, the chances are reset
    }

    game.physics.arcade
        .overlap(player,
            objectA,
            changeScoreCountA);

    game.physics.arcade
        .overlap(player,
            objectB,
            changeScoreCountB);

    game.physics.arcade
        .overlap(player,
            objectC,
            changeScoreCountC);

    if(score == 10) {
      game.stage.setBackgroundColor("#00FF00");
    }

    if(score == 5){
      game.add.text(500, 20, "Random text",
          {font: "30px Arial", fill: "#000000"});
    }

}

function playerUp() {
    // the more negative the value the higher it jumps
    player.body.velocity.x = 0;
    player.body.velocity.y = -125;
}

function playerDown() {
    // the more negative the value the higher it jumps
    player.body.velocity.x = 0;
    player.body.velocity.y = 125;
}

function playerLeft() {
    // the more negative the value the higher it jumps
    player.body.velocity.y = 0;
    player.body.velocity.x = -125;
}

function playerRight() {
    // the more negative the value the higher it jumps
    player.body.velocity.y = 0;
    player.body.velocity.x = 125;
}

// Function to change the score
function changeScore() {
    //increments global score variable by 1
    score++;
    // updates the score label
    labelScore.setText(score.toString());
}

function changeScoreCountA() {
    //increments global score variable by 1
    scoreCount = scoreCount + 5;
    // updates the score label
    scoreCountNumb.setText(scoreCount.toString());
    objectA.destroy();

}

function changeScoreCountB() {
    //increments global score variable by 1
    scoreCount = scoreCount - 5;
    // updates the score label
    scoreCountNumb.setText(scoreCount.toString());
    objectB.destroy();
}

function changeScoreCountC() {
    //increments global score variable by 1
    scoreCount = scoreCount/2;
    scoreCount = Math.round(scoreCount);
    // updates the score label
    scoreCountNumb.setText(scoreCount.toString());
    objectC.destroy();
}

function gameOver() {
    // stop the game (update() function no longer called)
    game.destroy();
}

function spawnA(){
  objectA = game.add.sprite(650, 200, "nameA" );
  game.physics.arcade.enable(objectA);
  objectA.body.velocity.x = -200;
}

function spawnB(){
  objectB = game.add.sprite(720, 200, "nameB" );
  game.physics.arcade.enable(objectB);
  objectB.body.velocity.x = -200;
}

function spawnC(){
  objectC = game.add.sprite(500, 200, "nameC" );
  game.physics.arcade.enable(objectC);
  objectC.body.velocity.x = -200;
}

function ballPick(locationX, locationY, velocityX, velocityY){
  var ball = game.rnd.integerInRange(0, allProb);
  if(ball <= probA){
    objectA = game.add.sprite(locationX, locationY, "nameA" );
    game.physics.arcade.enable(objectA);
    objectA.body.velocity.x = velocityX;
    objectA.body.velocity.y = velocityY;
  }else if(ball <= (probA + probB)){
    objectB = game.add.sprite(locationX, locationY, "nameB" );
    game.physics.arcade.enable(objectB);
    objectB.body.velocity.x = velocityX;
    objectB.body.velocity.y = velocityY;
  }else{
    objectC = game.add.sprite(locationX, locationY, "nameC" );
    game.physics.arcade.enable(objectC);
    objectC.body.velocity.x = velocityX;
    objectC.body.velocity.y = velocityY;
  }
}

function sidePick(locationX, locationY, velocityX, velocityY){
  var side = game.rnd.integerInRange(1, 3);
  if(side == 1){
    locationX = 0;
    locationY = 200;
    velocityX = 200;
    velocityY = 0;
  }else if(side == 2){
    locationX = 395;
    locationY = 0;
    velocityX = 0;
    velocityY = 200;
  }else{
    locationX = 790;
    locationY = 200;
    velocityX = -200;
    velocityY = 0;
  }
  ballPick(locationX, locationY, velocityX, velocityY);

}
