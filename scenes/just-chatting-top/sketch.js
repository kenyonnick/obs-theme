var progression = 1;

let myFont;

let cameraScale = 0.5;
let cameraWidth = 1920 * cameraScale;
let cameraHeight = 1080 * cameraScale;
var cameraTopLeft;
var cameraTopRight;
var cameraBottomLeft;
var cameraBottomRight;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
}

function setup() {
    createCanvas(1920, 1080);
    smooth();
    console.log("cameraWidth=" + cameraWidth + ", cameraHeight=" + cameraHeight);

    cameraTopLeft = createVector((width-cameraWidth) / 2, (height-cameraHeight) / 2);
    cameraTopRight = cameraTopLeft.copy().add(cameraWidth, 0);
    cameraBottomRight = cameraTopRight.copy().add(0, cameraHeight);
    cameraBottomLeft = cameraTopLeft.copy().add(0, cameraHeight);
}

function draw() {
    progression += (1 + 1 / random(1, 100)) * 0.001;

    background(0, 0, 0, 0);

    // mark out where the camera should be
    //noFill();
    //stroke(255, 0, 0);
    // rect((width-cameraWidth) / 2, (height-cameraHeight) / 2, cameraWidth, cameraHeight);

    let a = cameraTopLeft.copy().add(-50,-50);
    let b = cameraTopLeft.copy().add(100, 25);
    let c = cameraTopLeft.copy().add(-50, 50);
    let d = cameraTopLeft.copy().add(-100, 25);
    let e = createVector(c.x - a.x, c.y - a.y);

    noStroke();
    fill(255,0,255);
    triangle(a.x, a.y, b.x, b.y, e.x, e.y);
    fill(0,255,255);
    triangle(b.x, b.y, c.x, c.y, e.x, e.y);
    fill(0);
    quad(c.x, c.y, d.x, d.y, a.x, a.y, e.x, e.y);
}
