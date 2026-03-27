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
    alert("Iltimos, barcha maydonlarni to'ldiring.");
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

  /* 
    Xabarni Telegram botga yuborish uchun quyidagilarni qiling:
    1. @BotFather da yangi bot yarating → TOKEN oling
    2. Botingizga /start yuboring → CHAT_ID oling (@userinfobot orqali)
    3. Quyidagi TOKEN va CHAT_ID ni o'zgartiring
  */
  const TOKEN = "8795691940:AAGxnfZgcOQD9BpfR0N05JH99-gu73Vu0vY"; // <-- shu yerga bot tokeningizni qo'ying
  const CHAT_ID = "6484162162"; // <-- shu yerga chat id ingizni qo'ying

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
