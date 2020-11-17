var progression = 1;

let myFont;

let cameraScale = 0.4;
let cameraWidth = 1920 * cameraScale;
let cameraHeight = 1080 * cameraScale;
var cameraTopLeft;
var cameraTopRight;
var cameraBottomLeft;
var cameraBottomRight;

var invisibleBorder;

let horizontalPartitions = 32;
let verticalParitions = 18;
var horizontalGridSize;
var verticalGridSize;

function preload() {
    myFont = loadFont("../../fonts/MajorMonoDisplay.ttf");
}

function setup() {
    let c = createCanvas(1920, 1080);
    smooth();

    horizontalGridSize = width / horizontalPartitions;
    verticalGridSize = height / verticalParitions;

    console.log(horizontalGridSize, verticalGridSize);

    drawFramingGuides(true);
    //saveCanvas(c, 'myCanvas', 'jpg');
}

function draw() {
    progression += (1 + 1 / random(1, 100)) * 0.001;

    background(255);

    // Framing Guides
    //drawFramingGuides();

    drawChatBox();
    drawAlertsBox();
    
}

function drawFramingGuides(shouldLog=false){
    // Camera Header Box
    drawBlockoutBox(horizontalGridSize * 9, verticalGridSize * 1, horizontalGridSize * 16, verticalGridSize * 1, "Camera Header Box", shouldLog);

    // Camera Box
    drawBlockoutBox(horizontalGridSize * 9, verticalGridSize * 3, horizontalGridSize * 16, verticalGridSize * 9, "Camera Box", shouldLog);

    // Chat Box
    drawBlockoutBox(horizontalGridSize, verticalGridSize, horizontalGridSize * 7, verticalGridSize * 16, "Chat Box", shouldLog);

    // Feature Box 1
    drawBlockoutBox(width - horizontalGridSize * 6, verticalGridSize, horizontalGridSize * 5, verticalGridSize * 5, "Feature Box 1", shouldLog);

    // Feature Box 2
    drawBlockoutBox(width - horizontalGridSize * 6, verticalGridSize * 7, horizontalGridSize * 5, verticalGridSize * 10, "Feature Box 2", shouldLog);

    // Feature Bar
    drawBlockoutBox(horizontalGridSize * 9, verticalGridSize * 13, horizontalGridSize * 16, verticalGridSize * 4, "Feature Bar", shouldLog);

    stroke(255,0,0);
    
    for (var i = 0; i < horizontalPartitions; i++){
        line(i * width / horizontalPartitions, 0, i * width / horizontalPartitions, height);
    }

    for (var i = 0; i < verticalParitions; i++){
        line(0, i * height / verticalParitions, width, i * height / verticalParitions);
    }
}

function drawBlockoutBox(x, y, width, height, label, shouldLog=false){
    noStroke();
    fill(128);
    rect(x, y, width, height);
    if(shouldLog){
        console.log(label + `, ${x}, ${y}, ${width}, ${height}`);
    }
    
}

function drawChatBox(){
    noStroke();
    fill(128);
    rect(horizontalGridSize, verticalGridSize, horizontalGridSize * 7, verticalGridSize * 16);
}

function drawAlertsBox(){
    noStroke();
    fill(128);
    rect(width - horizontalGridSize * 6, verticalGridSize, horizontalGridSize * 5, verticalGridSize * 5);
}

