/* ==================== CONFIG — personalize these ==================== */
const CONFIG = {
  // Typewriter text lines — edit to personalize
lines: [
  "I want you to know how much I truly love you.",
  "You are the most important person in my life, and I can’t imagine a single day without you.",
  "I know I have hurt you, and I am really sorry for that.",
  "I never wanted to make you sad or cause you any pain.",
  "I realize that sometimes I make mistakes, but I promise you with all my heart that I will do everything I can to never bring any problems between us again.",
  "I will always love you, care for you, and stand by you no matter what happens.",
  "You mean the world to me, and I will never take you for granted.",
  "I want to see you happy every single day, and I will work hard to make sure you feel loved, respected, and safe with me.",
  "I will listen to you, understand you, and support you in everything you do.",
  "You are my happiness, my peace, and my everything.",
  "I don’t ever want to lose you, and I will always hold you close in my heart.",
  "I love you more than words can ever explain, and I always will."
],


  milestones: [
  { 
    date:'2022-05-14', 
    title:'First Date', 
    short:'That little cafe', 
    body:'We were nervous, we laughed, and we knew something felt different. I still remember your laugh when you spilled a drop of coffee.'
  },
  { 
    date:'2022-09-03', 
    title:'First Movie', 
    short:'Dark Room, Our Closeness, Our first kiss', 
    body:'We sang off-key and got lost intentionally. You found that tiny roadside view and it became ours.'
  },
  { 
    date:'2023-02-14', 
    title:'Valentine\'s', 
    short:'Our proper Valentines Day', 
    body:'We cooked together and burned the garlic bread. Still the best night because it was us.'
  },
  { 
    date:'2024-11-21', 
    title:'Big Fight & Make-up', 
    short:'We argued, we healed', 
    body:'We had one of our biggest fights. We stayed and fixed things — that moment showed our strength.' 
  },
  { 
    date:'2026-01-30', 
    title:'Our Anniversary', 
    short:'Almost a Decade bubu', 
    body:'I promised to always listen and support you, no matter what. I meant every word.'
  },
],

  // Memory carousel images (url, caption)
memories: [
  { url:'6.jpg', caption:'I Love You' },
  { url:'7.jpg', caption:'I Love You' },
  { url:'8.jpg', caption:'I Love You' },
  { url:'10.jpg', caption:'I Love You' },
  { url:'11.jpg', caption:'I Love You' },
  { url:'12.jpg', caption:'I Love You' },
  { url:'13.jpg', caption:'I Love You' },
  { url:'14.jpg', caption:'I Love You' },
  { url:'15.jpg', caption:'I Love You' },
  { url:'16.jpg', caption:'I Love You' },
  { url:'17.jpg', caption:'I Love You' },
  { url:'18.jpg', caption:'I Love You' },
  { url:'19.jpg', caption:'I Love You' },
  { url:'20.jpg', caption:'I Love You' },
  { url:'21.jpg', caption:'I Love You' },
  { url:'a.jpg', caption:'I Love You' },
  { url:'b.jpg', caption:'I Love You' },
  { url:'c.jpg', caption:'I Love You' },
],

  loveStartDate: "2022-05-14T00:00:00",
  reasons: [
    "You make ordinary days glow.",
    "Your smile is my sunshine.",
    "I love how you care for me.",
    "Every moment with you is magic.",
    "I promise to grow with you forever."
  ],
};
/* ==================== END CONFIG ==================== */

/* ------------------------- Helpers ------------------------- */
function sampleSVG(text){
  return `<svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" >
    <rect width="300" height="200" fill="#ff385c" fill-opacity="0.15" rx="14"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ff385c" fill-opacity="0.9" font-weight="700" font-size="28">${text}</text>
  </svg>`;
}
function pad2(n){return n<10 ? '0'+n : n;}

/* ------------------ Section 1: Typewriter & Hearts ------------------ */
const typeEl = document.getElementById('type');
const replayBtn = document.getElementById('replay');
const skipBtn = document.getElementById('skip');
const heartsArea = document.getElementById('heartsArea');

let typingIndex=0;
let charIndex=0;
let typingTimer=null;
let skipRequested=false;

