let rings = [];

function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
  noFill();
  stroke(214, 0, 0, 40);

  for (let i = 0; i < 6; i++) {
    rings.push(i * 120);
  }
}

function draw() {
  clear();

  translate(width / 2, height / 2);

  for (let i = 0; i < rings.length; i++) {
    ellipse(0, 0, rings[i]);
    rings[i] += 0.4;
    if (rings[i] > max(width, height)) {
      rings[i] = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
