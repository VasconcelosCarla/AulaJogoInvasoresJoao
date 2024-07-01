const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var score = 0;

var balls = [];
var invaders = [];




function preload() {
  backgroundImg = loadImage("./assets/fundo2.png");
  towerImage = loadImage("./assets/tower2.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(335, 380, 180, 330, options);
  World.add(world, tower);

  cannon = new Cannon(360, 150, 190, 180, angle);
  

  

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);

  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithInvader(i);
  }
  cannon.display();
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 280, 410);
  pop();
  showInvaders();
  displayCollider()
  
  

}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x+25, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >=height){
      ball.remove(index)
    }
  }
}

function showInvaders() {

  if(invaders.length > 0){
    if (
      invaders[invaders.length - 1] === undefined ||
      invaders[invaders.length - 1].body.position.x < width - 400) 
      {
      var positions = [-80, -60, -70, -20];
      var position = random(positions);
      var invader = new Invaders(width, height - 60, 70, 100, position);
      invaders.push(invader);
    }

    for (var i = 0; i < invaders.length; i++) {
      if (invaders[i]) {
        Matter.Body.setVelocity(invaders[i].body, {
          x: -0.9,
          y: 0
        });

        invaders[i].display();
      }
    }

  }else {
    var invader = new Invaders(width - 200, height-60, 70, 100, -80)
    invaders.push(invader);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function displayCollider() {
  var pos = tower.position;
  var angle = tower.angle;

  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  noFill();
  stroke(255, 0, 0); // Cor vermelha para o colisor
  rect(0, 0, 335, 380);
  pop();
}

function collisionWithInvader(index){
  for (var i = 0; i<invaders.length; i++){
    if(balls[index] !== undefined && invaders[i] !== undefined){
      var collision = Matter.SAT.collides(balls[index].body, invaders[i].body);
      if(collision.collided){
        invaders[i].remove(i);
        balls[index].remove(index);
      }   
    }
  }
}