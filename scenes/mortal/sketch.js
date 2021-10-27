var progression = 1;

let fonts;

let hoursRemaining = 0; // 07:00:00 PM
let minutesRemaining = 5;
let secondsRemaining = 0;
var timeRemainingInMillis = ((hoursRemaining * 60 + minutesRemaining) * 60 + secondsRemaining) * 1000;

function preload() {
    // preload fonts here
    fonts = [loadFont('../../fonts/Lato-Black.ttf')]
}

function setup() {
    createCanvas(1920, 1080, WEBGL)
}

function draw() {
    background(255, 0, 0)
    drawPersonaWord('MORTAL')

}

function drawPersonaWord(word) {
    for(var i = 0; i < word.length; i++) {
        drawPersonaLetter(word[i], i * 100 - word.length/2 * 100, 0, 0)
    }
}

function drawPersonaLetter (letter, x, y, font) {

    let width = 25
    let height = 25

    fill(255)
    quad(x-width, y-height, -10,
        x+width, y-height, -10,
        x+width, y+height, -10,
        x-width, y+height, -10);

    textSize(100)
    textAlign(CENTER,CENTER)
    textFont(fonts[font])
    fill(0)
    text(letter, x, y)
}
