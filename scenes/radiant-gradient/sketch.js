// Constants
let b1, b2;

function setup() {
    createCanvas(710, 400);

    // Define colors
    b1 = color(255, 0, 255);
    b2 = color(0, 255, 255);

    noLoop();
}

function draw() {
    // Background
    setGradient(-width / 2, 0, width * 2, height * 2, b1, b2);
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();

    rotate(-PI / 4);

    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}