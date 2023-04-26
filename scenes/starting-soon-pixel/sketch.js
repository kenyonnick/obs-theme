let myFont;
let fontSize = 64;

let hoursRemaining = 0; // 07:00:00 PM
let minutesRemaining = 5;
let secondsRemaining = 0;
var timeRemainingInMillis = ((hoursRemaining * 60 + minutesRemaining) * 60 + secondsRemaining) * 1000;

function preload() {
    myFont = loadFont("../../fonts/karmatic-arcade/ka1.ttf");
}

function setup() {
    createCanvas(1920, 1080);
}

function draw() {
    clear();
    // background(0, 0, 0, 0);

    if (timeRemainingInMillis >= 0) {
        timeRemainingInMillis -= deltaTime;
        const countdownString = new Date(timeRemainingInMillis).toISOString().slice(11, 19);

        fill("#ff8377");
        noStroke();
        textFont(myFont);
        textSize(fontSize);
        textAlign(CENTER, CENTER);
        text("Starting Soon", width / 2, height / 2 - (fontSize / 1.75));
        text(countdownString, width / 2, height / 2 + (fontSize / 1.75));
    }
}