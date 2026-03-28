const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\Users\\\\abdul\\\\OneDrive\\\\Desktop\\\\Projects\\\\MyPortfolio';

// 1. UPDATE INDEX.HTML
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
html = html.replace(/<div class="cube-container">[\s\S]*?<\/div>\s*<\/div>/, '<canvas id="hero-canvas" class="hero-canvas"></canvas>');
fs.writeFileSync(path.join(dir, 'index.html'), html);

// 2. UPDATE STYLE.CSS
let css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
css = css.replace(/:root\s*\{[\s\S]*?\}/, `:root {
  --bg: #09090b;
  --bg2: #09090b;
  --card: rgba(39, 39, 42, 0.4);
  --border: #27272a;
  --accent: #fafafa;
  --accent-dim: rgba(250, 250, 250, 0.1);
  --text: #a1a1aa;
  --muted: #71717a;
  --white: #ffffff;
  --nav-bg: rgba(9, 9, 11, 0.85);
  --menu-bg: rgba(9, 9, 11, 0.95);
  --code-hdr: rgba(0, 0, 0, 0.2);
  --grad1: transparent;
  --grad2: transparent;
  --grad3: transparent;
  --grad4: transparent;
  --grad5: transparent;
}`);

css = css.replace(/body\.light-mode\s*\{[\s\S]*?\}/, `body.light-mode {
  --bg: #fafafa;
  --bg2: #f4f4f5;
  --card: rgba(255, 255, 255, 0.8);
  --border: #e4e4e7;
  --accent: #09090b;
  --accent-dim: rgba(9, 9, 11, 0.1);
  --text: #52525b;
  --muted: #a1a1aa;
  --white: #09090b;
  --nav-bg: rgba(250, 250, 250, 0.85);
  --menu-bg: rgba(250, 250, 250, 0.95);
  --code-hdr: rgba(255, 255, 255, 0.5);
  --grad1: transparent;
  --grad2: transparent;
  --grad3: transparent;
  --grad4: transparent;
  --grad5: transparent;
}`);

css = css.replace(/\.sec-title\s*\{[\s\S]*?\}/, `.sec-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 48px;
  color: var(--white);
  letter-spacing: -1px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  width: 100%;
}`);

css = css.replace(/\.tag\s*\{[\s\S]*?\}/, `.tag {
  display: inline-block;
  font-family: "Fira Code", monospace;
  font-size: 0.85rem;
  color: var(--muted);
  background: transparent;
  padding: 0;
  border-radius: 0;
  margin-bottom: 16px;
  letter-spacing: 2px;
  border-bottom: none;
}`);

css = css.replace(/\/\* 3D CUBE[\s\S]*?@keyframes rotateCube \{[\s\S]*?\}\s*\}/, '');
css += '\\n.hero-canvas { width: 100%; height: 400px; display: block; object-fit: contain; cursor: crosshair; }';
fs.writeFileSync(path.join(dir, 'style.css'), css);

// 3. UPDATE MAIN.JS
let js = fs.readFileSync(path.join(dir, 'main.js'), 'utf8');
const ts = `
  about_tag: { uz: "// 01 MEN HAQIMDA", en: "// 01 ABOUT", ru: "// 01 ОБО МНЕ" },
  skills_tag: { uz: "// 02 TEXNOLOGIYALAR", en: "// 02 SKILLS", ru: "// 02 НАВЫКИ" },
  projects_tag: { uz: "// 03 LOYIHALAR", en: "// 03 PROJECTS", ru: "// 03 ПРОЕКТЫ" },
  certs_tag: { uz: "// 04 SERTIFIKATLAR", en: "// 04 CERTIFICATES", ru: "// 04 СЕРТИФИКАТЫ" },
  contact_tag: { uz: "// 05 BOG'LANISH", en: "// 05 CONTACT", ru: "// 05 КОНТАКТЫ" },
`;
js = js.replace(/const translations = \{/, 'const translations = {' + ts);

const partCode = `\n/* PARTICLE LOGO */
const cvs = document.getElementById('hero-canvas');
if (cvs) {
  const ctx = cvs.getContext('2d');
  
  function initCvs() {
    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;
  }
  initCvs();
  window.addEventListener('resize', initCvs);
  
  let particles = [];
  
  const offCvs = document.createElement('canvas');
  const octx = offCvs.getContext('2d');
  offCvs.width = 400; offCvs.height = 300;
  octx.fillStyle = 'white';
  octx.font = 'bold 160px "Inter", sans-serif';
  octx.textAlign = 'center';
  octx.textBaseline = 'middle';
  octx.fillText('J.A', 200, 150);
  
  const imgData = octx.getImageData(0,0,400,300).data;
  
  for(let y=0; y<300; y+=7) {
    for(let x=0; x<400; x+=7) {
      if (imgData[(y*400+x)*4+3] > 128) {
        particles.push({
          basex: x - 200,
          basey: y - 150,
          x: Math.random() * 400 - 200,
          y: Math.random() * 300 - 150,
          vx: 0, vy: 0,
          size: Math.random() * 1.5 + 1
        });
      }
    }
  }

  let mx=-1000, my=-1000;
  cvs.addEventListener('mousemove', e => {
    const rect = cvs.getBoundingClientRect();
    mx = e.clientX - rect.left - cvs.width/2;
    my = e.clientY - rect.top - cvs.height/2;
  });
  cvs.addEventListener('mouseleave', () => { mx=-1000; my=-1000; });

  let time=0;
  function drawParticles() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#fafafa';
    ctx.fillStyle = accent;
    
    ctx.save();
    ctx.translate(cvs.width/2, cvs.height/2);
    
    time += 0.03;
    for(let p of particles) {
      let dx = mx - p.x;
      let dy = my - p.y;
      let dist = Math.sqrt(dx*dx+dy*dy);
      
      let floatY = Math.sin(time + p.basex*0.05) * 6;
      let floatX = Math.cos(time + p.basey*0.05) * 4;
      
      if(dist < 70) {
        p.vx -= dx*0.015;
        p.vy -= dy*0.015;
      }
      p.vx += (p.basex + floatX - p.x)*0.02;
      p.vy += (p.basey + floatY - p.y)*0.02;
      p.vx *= 0.88; p.vy *= 0.88;
      p.x += p.vx; p.y += p.vy;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}
`;

js += partCode;
fs.writeFileSync(path.join(dir, 'main.js'), js);
