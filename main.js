/* ── BURGER MENU ── */
function toggleMenu(){
  const m=document.getElementById('mobileMenu');
  const b=document.getElementById('burger');
  m.classList.toggle('open');
  b.classList.toggle('open');
}
function closeMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
}

/* ── NAVBAR ACTIVE LINK ── */
const sections=document.querySelectorAll('section,[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{
    if(s.id&&window.scrollY>=s.offsetTop-100) cur=s.id;
  });
  navLinks.forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
  });
});

/* ── SCROLL REVEAL ── */
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*80);
      io.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ── FORM ── */
function sendForm(){
  const n=document.getElementById('cn').value.trim();
  const e=document.getElementById('ce').value.trim();
  const m=document.getElementById('cm').value.trim();
  if(!n||!e||!m){alert('Iltimos, barcha maydonlarni to\'ldiring.');return;}
  window.location.href=`mailto:abdullayevjorabek1pc@gmail.com?subject=Portfolio — ${encodeURIComponent(n)}&body=${encodeURIComponent(m+'\n\nJo\'natuvchi: '+e)}`;
  document.getElementById('formOk').style.display='block';
  document.getElementById('cn').value='';
  document.getElementById('ce').value='';
  document.getElementById('cm').value='';
}