const particles = [];
const numParticles = 17500;
const maxSpeed = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  noStroke();
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 25);

  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.update();
    particle.edges();
    particle.display();
    if (particle.isFaded()) {
      particles.splice(i, 1);
      particles.push(new Particle());
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, maxSpeed);
    this.size = random(1, 4);
    this.color = color(random(100, 255), random(100, 255), random(100, 255), random(50, 200), ('#cf0'), ('#0070FF'), ('#fff'));
    this.alpha = 255;
    this.fadeSpeed = random(0.5, 2);
  }

  update() {
    const angle = noise(this.pos.x * 0.005, this.pos.y * 0.005, frameCount * 0.01) * 360;
    this.acc = p5.Vector.fromAngle(radians(angle));
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.alpha -= this.fadeSpeed;
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isFaded() {
    return this.alpha <= 0;
  }
}
