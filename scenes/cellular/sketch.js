var progression = 0;

var x = 0;
var y = 0;
var size = 32;
var point1, point2, point3;

function setup() {
    createCanvas(1920, 1080);
    background(0);
    angleMode(DEGREES);
    angle = 0;
    point1 = createVector(sin(angle), cos(angle)).setMag(size);
    point2 = createVector(sin(angle+120), cos(angle+120)).setMag(size);
    point3 = createVector(sin(angle-120), cos(angle-120)).setMag(size);
    console.log(point1, point2, point3);
}

function draw() {
    background(0); 
    noFill();
    stroke(255);
    var position, p1, p2, p3;

    var borderBuffer = size;
    var flip = false;
    for(y = borderBuffer + 16; y < 1080 - borderBuffer; y +=borderBuffer * 2){
        for(x = borderBuffer + 16; x < 1920 - borderBuffer; x += borderBuffer * 2){
            if(flip){
                position = createVector(x, y + size / 4);
                p1 = p5.Vector.sub(position, point1);
                p2 = p5.Vector.sub(position, point2);
                p3 = p5.Vector.sub(position, point3);
                stroke(255,0,255);
            } else {
                position = createVector(x, y - size / 4);
                p1 = p5.Vector.add(position, point1);
                p2 = p5.Vector.add(position, point2);
                p3 = p5.Vector.add(position, point3);
                stroke(0,255, 255);
            }

            
            triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

            // stroke(255,0,0);
            // circle(x, y, size);
            flip = !flip;
        }
    }
}
