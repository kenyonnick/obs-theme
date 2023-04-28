const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Drop Your Flashlights!", "Poggers"];

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;

function drawWheel(angleOffset) {
  const wedgeAngle = (2 * Math.PI) / options.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  for (let i = 0; i < options.length; i++) {
    let region = new Path2D();
    const option = i + 1;
    // region.beginPath();
    region.moveTo(centerX, centerY);
    const optionAngle = option * wedgeAngle + angleOffset;
    region.arc(centerX, centerY, radius, optionAngle, optionAngle + wedgeAngle);
    region.lineTo(centerX, centerY);
    region.closePath();
    ctx.fillStyle = i % 2 === 0 ? "cyan" : "magenta";
    ctx.fill(region, "evenodd");
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.translate(centerX, centerY);
    const textRotation = optionAngle + (wedgeAngle / 2);
    ctx.rotate(textRotation);
    ctx.fillText(options[i], radius / 2, 0);
    ctx.rotate(-textRotation);
    ctx.translate(-centerX, -centerY);
  }
}

function spin() {
  const fps = 30;
  const frameLength = 1000 / fps;
  const spins = 5 + Math.floor(Math.random() * 6);
  const result = Math.floor(Math.random() * options.length);
  const angle = ((2 * Math.PI) / options.length * result) + (2 * Math.PI);
  const speed = (Math.PI / 2) / fps;
  let rotation = 0;
  let spinCount = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    drawWheel(rotation);
    ctx.fillStyle = 'black';
    ctx.fillRect(centerX + radius, centerY - 6, 32, 12);
    ctx.restore();
    rotation += speed;
    if (rotation >= angle) {
      spinCount++;
      if (spinCount === spins) {
        clearInterval(animId);
        alert("You landed on: " + options[result]);
      }
    }
  };
  animate();
  const animId = setInterval(animate, frameLength);
}

spin();