var progression = 1;

let myFont;
let img;
var coloredImg;
let colors = [];
let currColor;

var direction;
var position;
const speed = 0.4;

let imgWidth = 248;
let imgHeight = 114;

function changeColor() {
    // Pick color
    let color;
    do {
        color = random(colors);
    } while (color == currColor);

    // Create copy of image so it can be blended non-destructively
    coloredImg = createImage(imgWidth, imgHeight);
    coloredImg.set(0, 0, img);
    
    // Create the image with the color we want to blend with
    let colorEffect = createImage(imgWidth, imgHeight);
    colorEffect.loadPixels();

    for (let x = 0; x < colorEffect.width; x++) {
        for (let y = 0; y < colorEffect.height; y++) {
            colorEffect.set(x, y, color);
        }
    }
    colorEffect.updatePixels();

    // Blend and mask
    coloredImg.blend(colorEffect, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight, MULTIPLY);
    coloredImg.mask(img, 0, 0);
}

function preload() {
    img = loadImage("./brbdvd.png");
}

function setup() {
    createCanvas(1920, 1080);
    direction = createVector(0.5, 0.5);
    position = createVector(width / 2, height / 2);
    colors = [
        color(255, 32, 32),
        color(32, 255, 32),
        color(32, 32, 255),
        color(255, 255, 32),
        color(32, 255, 255),
        color(255, 32, 255),
    ]
    changeColor();
}

function draw() {
    background('rgba(0, 0, 0, 1.0)');
    position.add(p5.Vector.mult(direction, speed * deltaTime))

    if(position.x <= 0 || width - (position.x + imgWidth) <= 0) {
        // we've collided with the wall
        direction.x *= -1;
        position.add(p5.Vector.mult(direction, speed * deltaTime));
        changeColor();
    }
    if(position.y <= 0 || height - (position.y + imgHeight) <= 0) {
        direction.y *= -1;
        position.add(p5.Vector.mult(direction, speed * deltaTime));
        changeColor();
    }
    
    image(coloredImg, position.x, position.y);
}