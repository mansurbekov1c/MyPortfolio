/* BURGER */
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
  document.getElementById("burger").classList.toggle("open");
}
function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("burger").classList.remove("open");
}

/* ACTIVE NAV */
const allSections = document.querySelectorAll("section,[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let cur = "";
  allSections.forEach((s) => {
    if (s.id && window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navAs.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur),
  );
});

/* SCROLL REVEAL */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* FORM — Telegram Bot orqali */
async function sendForm() {
  const n = document.getElementById("cn").value.trim();
  const e = document.getElementById("ce").value.trim();
  const m = document.getElementById("cm").value.trim();

  if (!n || !e || !m) {
    const lang = document.documentElement.lang || "en";
    if(lang === "uz") alert("Iltimos, barcha maydonlarni to'ldiring.");
    else if(lang === "ru") alert("Пожалуйста, заполните все поля.");
    else alert("Please fill in all fields.");
    return;
  }

  const ok = document.getElementById("formOk");
  const err = document.getElementById("formErr");
  const load = document.getElementById("formLoad");
  const btn = document.getElementById("sendBtn");

  ok.style.display = "none";
  err.style.display = "none";
  load.style.display = "block";
  btn.disabled = true;

  const TOKEN = "8795691940:AAGxnfZgcOQD9BpfR0N05JH99-gu73Vu0vY"; 
  const CHAT_ID = "6484162162"; 

  const text = `📩 *Portfolio xabari*\n\n👤 *Ism:* ${n}\n📧 *Email:* ${e}\n\n💬 *Xabar:*\n${m}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      },
    );
    const data = await res.json();
    load.style.display = "none";
    if (data.ok) {
      ok.style.display = "block";
      document.getElementById("cn").value = "";
      document.getElementById("ce").value = "";
      document.getElementById("cm").value = "";
    } else {
      err.style.display = "block";
    }
  } catch (e) {
    load.style.display = "none";
    err.style.display = "block";
  }
  btn.disabled = false;
}

/* THEME TOGGLE */
const themeBtn = document.getElementById("theme-btn");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  if(themeBtn) themeBtn.textContent = "☀️";
} else {
  if(themeBtn) themeBtn.textContent = "🌙";
}
if(themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
  });
}

/* LANGUAGE TRANSLATIONS */
const translations = {
  nav_home: { uz: "Home", en: "Home", ru: "Главная" },
  nav_about: { uz: "About", en: "About", ru: "Обо мне" },
  nav_skills: { uz: "Skills", en: "Skills", ru: "Навыки" },
  nav_projects: { uz: "Projects", en: "Projects", ru: "Проекты" },
  nav_certs: { uz: "Certificates", en: "Certificates", ru: "Сертификаты" },
  nav_contact: { uz: "Contact", en: "Contact", ru: "Контакты" },

  hero_greeting: { uz: "// Salom, dunyo! 👋", en: "// Hello, world! 👋", ru: "// Привет, мир! 👋" },
  hero_role: { uz: "Frontend Developer", en: "Frontend Developer", ru: "Frontend Разработчик" },
  hero_desc: {
    uz: "Men veb-interfeyslar yasashga ixtisoslashgan frontendchiman. Toza kod, chiroyli dizayn va foydalanuvchiga qulay saytlar yarataman.",
    en: "I am a frontend developer specializing in building web interfaces. I create user-friendly websites with clean code and beautiful design.",
    ru: "Я фронтенд-разработчик, специализирующийся на создании веб-интерфейсов. Создаю удобные сайты с чистым кодом и красивым дизайном."
  },
  hero_btn_projects: { uz: "Loyihalarimni ko'rish", en: "View my projects", ru: "Смотреть проекты" },
  hero_btn_cv: { uz: "CV yuklab olish", en: "Download CV", ru: "Скачать CV" },

  about_tag: { uz: "// about.me", en: "// about.me", ru: "// обо_мне" },
  about_title_1: { uz: "Men ", en: "About ", ru: "Обо " },
  about_title_2: { uz: "haqimda", en: "me", ru: "мне" },
  about_p1: {
    uz: "Men <strong>Xorazmda</strong> yashovchi frontend dasturchiman. <strong>1 yildan</strong> beri HTML, CSS va JavaScript o'rganaman va har kuni yangi narsalar kashf etaman.",
    en: "I am a frontend developer based in <strong>Xorazm</strong>. I have been learning HTML, CSS, and JavaScript for <strong>1 year</strong>, discovering new things every day.",
    ru: "Я фронтенд-разработчик из <strong>Хорезма</strong>. Изучаю HTML, CSS и JavaScript уже <strong>1 год</strong> и каждый день открываю для себя что-то новое."
  },
  about_p2: {
    uz: "Asosan <strong>landing page</strong> va ko'p sahifali saytlar yasayman. Hozir <strong>React</strong> o'rganishni boshladim va kelajakda full-stack dasturchi bo'lishni maqsad qilganman.",
    en: "I mostly build <strong>landing pages</strong> and multi-page websites. I recently started learning <strong>React</strong> and aim to become a full-stack developer in the future.",
    ru: "В основном я создаю <strong>лендинги</strong> и многостраничные сайты. Недавно начал изучать <strong>React</strong> и в будущем планирую стать full-stack разработчиком."
  },
  about_p3: {
    uz: "Al-Xorazmiy Vorislari dasturida ta'lim olaman va Coursera orqali <strong>Google sertifikatlarini</strong> muvaffaqiyatli tugatganman.",
    en: "I study in the 'Heirs of Al-Khwarizmi' program and have successfully completed <strong>Google certificates</strong> via Coursera.",
    ru: "Обучаюсь по программе 'Наследники Аль-Хорезми' и успешно завершил <strong>сертификации Google</strong> на Coursera."
  },

  stat_exp_label: { uz: "Yil tajriba", en: "Year experience", ru: "Год опыта" },
  stat_proj_label: { uz: "Loyihalar", en: "Projects", ru: "Проекты" },
  stat_cert_label: { uz: "Sertifikatlar", en: "Certificates", ru: "Сертификаты" },
  stat_learn_label: { uz: "O'rganish istagi", en: "Desire to learn", ru: "Желание учиться" },

  skills_tag: { uz: "// skills.list", en: "// skills.list", ru: "// мои_навыки" },
  skills_title_1: { uz: "Ko'nik", en: "My ", ru: "Мои " },
  skills_title_2: { uz: "malarim", en: "Skills", ru: "навыки" },
  skills_group_1: { uz: "Asosiy texnologiyalar", en: "Core Technologies", ru: "Основные технологии" },
  skills_group_2: { uz: "O'rganayotganlar", en: "Learning", ru: "Изучаю" },
  skills_group_3: { uz: "Asboblar", en: "Tools", ru: "Инструменты" },

  projects_tag: { uz: "// projects.all", en: "// projects.all", ru: "// все_проекты" },
  projects_title_1: { uz: "Loyi", en: "My ", ru: "Мои " },
  projects_title_2: { uz: "halarim", en: "Projects", ru: "проекты" },

  proj_desc_1: { uz: "Onlayn ta'lim platformasi uchun landing page. Noldan yaratilgan birinchi to'liq veb-loyiha.", en: "Landing page for an online education platform. The first full web project created from scratch.", ru: "Лендинг для платформы онлайн-образования. Мой первый полноценный веб-проект с нуля." },
  proj_desc_2: { uz: "Home, About va Blog bo'limlari bilan to'liq ko'p sahifali biznes vebsayt shabloni.", en: "Complete multi-page business website template with Home, About, and Blog sections.", ru: "Полноценный многостраничный шаблон бизнес-сайта с разделами Главная, О нас и Блог." },
  proj_desc_3: { uz: "Uy hayvonlari do'koni vebsayti. Mahsulot katalogi va zamonaviy responsive dizayn.", en: "Pet store website. Product catalog and modern responsive design.", ru: "Сайт зоомагазина. Каталог товаров и современный адаптивный дизайн." },
  proj_desc_4: { uz: "Tipografiya va kontent dizayniga e'tibor qaratilgan zamonaviy blog sahifasi.", en: "Modern blog page focused on typography and content design.", ru: "Современная страница блога с акцентом на типографику и дизайн контента." },
  proj_desc_5: { uz: "Ijodiy UI kompozitsiyasi va vizual estetikani o'rganuvchi dizayn loyihasi.", en: "Design project exploring creative UI composition and visual aesthetics.", ru: "Дизайн-проект, исследующий креативную UI композицию и визуальную эстетику." },

  certs_tag: { uz: "// certificates", en: "// certificates", ru: "// сертификаты" },
  certs_title_1: { uz: "Sertifi", en: "My ", ru: "Мои " },
  certs_title_2: { uz: "katlarim", en: "Certificates", ru: "сертификаты" },
  cert_view: { uz: "Ko'rish →", en: "View →", ru: "Смотреть →" },

  contact_tag: { uz: "// contact.me", en: "// contact.me", ru: "// связаться" },
  contact_title_1: { uz: "Bog'", en: "Get in ", ru: "Связа" },
  contact_title_2: { uz: "laning", en: "Touch", ru: "ться" },
  contact_intro: { uz: "Loyiha yoki hamkorlik bo'yicha murojaat qilishingiz mumkin. Har doim javob beraman! 🤝", en: "Feel free to reach out for a project or collaboration. I always look forward to answering! 🤝", ru: "Пишите по вопросам проектов или сотрудничества. Всегда рад ответить! 🤝" },
  contact_form_name: { uz: "Ismingiz", en: "Your Name", ru: "Ваше имя" },
  contact_form_email: { uz: "Emailingiz", en: "Your Email", ru: "Ваш Email" },
  contact_form_msg: { uz: "Xabar", en: "Message", ru: "Сообщение" },
  contact_btn: { uz: "Xabar yuborish →", en: "Send Message →", ru: "Отправить письмо →" },

  form_ph_name: { uz: "Ism Familiya", en: "John Doe", ru: "Иван Иванов" },
  form_ph_msg: { uz: "Salom Jo'rabek, ...", en: "Hi Jo'rabek, ...", ru: "Привет Джорабек, ..." },

  form_ok: { uz: "✅ Xabar yuborildi! Tez orada javob beraman.", en: "✅ Message sent! I will reply shortly.", ru: "✅ Сообщение отправлено! Я скоро отвечу." },
  form_err: { uz: "❌ Xatolik yuz berdi. Iltimos, to'g'ridan Telegram yoki email orqali yozing.", en: "❌ An error occurred. Please write directly via Telegram or email.", ru: "❌ Произошла ошибка. Пожалуйста, напишите напрямую в Telegram или на почту." },
  form_loading: { uz: "⏳ Yuborilmoqda...", en: "⏳ Sending...", ru: "⏳ Отправка..." },

  footer_copy: { uz: "© 2025 Jo'rabek Abdullayev. Barcha huquqlar himoyalangan.", en: "© 2025 Jo'rabek Abdullayev. All rights reserved.", ru: "© 2025 Джорабек Абдуллаев. Все права защищены." }
};

const langSelect = document.getElementById("lang-select");
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  if(langSelect) langSelect.value = lang;
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(translations[key] && translations[key][lang]) {
      el.innerHTML = translations[key][lang];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if(translations[key] && translations[key][lang]) {
      el.setAttribute("placeholder", translations[key][lang]);
    }
  });
}

// Initial language load
const currentLang = localStorage.getItem("lang") || "en";
// Only run translation if DOM is fully loaded or ready 
// Since script is at bottom of body, we can just run it
setLanguage(currentLang);

if(langSelect) {
  langSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
}
