// ============================================
// REALMS OF ETERNAL WAR — MAIN JAVASCRIPT
// ============================================

// --- PARTICLE SYSTEM ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.type = Math.random() < 0.6 ? 'ember' : 'ice';
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = this.type === 'ember' ? -Math.random() * 0.6 - 0.2 : Math.random() * 0.3 + 0.1;
    this.life = 1;
    this.decay = Math.random() * 0.003 + 0.001;
    this.color = this.type === 'ember'
      ? `rgba(201, ${Math.floor(Math.random() * 60 + 80)}, 30,`
      : `rgba(100, ${Math.floor(Math.random() * 60 + 160)}, 255,`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
      this.life = 1;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.life + ')';
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animFrame = requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// --- NAVIGATION SCROLL BEHAVIOUR ---
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky nav
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal], .timeline-event, .devlog-entry').forEach(el => {
  revealObserver.observe(el);
});

// --- MAP CONTINENT DATA ---
const continentData = {
  avaloria: {
    name: 'Avaloria',
    subtitle: 'The Central Lands',
    desc: 'The heartland of civilisation. Fertile, temperate, and endlessly contested. Whoever controls Avaloria controls the crossroads of the world.',
    tags: ['Allied Start Zone', 'Trade Hub', 'Diplomatic Centre']
  },
  frostpeak: {
    name: 'Frostpeak',
    subtitle: 'The Northern Dominion',
    desc: 'The largest continent. Ice and endurance. Aurora-lit skies above frozen tundra that has broken a thousand armies.',
    tags: ['Ice Resources', 'Natural Barriers', 'Aurora Magic']
  },
  windspire: {
    name: 'Windspire',
    subtitle: 'The Floating Realm',
    desc: 'Castles suspended mid-air between mountain peaks. One floating island fortress remains neutral — achievable only through extraordinary means.',
    tags: ['Aerial Combat', 'Floating Islands', 'Sky Magic']
  },
  emberhold: {
    name: 'Emberhold',
    subtitle: 'The Volcanic Realm',
    desc: 'The volcano never sleeps. Obsidian veins, lava flows, and fire-resistant settlements built from ember stone powered by volcanic heat.',
    tags: ['Volcanic Resources', 'Ember Stone', 'Hostile Terrain']
  },
  verdantia: {
    name: 'Verdantia',
    subtitle: 'The Ancient Forest',
    desc: 'Ancient trees, hidden settlements, powerful nature magic. The forest remembers everything. It has never forgotten a betrayal.',
    tags: ['Ancient Wood', 'Alchemical Herbs', 'Elven Territory']
  },
  stoneheart: {
    name: 'Stoneheart',
    subtitle: 'The Mountain Realm',
    desc: 'Underground networks stretching deeper than anywhere else. Rich in precious metals and gemstones. Dwarven strongholds that have never fallen.',
    tags: ['Precious Metals', 'Underground Networks', 'Dwarven Home']
  },
  sunreach: {
    name: 'Sunreach',
    subtitle: 'The Desert Empire',
    desc: 'Vast deserts punctuated by oases of incredible fertility. Ancient pyramids preserve magical knowledge lost to every other civilisation.',
    tags: ['Solar Magic', 'Ancient Ruins', 'Desert Resources']
  },
  azuremere: {
    name: 'Azuremere',
    subtitle: 'The Sapphire Archipelago',
    desc: 'Hundreds of islands across vast ocean expanses. Control the maritime trade routes and you control the economy of Aethelgard.',
    tags: ['Naval Power', 'Trade Routes', 'Mermen Territory']
  },
  wildlands: {
    name: 'Wildlands',
    subtitle: 'The Untamed Expanse',
    desc: 'Magical anomalies occur daily. Dimensional rifts open overnight. Dangerous creatures roam freely. Untold resources await those willing to risk everything.',
    tags: ['Magical Anomalies', 'Dimensional Rifts', 'Extreme Risk']
  },
  shadowvale: {
    name: 'Shadowvale',
    subtitle: 'The Veiled Dominion',
    desc: 'Eternal dusk. Ancient dark magic. Unique power unattainable elsewhere — at a price. Others will view you as a pariah. They will be right to.',
    tags: ['Dark Magic', 'Corrupted Resources', 'Political Isolation']
  }
};

