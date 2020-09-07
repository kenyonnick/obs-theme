var progression = 0;

let fontRegular;
let fontLight;

var borderWidth = 480;
var borderHeight = 270;

var borderThickness = 16;
var shadowThickness = 16;

function preload() {
    fontRegular = loadFont("../../fonts/Lato-Regular.ttf");
    fontLight = loadFont("../../fonts/Lato-Light.ttf");
}

function setup() {
    createCanvas(500, 290);
}

function draw() {
    background('rgba(0,0,0,0)');
    progression += 1;

    noStroke();
    fill(0, 255, 255);
    rect(0, 0, borderThickness, borderHeight);
    rect(0, 0, borderWidth, borderThickness);
    rect(0, borderHeight - borderThickness, borderWidth, borderThickness);
    rect(borderWidth - borderThickness * 2, 0, borderThickness, borderHeight);

    fill(0, 255 * 0.75, 255 * 0.75);
    rect(borderWidth - borderThickness, 0, borderThickness, borderHeight);


    //rect((480 - 360) / 2, height, 360, -30);

    var barWidth = 180;
    var offset = 40;
    var blurbHeight = 50;

    var rightControllerTextBox = new TextBox("Right Controller", offset - shadowThickness, height - blurbHeight, barWidth, blurbHeight);
    rightControllerTextBox.render();

    var leftControllerTextBox = new TextBox("Left Controller", width - offset - barWidth - shadowThickness * 2, height - blurbHeight, barWidth, blurbHeight);
    leftControllerTextBox.render();

}

class TextBox {
    constructor(text, x, y, w, h) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    render() {
        noStroke();

        // Background box
        fill(255, 0, 255);
        rect(this.x, this.y, this.width, this.height);

        fill(255 * 0.75, 0, 255 * 0.75);
        rect(this.x + this.width, this.y, 15, this.height);

        // Text
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(22);
        textFont(fontRegular);
        text(this.text, this.x, this.y, this.width, this.height);
    }
}