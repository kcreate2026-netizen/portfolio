let cam;
let zoomLevel = 1;
let points = [];
let font;

function preload() {
  font = loadFont(
    "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  textFont(font);
  textAlign(CENTER, CENTER);

  // Sphere setup
  let radius = 320;
  let total = 280; // balanced density
  let goldenAngle = PI * (3 - sqrt(5));

  for (let i = 0; i < total; i++) {
    let y = 1 - (i / (total - 1)) * 2;
    let r = sqrt(1 - y * y);
    let theta = goldenAngle * i;

    let x = cos(theta) * r;
    let z = sin(theta) * r;

    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius
    });
  }
}

function draw() {
  background(0);

  // Webcam background
  push();
  translate(0, 0, -900);
  texture(cam);
  plane(width * 2, height * 2);
  pop();

  scale(zoomLevel);

  // Sphere rotation values
  let rotY = frameCount * 0.0012;
  let rotX = frameCount * 0.0008;

  rotateY(rotY);
  rotateX(rotX);

  fill(255, 0, 0);
  noStroke();

  for (let p of points) {
    push();

    // Move point WITH sphere
    translate(p.x, p.y, p.z);

    // TRUE BILLBOARD FIX
    // Cancel ALL rotations so text faces screen
    rotateX(-rotX);
    rotateY(-rotY);

    // Depth-based size (keeps spacing clean)
    let size = map(p.z, -320, 320, 8, 14);
    textSize(size);

    text("PORTFOLIO", 0, 0);
    pop();
  }
}

function mouseWheel(event) {
  zoomLevel += event.delta * -0.0004;
  zoomLevel = constrain(zoomLevel, 0.75, 2.2);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}