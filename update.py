import re
import os

os.chdir(r"c:\\Users\\abdul\\OneDrive\\Desktop\\Projects\\MyPortfolio")

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace hero-right code window
html = re.sub(
    r'<div\s+class="hero-right reveal"[^>]*>.*?<div class="code-window">.*?</div>\s*</div>\s*</div>',
    r'''<div class="hero-right reveal" style="display: flex; justify-content: center; align-items: center; perspective: 1000px;">
        <div class="cube-container">
          <div class="cube">
            <div class="cube-face front">HTML5</div>
            <div class="cube-face back">CSS3</div>
            <div class="cube-face right">JS</div>
            <div class="cube-face left">React</div>
            <div class="cube-face top">UI/UX</div>
            <div class="cube-face bottom">Git</div>
          </div>
        </div>
      </div>''',
    html,
    flags=re.DOTALL
)

# Replace about grid right side
html = re.sub(
    r'<div class="about-stats reveal">',
    r'<div class="about-stats-container">\n            <div class="about-stats reveal">',
    html
)

html = re.sub(
    r'(<div class="stat-label" data-i18n="stat_learn_label">.*?</div[^>]*>\s*</div[^>]*>\s*)</div[^>]*>',
    r'\1</div>\n            <div class="about-card reveal">\n              <div class="ac-hdr" data-i18n="about_dev_info">Developer Info</div>\n              <div class="ac-body">\n                <div class="ac-row"><span class="ac-label" data-i18n="info_name">Name:</span> <span class="ac-val">Jo\'rabek</span></div>\n                <div class="ac-row"><span class="ac-label" data-i18n="info_role">Role:</span> <span class="ac-val" data-i18n="info_role_val">Frontend Dev</span></div>\n                <div class="ac-row"><span class="ac-label" data-i18n="info_location">Location:</span> <span class="ac-val" data-i18n="info_loc_val">Xorazm, UZ</span></div>\n                <div class="ac-row"><span class="ac-label" data-i18n="info_skills">Skills:</span> <span class="ac-val">HTML, CSS, JS, Git</span></div>\n                <div class="ac-row"><span class="ac-label" data-i18n="info_learning">Learning:</span> <span class="ac-val">React</span></div>\n                <div class="ac-row"><span class="ac-label" data-i18n="info_status">Status:</span> <span class="ac-badge" data-i18n="info_available">Open to work 🚀</span></div>\n              </div>\n            </div>\n          </div>',
    html,
    flags=re.DOTALL
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

# UPDATE STYLE.CSS
with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(r'\.code-window \{.*?\@keyframes blink \{.*?\}\s*\}', '', css, flags=re.DOTALL)

new_css = """
/* 3D CUBE ANIMATION */
.cube-container {
  width: 200px;
  height: 200px;
  perspective: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
}
.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 15s infinite linear;
}
.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  background: var(--nav-bg);
  border: 1px solid var(--accent);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fira Code", monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  box-shadow: 0 0 25px rgba(249, 115, 22, 0.2);
  backdrop-filter: blur(8px);
}
.cube-face.front  { transform: rotateY(  0deg) translateZ(100px); }
.cube-face.back   { transform: rotateY(180deg) translateZ(100px); }
.cube-face.right  { transform: rotateY( 90deg) translateZ(100px); }
.cube-face.left   { transform: rotateY(-90deg) translateZ(100px); }
.cube-face.top    { transform: rotateX( 90deg) translateZ(100px); }
.cube-face.bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotateCube {
  0%   { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* ABOUT CARD / DEV INFO */
.about-stats-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.about-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  font-family: "Fira Code", monospace;
  transition: all 0.25s;
}
.about-card:hover { border-color: var(--accent); }
.ac-hdr { font-size: 1.1rem; font-weight: 700; color: var(--white); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px dashed var(--border); }
.ac-body { display: flex; flex-direction: column; gap: 12px; }
.ac-row { display: flex; justify-content: flex-start; align-items: center; font-size: 0.85rem; gap: 12px; }
.ac-label { color: var(--accent); width: 100px; flex-shrink: 0; }
.ac-val { color: var(--text); font-weight: 500; }
.ac-badge { background: rgba(34, 197, 94, 0.15); color: #22c55e; padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 600; }

/* ABOUT */"""

css = css.replace("/* ABOUT */", new_css)

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)

# UPDATE MAIN.JS
with open("main.js", "r", encoding="utf-8") as f:
    js = f.read()

new_translations = """
  about_dev_info: { uz: "Dasturchi haqida", en: "Developer Info", ru: "Инфо разработчика" },
  info_name: { uz: "Ism:", en: "Name:", ru: "Имя:" },
  info_role: { uz: "Kasb:", en: "Role:", ru: "Роль:" },
  info_role_val: { uz: "Frontend Dasturchi", en: "Frontend Dev", ru: "Frontend Разраб" },
  info_location: { uz: "Manzil:", en: "Location:", ru: "Локация:" },
  info_loc_val: { uz: "Xorazm, O'zbekiston", en: "Xorazm, UZ", ru: "Хорезм, УЗ" },
  info_skills: { uz: "Texnologiyalar:", en: "Skills:", ru: "Навыки:" },
  info_learning: { uz: "O'rganmoqda:", en: "Learning:", ru: "Изучает:" },
  info_status: { uz: "Holat:", en: "Status:", ru: "Статус:" },
  info_available: { uz: "Ishga tayyor 🚀", en: "Open to work 🚀", ru: "Открыт к работе 🚀" },
"""

js = re.sub(r'const translations = \{', 'const translations = {' + new_translations, js)

with open("main.js", "w", encoding="utf-8") as f:
    f.write(js)