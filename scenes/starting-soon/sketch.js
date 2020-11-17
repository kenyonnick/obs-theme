var progression = 1;

var networkGraph;
var brbMessage;

let myFont;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
}

function setup() {
    createCanvas(1920, 1080, WEBGL);
    networkGraph = new NetworkGraph(200);
    brbMessage = new BRBMessage();
}

function draw() {
    progression += (1 + 1 / random(1, 100)) * 0.001;

    background(0, 0, 0);

    brbMessage.update(progression);
    networkGraph.update(progression);
}

class NetworkGraph {

    constructor(size) {
        this.size = size;
        this.position = createVector(0, 0, 0);
        this.scale = createVector(1, 1, 1);
        this.rotation = createVector(radians(23), 1, 0);
    }

    update(updates) {
        // translate
        translate(this.position);

        // scale
        scale(abs(sin(updates / 10 + PI / 4)) + 1);

        // rotate
        rotateY(this.rotation.y + updates);
        rotateX(this.rotation.x);
        rotateZ(this.rotation.z);

        // render
        this.render();

        // clear translation
        translate(this.position.copy().mult(-1));
    }

    render() {
        noFill();
        stroke(255, 0, 255);
        sphere(this.size);
    }

}

class BRBMessage {
    constructor(offset, speed) {
        this.position = createVector(0, 0, -500);
        this.scale = createVector(1, 1, 1);
        this.rotation = createVector(0, radians(30), 0);
        this.speed = speed;
    }

    update(updates) {
        // translate
        this.position.add(updates * this.speed, 0, 0);
        translate(this.position);

        // rotate

        // render
        this.render();

        // clear translation
        translate(this.position.copy().mult(-1));

        if (this.position.x > width) {
            this.position.x = -2 * width;
        }
    }

    render() {
        fill(0, 255, 255);
        textFont(myFont);
        textSize(128);
        textAlign(CENTER, CENTER);
        text("Starting Soon", 10, 50);
    }

}