# CLAUDE_MEMORY — MyPortfolio (mansurbekovich.uz)

Statik sayt: `index.html`, `style.css`, `main.js` (i18n uz/en/ru), `cv/cv-{uz,en,ru}.html`.
Build/test yo'q. Lokal ko'rish: `python -m http.server 8765` (repo ildizida).

## Qarorlar va sabablari

- Sertifikatlar (2026-11-13): 5 tasi ko'rinadi — Hackathon, UX Design Spec, IT Support Spec, Wireframes, Networking (frontendga eng mos va bir-birini takrorlamaydigan). Qolgan 7 tasi `data-archived`.

- **Arxivlangan loyihalar (2026-11-13):** first-project, boldo, monito, blog-title,
  designer, liquid-glass kartalari HTML'dan o'chirilmagan — `data-archived` atributi
  bilan yashirilgan (`style.css`: `.project-card[data-archived]{display:none}`).
  Qaytarish: kartadan `data-archived` ni olib tashlash. Foydalanuvchi "aytganimda
  darhol qaytarilsin" degan. Ko'rinadiganlari: Navbat (smart-queue), IT Park CRM,
  Soatbay (repo `Ijara_Xonadon`, ijara-xonadon.vercel.app, `proj_desc_9`, 2026-11-21).
  Karta rasmi — jonli saytning 1440×900 birinchi ekrani (headless Edge `--screenshot`).
  About'dagi "5+ Projects" raqami o'zgartirilmagan. CV "Tanlangan loyihalar" ham
  Navbat + IT Park CRM ga almashtirilgan (2026-11-13).
- **Favicon:** eski `favicon.png` shaffof fonda oq `</>` edi — Google natijasida oq
  doira bo'lib ko'rinmagan. Endi qora yumaloq kvadrat fonda; `favicon.ico` (ildizda,
  16/32/48), `assets/favicon-192.png` (Google 48 ga karrali o'lcham istaydi),
  `assets/apple-touch-icon.png`. Google kesh yangilanishi bir necha kun-hafta oladi.
- **Instagram:** `https://www.instagram.com/_mansurbekov1c/` (kanonik URL).
- **CV print:** `@page A4 margin 0` + `print-color-adjust: exact` — aks holda Chrome
  qorong'i chap panel fonini tashlab yuboradi va och matn ko'rinmay qoladi.
  Har o'zgarishdan keyin 3 tilda ham 1 bet ekanini tekshirish (headless Edge
  `--print-to-pdf`, betlar soni).
- **Sertifikatlar:** eng yangisi grid boshida. Rasm 420×324 PNG, `assets/certs/`.
  About'dagi sertifikat soni (`stat-num`) qo'lda yangilanadi (hozir 5).

## Ochiq savollar

- Hozircha yo'q.
