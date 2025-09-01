function checkBirthday() {
      const name = document.getElementById("name").value;
      const dobInput = document.getElementById("dob").value;
      const dob = new Date(dobInput);
      const today = new Date();
      const msg = document.getElementById("msg");
      const title = document.getElementById("title");

      if (!name || !dobInput) {
        msg.innerText = "Please enter both name and date of birth!";
        return;
      }

      if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
        title.innerText = "🎉 Happy Birthday 🎉";
        msg.innerText = `Happy Birthday ${name}! 🎉 — Wished by Ankit Bachar`;
        startConfetti();
      } else {
        let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (nextBirthday < today) {
          nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        msg.innerText = `Hello ${name}, today is not your birthday.\nYour next birthday is on ${nextBirthday.toLocaleDateString(undefined, options)}`;
      }
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function startConfetti() {
    particles = [];
    for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 100,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: Math.random() * Math.PI
    });
    }
    requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
}

function update() {
    particles.forEach(p => {
    p.y += Math.cos(p.d) + 1 + p.r/2;
    p.x += Math.sin(p.d);

    if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
    }
    });
}
