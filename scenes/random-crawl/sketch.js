const canvasSize = 3000;

var progression = 0;

var position;
const size = 64;

var north;
var south;
var east;
var west;

var directions;
var direction;
var availableDirections;

var minX, maxX, minY, maxY;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    background(0);
    noStroke();
    rectMode(CENTER);
    textFont(myFont);

    position = createVector(canvasSize / 2, canvasSize / 2);

    south = createVector(0, size);
    north = createVector(0, -size);
    east = createVector(size, 0);
    west = createVector(-size, 0);

    direction = north;
    directions = [north, south, east, west];
}

function draw() {
    // choose how to draw
    drawPosition(position, size);
    // draw the crawler's head
    // fill(0);
    // rect(position.x, position.y, size, size);

    // move
    if (position.y - size < 0) {
        direction = south;
    } else if (position.y + size > windowHeight) {
        direction = north;
    } else if (position.x - size < 0) {
        direction = east;
    } else if (position.x + size > windowWidth) {
        direction = west;
    } else {
        direction = selectDirection(direction, directions);
    }
    position.add(direction);

    // Branding, baby
    // drawBranding();

    // Crosshair
    // fill(255,0,0);
    // rect(canvasSize / 2, canvasSize / 2, 16, canvasSize)
    // rect(canvasSize / 2, canvasSize / 2, canvasSize, 16)

    // Update minimums and maximums
    if(position.x < minX) minX = position.x;
    if(position.x > maxX) maxX = position.x;
    if(position.y < minY) minY = position.y;
    if(position.y > maxY) maxY = position.y;
    
    // Report when the approximate area covered is more than 50% of the canvas
    const coverage = (maxX - minX) * (maxY - minY) / (canvasSize * canvasSize) > 0.5
    if(coverage) {
        console.log(`coverage ${coverage}`)
    }
}

function selectDirection(direction, directions) {
    const availableDirections = directions.filter(dir => dir != direction);
    const index = Math.floor(Math.random() * availableDirections.length);
    return availableDirections[index];
}

function drawPosition(pos, size) {
    if (north.equals(direction)) {
        fill(255, 0, 255);
        rect(pos.x - size, pos.y, size, size);
        fill(0, 255, 255);
        rect(pos.x + size, pos.y, size, size);
    } else if (south.equals(direction)) {
        fill(255, 0, 255);
        rect(pos.x + size, pos.y, size, size);
        fill(0, 255, 255);
        rect(pos.x - size, pos.y, size, size);
    } else if (east.equals(direction)) {
        fill(255, 0, 255);
        rect(pos.x, pos.y - size, size, size);
        fill(0, 255, 255);
        rect(pos.x, pos.y + size, size, size);
    } else if (west.equals(direction)) {
        fill(255, 0, 255);
        rect(pos.x, pos.y + size, size, size);
        fill(0, 255, 255);
        rect(pos.x, pos.y - size, size, size);
    }
}

function drawBranding() {
    const fontSize = 128 * 6;
    textSize(fontSize);
    fill(0);
    const brand = 'RADIANTGARDENERS';
    const topLeftX = canvasSize / 2 - 2 * fontSize + fontSize * 0.125;
    const topLeftY = canvasSize / 2 - fontSize * 1.125;
    for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
            const xPos = topLeftX + x * fontSize;
            const yPos = topLeftY + y * fontSize;
            text(brand[x + y * 4], xPos, yPos);
        }
    }
}
