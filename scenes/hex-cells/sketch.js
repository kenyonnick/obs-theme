var progression = 0;

var x = 0;
var y = 0;
var size = 32;
var point1, point2, point3;

function setup() {
    createCanvas(1920, 1080);
    background(0);
}

function draw() {
    background(255); 
    noStroke();
    fill(0);

    let hexRadius = 64;
    
    for(var x = hexRadius; x < width; x += hexRadius*3){
        for(var y = hexRadius; y <height; y += hexRadius){
            push();
            translate(x, y);
            polygon(0, 0, hexRadius, 6);
            pop();
        }
    }
}

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}
