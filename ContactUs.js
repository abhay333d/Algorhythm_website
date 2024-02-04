function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

// Constants for particle animation
const PARTICLE_NUM = 300;
const PARTICLE_BASE_RADIUS = 0.4;
const FL = 500;
const DEFAULT_SPEED = 1;
const BOOST_SPEED = 150;

// Variables for canvas and animation
let canvas, canvasWidth, canvasHeight, context;
let centerX, centerY, mouseX, mouseY;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;
const particles = [];

// Toggle button for dark mode
const modeToggle = document.getElementById("mode-toggle");
let isDarkMode = false;

modeToggle.addEventListener("change", function () {
  isDarkMode = !isDarkMode;

  updateCanvasStyle();

  loop();
});

window.addEventListener("load", function () {
  canvas = document.getElementById("c");

  const resize = function () {
    canvasWidth = canvas.width = window.innerWidth * 0.95;
    canvasHeight = canvas.height = window.innerHeight * 1.9;
    centerX = canvasWidth * 0.5;
    centerY = canvasHeight * 0.5;
    context = canvas.getContext("2d");

    updateCanvasStyle();
  };

  window.addEventListener("resize", resize);

  resize();

  mouseX = centerX;
  mouseY = centerY;

  // Initialize particles and their positions
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = randomizeParticle(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  // Event listener for mouse movement
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Event listener for mouse click
  document.addEventListener("mousedown", function () {
    targetSpeed = BOOST_SPEED;
  });

  // Event listener for mouse release
  document.addEventListener("mouseup", function () {
    targetSpeed = DEFAULT_SPEED;
  });

  setInterval(loop, 1000 / 60);
});

function updateCanvasStyle() {
  context.save();
  if (isDarkMode) {
    context.fillStyle = "rgb(255, 255, 255)"; // White particles, black canvas
  } else {
    context.fillStyle = "rgb(255, 255, 255)"; // Black particles, white canvas
  }
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.restore();
}

// Animation loop
function loop() {
  context.save();
  if (isDarkMode) {
    context.fillStyle = "rgb(0, 0, 0)"; // Black background
    context.strokeStyle = "rgb(255, 255, 255)"; // White particles
  } else {
    context.fillStyle = "rgb(0, 0, 0)"; // White background
    context.strokeStyle = "rgb(255, 255, 255)"; // Black particles
  }
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.restore();

  context.strokeStyle = isDarkMode
    ? "rgb(255, 255, 255)"
    : "rgb(255, 255, 255)";

  speed += (targetSpeed - speed) * 0.01;

  let p;
  let cx, cy;
  let rx, ry;
  let f, x, y, r;
  let pf, px, py, pr;
  let a, a1, a2;

  const halfPi = Math.PI * 0.5;

  context.beginPath();
  for (let i = 0; i < PARTICLE_NUM; i++) {
    p = particles[i];

    p.pastZ = p.z;
    p.z -= speed;

    if (p.z <= 0) {
      randomizeParticle(p);
      continue;
    }

    cx = centerX - (mouseX - centerX) * 1.25;
    cy = centerY - (mouseY - centerY) * 1.25;

    rx = p.x - cx;
    ry = p.y - cy;

    f = FL / p.z;
    x = cx + rx * f;
    y = cy + ry * f;
    r = PARTICLE_BASE_RADIUS * f;

    pf = FL / p.pastZ;
    px = cx + rx * pf;
    py = cy + ry * pf;
    pr = PARTICLE_BASE_RADIUS * pf;

    a = Math.atan2(py - y, px - x);
    a1 = a + halfPi;
    a2 = a - halfPi;

    context.moveTo(px + pr * Math.cos(a1), py + pr * Math.sin(a1));
    context.arc(px, py, pr, a1, a2, true);
    context.lineTo(x + r * Math.cos(a2), y + r * Math.sin(a2));
    context.arc(x, y, r, a2, a1, true);
    context.closePath();
  }
  context.fill();
  context.stroke();
}

function randomizeParticle(p) {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1500 + 500;
  return p;
}

function Particle(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.pastZ = 0;
}

window.addEventListener("load", function () {
  const darkModePreference = localStorage.getItem("darkMode");

  if (darkModePreference === "true") {
    isDarkMode = true;

    modeToggle.checked = true;
  }

  document.body.classList.toggle("dark-mode", isDarkMode);

  modeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", modeToggle.checked);

    localStorage.setItem("darkMode", modeToggle.checked);
  });
});

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on X, close the modal
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
