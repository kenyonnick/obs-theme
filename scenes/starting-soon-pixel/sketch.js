let myFont;
let fontSize = 64;

let hoursRemaining = 0; // 07:00:00 PM
let minutesRemaining = 5;
let secondsRemaining = 0;
var timeRemainingInMillis = ((hoursRemaining * 60 + minutesRemaining) * 60 + secondsRemaining) * 1000;

var fontColor = "#ff8377";

function preload() {
    myFont = loadFont("../../fonts/karmatic-arcade/ka1.ttf");
}

function setup() {
    createCanvas(1920, 1080);
    let params = getURLParams();
    console.log(params);
    if (params.fontColor) {
        console.log("setting the color to", params.fontColor)
        fontColor = `#${params.fontColor}`;
    }
}

function draw() {
    clear();
    // background(0, 0, 0, 0);

    if (timeRemainingInMillis >= 0) {
        timeRemainingInMillis -= deltaTime;
        const countdownString = new Date(timeRemainingInMillis).toISOString().slice(11, 19);

        fill(fontColor);
        noStroke();
        textFont(myFont);
        textSize(fontSize);
        textAlign(CENTER, CENTER);
        text("Starting Soon", width / 2, height / 2 - (fontSize / 1.75));
        text(countdownString, width / 2, height / 2 + (fontSize / 1.75));
    }
}