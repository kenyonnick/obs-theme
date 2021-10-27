var progression = 1;

var networkGraph;
var countdownText;

let myFont;

let hoursRemaining = 0; // 07:00:00 PM
let minutesRemaining = 5;
let secondsRemaining = 0;
var timeRemainingInMillis = ((hoursRemaining * 60 + minutesRemaining) * 60 + secondsRemaining) * 1000;

var pumpkin;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
    pumpkin = loadModel('pumpkinOBJ.obj');
}

function setup() {
    createCanvas(1920, 1080, WEBGL);
    networkGraph = new NetworkGraph(200);
    countdownText = new BRBMessage(createVector(0, 0, -500), createVector(0, 0, 0), "00:05:00", 128);
    twitterLabelText = new BRBMessage(createVector(650,-100,0), createVector(0,0, 0), "Twitter:", 32);
    twitterText = new BRBMessage(createVector(650,-50,0), createVector(0,0, 0), "@radiantgardenrs", 32);
    instagramLabelText = new BRBMessage(createVector(650,50,0), createVector(0,0, 0), "Instagram:", 32);
    instagramText = new BRBMessage(createVector(650,100,0), createVector(0,0, 0), "@radiantgardeners", 32);
}

function draw() {
    progression += (1 + 1 / random(1, 100)) * 0.001;

    background(0, 0, 0, 0);

    if(timeRemainingInMillis >= 0){
        timeRemainingInMillis -= deltaTime;
        countdownText.text = new Date(timeRemainingInMillis).toISOString().substr(11,8);
        countdownText.update(progression);
    }

    // twitterLabelText.update(progression);
    // twitterText.update(progression);
    // instagramLabelText.update(progression);
    // instagramText.update(progression);
    networkGraph.update(progression);
}

class NetworkGraph {

    constructor(size) {
        this.size = size;
        this.position = createVector(0, 0, 0);
        this.scale = createVector(1, 1, 1);
        this.rotation = createVector(radians(23), 1, 0);

        this.labels = [];
        var subdivisions = 8;
        var text = "/ STARTING SOON /";
        var textIndex = 0;
        subdivisions *= text.length;
        for(var i = 0; i< subdivisions; i++){
            var angle = i * PI / (subdivisions / 2);
            var x = size * sin(angle) * 1.05;
            var z = size * cos(angle) * 1.05;
            textIndex += 1;
            if(textIndex >= text.length){
                textIndex = 0;
            }
            console.log("messageLength=" + text.length + ", messageindex = " + textIndex);
            console.log("Element " + i + ". angle= " + angle + ", x=" + x + ", z=" + z);
            var message = new BRBMessage(createVector(x, -50 , z), createVector(0,angle, 0), text[textIndex], 16);
            this.labels.push(message);
        }

    }

    update(updates) {
        // scale
        scale(abs(sin(updates / 10 + PI / 4)) + 1);

        // translate
        translate(this.position);

        // rotate
        rotateY(this.rotation.y + updates);
        rotateX(this.rotation.x);
        rotateZ(this.rotation.z);

        // render
        this.render();
        
        this.labels.forEach((label) => {
            label.update(updates)
        });

        // clear translation
        
        rotateY(-(this.rotation.y + updates));
        rotateX(-this.rotation.x);
        rotateZ(-this.rotation.z);
        translate(this.position.copy().mult(-1));
        
    }

    render() {
        noFill();
        stroke('rgba(0,0,0,0.5)');
        // sphere(this.size);
        model(pumpkin);
    }

}

class BRBMessage {
    constructor(position, rotation, text, fontSize = 64, speed = 0) {
        this.position = position;
        this.scale = createVector(1, 1, 1);
        this.rotation = rotation;
        this.speed = speed;
        this.fontSize = fontSize;
        this.text = text;
    }

    update(updates) {
        // translate
        this.position.add(updates * this.speed, 0, 0);
        translate(this.position);

        // rotate
        rotateY(this.rotation.y);
        rotateX(this.rotation.x);
        rotateZ(this.rotation.z);

        // render
        this.render();

        // clear translation
        
        rotateY(-this.rotation.y);
        rotateX(-this.rotation.x);
        rotateZ(-this.rotation.z);
        translate(this.position.copy().mult(-1));
        

        if (this.position.x > width) {
            this.position.x = -2 * width;
        }
    }

    render() {
        fill(0);
        textFont(myFont);
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        text(this.text, 10, 50);
    }

}