function typeStep(){
  if(skipRequested){
    typeEl.textContent = CONFIG.lines.join('\n\n');
    return;
  }
  if(typingIndex >= CONFIG.lines.length){
    clearInterval(typingTimer);
    return;
  }
  let currentLine = CONFIG.lines[typingIndex];
  charIndex++;
  typeEl.textContent = CONFIG.lines.slice(0,typingIndex).join('\n\n') + (typingIndex>0?'\n\n':'') + currentLine.slice(0,charIndex);
  if(charIndex >= currentLine.length){
    typingIndex++;
    charIndex=0;
  }
}

function startTyping(){
  typingIndex=0; charIndex=0; skipRequested=false;
  typeEl.textContent='';
  clearInterval(typingTimer);
  typingTimer = setInterval(typeStep, 40);
}
replayBtn.onclick = () => startTyping();
skipBtn.onclick = () => {
  skipRequested=true;
  clearInterval(typingTimer);
  typeEl.textContent = CONFIG.lines.join('\n\n');
};
startTyping();

/* Hearts animation */
const hearts = [];
class Heart {
  constructor(x,y,vx,vy,size){
    this.x=x; this.y=y; this.vx=vx; this.vy=vy; this.size=size; this.life=100;
    this.el = document.createElement('div');
    this.el.textContent = "❤️";
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.fontSize = `${size}px`;
    this.el.style.userSelect = 'none';
    this.el.style.pointerEvents = 'none';
    this.el.style.opacity = '1';
    heartsArea.appendChild(this.el);
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.02; // slow rise
    this.life--;
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    this.el.style.opacity = (this.life/100).toFixed(2);
    if(this.life <= 0){
      heartsArea.removeChild(this.el);
      return false;
    }
    return true;
  }
}
function addHeart(){
  let rect = heartsArea.getBoundingClientRect();
  let x = Math.random()*rect.width;
  let y = rect.height + 20;
  let vx = (Math.random()-0.5)*0.2;
  let vy = 1 + Math.random()*1.5;
  let size = 18 + Math.random()*14;
  hearts.push(new Heart(x,y,-vx,-vy,size));
}
setInterval(()=>{
  if(heartsArea.offsetWidth === 0) return;
  if(hearts.length < 12) addHeart();
}, 300);
function animateHearts(){
  for(let i=hearts.length-1; i>=0; i--){
    if(!hearts[i].update()){
      hearts.splice(i,1);
    }
  }
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ------------------ Section 2: Timeline ------------------ */
const timelineEl = document.getElementById('timeline');
const modalBack = document.getElementById('modalBack');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalMedia = document.getElementById('modalMedia');
const modalDate = document.getElementById('modalDate');
const closeModalBtn = document.getElementById('closeModal');

function renderTimeline(){
  CONFIG.milestones.forEach((m,i)=>{
    let div = document.createElement('div');
    div.className = 'milestone';
    div.setAttribute('tabindex','0');
    div.setAttribute('role','listitem');
    div.setAttribute('aria-label', `${m.title} on ${m.date}: ${m.short}`);
    div.innerHTML = `<strong>${m.title}</strong><div class="date">${m.date}</div><div>${m.short}</div>`;
    div.addEventListener('keypress', (e)=>{
      if(e.key==='Enter' || e.key===' ') openModal(i);
    });
    timelineEl.appendChild(div);
  });
}

function openModal(i){
  const m = CONFIG.milestones[i];
  modalTitle.textContent = m.title;
  modalBody.textContent = m.body;
  modalDate.textContent = m.date;
  modalMedia.innerHTML = m.image;
  modalBack.style.display = 'flex';
  modalBack.setAttribute('aria-hidden','false');
  closeModalBtn.focus();
}
closeModalBtn.onclick = closeModal;
modalBack.addEventListener('click', e => {
  if(e.target === modalBack) closeModal();
});
function closeModal(){
  modalBack.style.display = 'none';
  modalBack.setAttribute('aria-hidden','true');
  timelineEl.querySelector('.milestone[tabindex="0"]').focus();
}

renderTimeline();

/* ------------------ Section 3: Carousel ------------------ */
const carouselEl = document.getElementById('carousel');
let carouselIndex = 0;

function renderCarousel(){
  CONFIG.memories.forEach((mem,i)=>{
    const slide = document.createElement('div');
    slide.className = 'fade-slide' + (i===0 ? ' active' : '');
    slide.setAttribute('aria-hidden', i===0 ? 'false' : 'true');
    slide.innerHTML = `<img src="${mem.url}" alt="${mem.caption}"><div class="carousel-caption">${mem.caption}</div>`;
    carouselEl.appendChild(slide);
  });
}
renderCarousel();

function nextCarouselSlide(){
  const slides = carouselEl.querySelectorAll('.fade-slide');
  slides[carouselIndex].classList.remove('active');
  slides[carouselIndex].setAttribute('aria-hidden', 'true');
  carouselIndex = (carouselIndex + 1) % slides.length;
  slides[carouselIndex].classList.add('active');
  slides[carouselIndex].setAttribute('aria-hidden', 'false');
}
setInterval(nextCarouselSlide, 6000);

/* ------------------ Section 4: Time Loved Clock ONLY (12-hour format hours) ------------------ */
const lovedDays = document.getElementById('lovedDays');
const lovedHours = document.getElementById('lovedHours');
const lovedMins = document.getElementById('lovedMins');
const lovedSecs = document.getElementById('lovedSecs');

const startDateInput = document.getElementById('startDate');

const reasonsArea = document.getElementById('reasonsArea');
let reasonIndex = 0;

// Set initial love start date with time included
const loveStartDate = "2014-01-30T14:00:00";

function updateLovedTime(){
  let now = new Date();
  let start = new Date(startDateInput.value ? startDateInput.value + "T14:00:00" : loveStartDate);
  let diffLoved = now - start;
  if(diffLoved < 0) diffLoved=0;
  let ld = Math.floor(diffLoved / (1000*60*60*24));
  let totalHours = Math.floor(diffLoved / (1000*60*60));
  let lhRaw = totalHours % 24;
  let lh12 = lhRaw % 12;
  if(lh12 === 0) lh12 = 12; // 12-hour format fix
  let lm = Math.floor((diffLoved / (1000*60)) % 60);
  let ls = Math.floor((diffLoved / 1000) % 60);

  lovedDays.textContent = pad2(ld);
  lovedHours.textContent = pad2(lh12);
  lovedMins.textContent = pad2(lm);
  lovedSecs.textContent = pad2(ls);
}
updateLovedTime();
setInterval(updateLovedTime, 1000);

startDateInput.value = loveStartDate.slice(0,10);

startDateInput.addEventListener('change', () => {
  updateLovedTime();
});

/* Rotate reasons every 6 seconds */
function cycleReasons(){
  reasonsArea.style.opacity = '0';
  setTimeout(()=>{
    reasonIndex = (reasonIndex + 1) % CONFIG.reasons.length;
    reasonsArea.textContent = CONFIG.reasons[reasonIndex];
    reasonsArea.style.opacity = '1';
  }, 600);
}
setInterval(cycleReasons, 6000);


/* ------------------ Section 5: Fireworks + Hearts on Click ------------------ */
const fwCanvas = document.getElementById('fw-canvas');
const fwCtx = fwCanvas.getContext('2d');
let fwWidth, fwHeight;
let fwParticles = [];
let fwRockets = [];
const GRAVITY = 0.06;

function resizeCanvas() {
  fwWidth = fwCanvas.clientWidth * window.devicePixelRatio;
  fwHeight = fwCanvas.clientHeight * window.devicePixelRatio;
  fwCanvas.width = fwWidth;
  fwCanvas.height = fwHeight;
  fwCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x,y,vx,vy,color,size,life){
    this.x=x; this.y=y; this.vx=vx; this.vy=vy; this.color=color; this.size=size; this.life=life; this.alpha=1;
  }
  update(){
    this.vx *= 0.92;
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.alpha = this.life/60;
    if(this.alpha<0) this.alpha=0;
    return this.life > 0 && this.alpha > 0;
  }
  draw(ctx){
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

class Rocket {
  constructor(x,y,vx,vy,color){
    this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.color = color;
    this.exploded = false;
  }
  update(){
    this.vx *= 0.99;
    this.vy += GRAVITY * 0.15;
    this.x += this.vx;
    this.y += this.vy;
    if(this.vy >= 0 && !this.exploded){
      this.explode();
      this.exploded = true;
    }
  }
  explode(){
    // Brighter romantic colors
    const colors = ['#ff2d55','#ff7e5f','#ff385c','#ff9a56','#ff527a'];
    for(let i=0; i<40; i++){
      const angle = Math.random()*Math.PI*2;
      const speed = Math.random()*4+1.5;
      const vx = Math.cos(angle)*speed;
      const vy = Math.sin(angle)*speed;
      const size = Math.random()*2 + 1.5;
      const color = colors[Math.floor(Math.random()*colors.length)];
      fwParticles.push(new Particle(this.x, this.y, vx, vy, color, size, 60));
    }
  }
  draw(ctx){
    if(!this.exploded){
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }
}

/* Hearts from fireworks explosion - floating hearts */
class FireHeart {
  constructor(x,y,vx,vy,size){
    this.x=x; this.y=y; this.vx=vx; this.vy=vy; this.size=size; this.life=90;
    this.el = document.createElement('div');
    this.el.textContent = "💖";
    this.el.style.position = "absolute";
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    this.el.style.fontSize = `${size}px`;
    this.el.style.userSelect = 'none';
    this.el.style.pointerEvents = 'none';
    this.el.style.opacity = '1';
    this.el.style.filter = 'drop-shadow(0 0 5px #ff527a)';
    heartsArea.appendChild(this.el);
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.03; // slow float up
    this.life--;
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    this.el.style.opacity = (this.life/90).toFixed(2);
    if(this.life <= 0){
      heartsArea.removeChild(this.el);
      return false;
    }
    return true;
  }
}

const fireHearts = [];

function launchFirework(x, y){
  const vx = (Math.random()-0.5)*2;
  const vy = -(Math.random()*6 + 7);
  const colors = ['#ff2d55','#ff7e5f','#ff385c','#ff9a56','#ff527a'];
  const color = colors[Math.floor(Math.random()*colors.length)];
  fwRockets.push(new Rocket(x, y, vx, vy, color));
}

function createHeartsAt(x,y){
  for(let i=0; i<15; i++){
    const angle = Math.random()*Math.PI*2;
    const speed = Math.random()*1.5 + 0.5;
    const vx = Math.cos(angle)*speed;
    const vy = Math.sin(angle)*speed * 0.6;
    const size = 14 + Math.random()*12;
    fireHearts.push(new FireHeart(x, y, vx, vy, size));
  }
}

function fwAnimate(){
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

  // Update rockets
  for(let i=fwRockets.length-1; i>=0; i--){
    fwRockets[i].update();
    fwRockets[i].draw(fwCtx);
    if(fwRockets[i].exploded){
      // create hearts where rocket exploded
      createHeartsAt(fwRockets[i].x, fwRockets[i].y);
      fwRockets.splice(i,1);
    }
  }
  // Update particles
  for(let i=fwParticles.length-1; i>=0; i--){
    if(!fwParticles[i].update()){
      fwParticles.splice(i,1);
      continue;
    }
    fwParticles[i].draw(fwCtx);
  }
  // Update fire hearts
  for(let i=fireHearts.length-1; i>=0; i--){
    if(!fireHearts[i].update()){
      fireHearts.splice(i,1);
    }
  }

  requestAnimationFrame(fwAnimate);
}
fwAnimate();

fwCanvas.addEventListener('click', e => {
  const rect = fwCanvas.getBoundingClientRect();
  const x = (e.clientX - rect.left);
  const y = (e.clientY - rect.top);
  launchFirework(x, y);
  finalText.style.opacity = '1';
  finalText.style.transform = 'translate(-50%, -50%) scale(1)';
  finalText.focus();
  setTimeout(() => {
    finalText.style.opacity = '0';
    finalText.style.transform = 'translate(-50%, -50%) scale(0.95)';
  }, 3500);
});
const finalText = document.getElementById('finalText');