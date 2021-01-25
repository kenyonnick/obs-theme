var progression = 0;

var time = 0;
var bpm = 174;
var bps = bpm / 60;
var flip = false;

function setup() {
    createCanvas(1920, 1080);
    background(255,255,255,0);
}

function draw() {
    clear();
    noStroke();
    time += deltaTime;
    if(time > 2000/bps) {
        time = 0;
        if(flip){
            fill('rgba(255,0,255, 0.25)');
        } else {
            fill('rgba(0,255,255, 0.25)');
        }
        flip = !flip;
    }
    rect(0,0,1920, 1080);
}
