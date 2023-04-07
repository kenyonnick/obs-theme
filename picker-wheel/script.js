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
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  for (let i = 0; i < options.length; i++) {
    const option = i + 1;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const optionAngle = option * wedgeAngle + angleOffset;
    ctx.arc(centerX, centerY, radius, optionAngle, optionAngle + wedgeAngle);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = i % 2 === 0 ? "#E6E6E6" : "#F5F5F5";
    ctx.fill();
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
  const spins = 5 + Math.floor(Math.random() * 8);
  const angle = (2 * Math.PI) / options.length;
  const speed = 0.125;
  let rotation = 0;
  let spinCount = 0;
  let result = null;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    drawWheel(rotation);
    ctx.restore();
    rotation += speed * Math.PI;
    if (rotation >= angle) {
      spinCount++;
      if (spinCount === spins) {
        clearInterval(animId);
        result = options[Math.floor((options.length * rotation) / (2 * Math.PI))];
        alert("You landed on: " + result);
      }
    }
  };
  animate();
  const animId = setInterval(animate, 1000 / 30);
}

spin();