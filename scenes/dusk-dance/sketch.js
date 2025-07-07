const urlParams = new URLSearchParams(window.location.search);

const channel = urlParams.get("channel") || 'radiantnick';
const duskImageUrl = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_26bfa52d46bd4e60bf5dfa627ec81cf2/default/dark/3.0"
const size = urlParams.get("size") || 64;
const cmdCooldown = urlParams.get("cooldownMs") || 5000;
const population = urlParams.get("count") || 50;
var cmdElapsedTime = 0;

var mob = null;
let emoteImage; // image used by p5.js

function easeOut(lifetime, lifespan) {
    const x = lifetime / lifespan;
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function inAndOut(lifetime, lifespan) {
    const x = lifetime / lifespan;
    return Math.pow(2*x - 1, 8);
}

class Entity {
    position;
    velocity;
    applyVel;
    lifespan;
    lifetime;

    constructor(position, velocity, lifespan) {
        this.position = position;
        this.velocity = velocity;
        this.applyVel = this.velocity.copy();
        this.lifespan = lifespan;
        this.lifetime = 0;
        this.gravity = createVector(0, 0.98 * 2);
    }

    draw() {
        this.lifetime += deltaTime;
        if (this.lifetime < this.lifespan) {
            this.applyVel = this.velocity.copy().div(10).mult(deltaTime);
            this.position.add(this.applyVel).add(this.gravity);
            tint(255, lerp(255, 0, inAndOut(this.lifetime, this.lifespan)));
            image(emoteImage, this.position.x, this.position.y, size, size);
        }
    }
}

class EmoteMob {
    origin;
    population;
    lifespan;
    entities = [];

    constructor(origin, population, lifespan) {
        this.origin = origin;
        this.population = population;
        this.lifespan = lifespan;
    }

    spawn() {
        var position, velocity;
        for(var i = 0; i < this.population; i++) {
            position = p5.Vector.random2D().add(this.origin);
            velocity = p5.Vector.random2D().mult(random(1.0,1.5));
            position = position.add(velocity.copy().mult(random(50,500)));
            this.entities[i] = new Entity(position, velocity, this.lifespan);
        }
    }

    draw() {
        for(var i = 0; i < this.population; i++) {
            this.entities[i].draw();
        }
    }
}

function handleCommand() {
    if (cmdElapsedTime > cmdCooldown) {
        cmdElapsedTime = 0;
        mob=null;
    }
}

ComfyJS.onCommand = (user, command, flags, self, extra) => {
    if (command === "dusk" || command === "dusks") {
        handleCommand();
    }
};

ComfyJS.Init(channel);

function preload() {
    emoteImage = loadImage(duskImageUrl);
}

function setup() {
    createCanvas(1920, 1080);
    background(0,0,0,0);
    colorMode(RGB);
    frameRate(30);
}

function draw() {
    clear();
    cmdElapsedTime += deltaTime;
    if (mob === null) {
        mob = new EmoteMob(createVector(width / 2, height / 2), population, cmdCooldown);
        mob.spawn();
    }
    mob.draw();
}

