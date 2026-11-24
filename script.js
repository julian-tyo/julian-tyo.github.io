// ===== Theme toggle (remembered per browser) =====
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// ===== Mobile menu =====
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ===== Navbar background, back-to-top, active link =====
const nav = document.getElementById("nav");
const toTop = document.getElementById("toTop");
const sections = [...document.querySelectorAll("section[id]")];
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 30);
  toTop.classList.toggle("show", y > 600);
  let current = "";
  sections.forEach((s) => { if (y >= s.offsetTop - 160) current = s.id; });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Typing effect =====
const roles = [
  "Content Creator",
  "Graphic Designer",
  "Video Editor",
  "AI Content Creator",
  "Marketplace Specialist",
];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1600); }
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 45 : 90);
}
type();

// ===== Scroll reveal + number counters =====
function countUp(el) {
  const target = +el.dataset.count;
  const pre = el.dataset.prefix || "";
  const suf = el.dataset.suffix || "";
  const start = performance.now();
  const dur = 1600;
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + Math.round(target * eased) + suf;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 0.08 + "s";
  io.observe(el);
});

// ===== Project filter =====
const filterBtns = document.querySelectorAll("#filters button");
filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".project").forEach((p) => {
      const show = f === "all" || p.dataset.cat.split(" ").includes(f);
      p.classList.toggle("hide", !show);
      if (show) p.classList.add("in");
    });
  })
);

// ===== Download CV: use the PDF if it exists, otherwise open the online CV =====
const cvBtn = document.getElementById("cvBtn");
fetch(cvBtn.getAttribute("href"), { method: "HEAD" })
  .then((res) => { if (!res.ok) throw 0; })
  .catch(() => {
    cvBtn.href = "https://julianporto.my.canva.site/";
    cvBtn.removeAttribute("download");
    cvBtn.target = "_blank";
    cvBtn.rel = "noopener";
  });

document.getElementById("year").textContent = new Date().getFullYear();