// Map hover interaction
const mapContainer = document.querySelector('.map-container');
const tooltip = document.getElementById('continentTooltip');
const tooltipName = document.getElementById('tooltipName');
const tooltipSubtitle = document.getElementById('tooltipSubtitle');
const tooltipDesc = document.getElementById('tooltipDesc');
const tooltipTags = document.getElementById('tooltipTags');

document.querySelectorAll('.continent-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const key = card.dataset.continent;
    const data = continentData[key];
    if (!data) return;
    tooltipName.textContent = data.name;
    tooltipSubtitle.textContent = data.subtitle;
    tooltipDesc.textContent = data.desc;
    tooltipTags.innerHTML = data.tags.map(t => `<span style="font-family:var(--font-heading);font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold-dark);border:1px solid rgba(201,168,76,0.2);padding:0.15rem 0.4rem;border-radius:2px;margin-right:0.3rem">${t}</span>`).join('');
    tooltip.classList.add('visible');
  });
  card.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');
  });
});

// --- NOTIFY FORM ---
function handleNotify() {
  const email = document.getElementById('notifyEmail').value.trim();
  const btn = document.querySelector('.notify-btn');
  if (!email || !email.includes('@')) {
    btn.textContent = 'Enter valid email';
    btn.style.background = 'var(--crimson)';
    setTimeout(() => {
      btn.textContent = 'Notify Me';
      btn.style.background = '';
    }, 2000);
    return;
  }
  // Store in localStorage for now
  const list = JSON.parse(localStorage.getItem('roew_notify') || '[]');
  if (!list.includes(email)) {
    list.push(email);
    localStorage.setItem('roew_notify', JSON.stringify(list));
  }
  btn.textContent = 'You\'re on the list ✓';
  btn.style.background = '#2a6b2a';
  btn.disabled = true;
  document.getElementById('notifyEmail').value = '';
  document.getElementById('notifyEmail').placeholder = 'Registered — we\'ll be in touch';
}

// --- PROGRESS BAR ANIMATION ---
const progressFill = document.querySelector('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = progressFill.style.width;
      progressFill.style.width = '0%';
      setTimeout(() => { progressFill.style.width = targetWidth; }, 200);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (progressFill) progressObserver.observe(progressFill.parentElement);

// --- SMOOTH ANCHOR SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- CURSOR TRAIL (subtle) ---
let lastX = 0, lastY = 0;
document.addEventListener('mousemove', (e) => {
  if (Math.abs(e.clientX - lastX) < 5 && Math.abs(e.clientY - lastY) < 5) return;
  lastX = e.clientX;
  lastY = e.clientY;
  const spark = document.createElement('div');
  spark.style.cssText = `
    position:fixed;
    left:${e.clientX}px;
    top:${e.clientY}px;
    width:3px;height:3px;
    background:rgba(201,168,76,0.5);
    border-radius:50%;
    pointer-events:none;
    z-index:9999;
    transition:all 0.6s ease;
    transform:translate(-50%,-50%);
  `;
  document.body.appendChild(spark);
  requestAnimationFrame(() => {
    spark.style.opacity = '0';
    spark.style.transform = 'translate(-50%,-50%) scale(0)';
  });
  setTimeout(() => spark.remove(), 600);
});

console.log('%c⚔ REALMS OF ETERNAL WAR ⚔', 'color:#c9a84c;font-family:serif;font-size:20px;font-weight:bold');
console.log('%cTen realms. Countless paths. One world.', 'color:#7a7060;font-family:serif;font-size:12px');
console.log('%cIn Development — Unreal Engine 5', 'color:#8b0000;font-size:11px');
