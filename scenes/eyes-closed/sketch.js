var progression = 0;
var countdownReason = "Challenge: Eyes Closed";
var countdownLabel = "Time Left: ";
var marginLeft = 16;
var fontSize = 24;

var cyan;
var magenta;
var colorChangeTimer = 0;
var colorChangeDirection = 1.0;
var colorChangeAmount = 0.0;

// let myFont;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
}

// 300s = 5 mins
var countdownMilliseconds = 5 * 60 * 1000;

function setup() {
    createCanvas(480, fontSize * 3);
    background(0,0,0);
    textFont(myFont);
    textAlign(LEFT, CENTER);

    cyan = color(0,255,255);
    magenta = color(255,0,255);
    colorMode(RGB);
}

function draw() {
    background(0);

    fill(0);
    if(colorChangeTimer < 3000){
        colorChangeTimer += deltaTime;
    } else {
        colorChangeTimer = 0;
        colorChangeDirection *= -1.0;
    }

    colorChangeAmount += colorChangeDirection * deltaTime / 3000;
    stroke(lerpColor(cyan,magenta, colorChangeAmount));
    strokeWeight(8);
    strokeJoin(ROUND);
    rect(0,0, width, height);

    countdownMilliseconds -= deltaTime;
    countdownText = "00:00";
    if(countdownMilliseconds > 0){
        countdownText = new Date(countdownMilliseconds).toISOString().substr(14,5);
    }
    
    fill(255);
    stroke(255);
    strokeWeight(1);
    strokeJoin(MITER);
    textSize(fontSize);
    text(countdownReason, marginLeft, height/2 - fontSize/2);
    text(countdownLabel + countdownText, marginLeft, height/2 + fontSize / 2);
}
