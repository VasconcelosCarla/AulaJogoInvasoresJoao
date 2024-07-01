class Invaders {
  constructor(x, y, width, height, invasorPos) {
    this.width = width;
    this.height = height;
    this.image = loadImage("./assets/Idle1.png");
    this.invasorPosition = invasorPos;

    // Cria o corpo físico do invasor usando as dimensões da imagem
    this.body = Bodies.rectangle(x, y, width, height);
    World.add(world, this.body);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.invasorPosition, this.width, this.height);
    pop();

    // Chama a função para exibir o colisor do invasor
    this.displayCollider();
  }

  remove(index){
    setTimeout(()=>{
      Matter.World.remove(world, invaders[index].body);
      invaders.splice(index, 1)
    }, 2000);
  }

  displayCollider() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    noFill();
    stroke(255, 0, 0); // Cor vermelha para o colisor
    rect(0, this.invasorPosition, this.width, this.height); // Ajusta a posição e dimensões conforme necessário
    pop();
  }
}
