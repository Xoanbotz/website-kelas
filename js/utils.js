const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = n => String(n).padStart(2, "0");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const placeholder = (t, w = 600, h = 800) => "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#1B2029"/><text x="50%" y="50%" fill="#9299A5" font-family="sans-serif" font-size="${w / 12}" text-anchor="middle">${t}</text></svg>`);
function img(src, label, alt = "", w, h, lazy = true) {
  const i = new Image();
  i.alt = alt; if (lazy) i.loading = "lazy";
  i.onerror = () => { i.onerror = null; i.src = placeholder(label, w, h); };
  i.src = src; return i;
}
function trapOpen(el) { el.hidden = false; requestAnimationFrame(() => el.classList.add("open")); document.body.classList.add("is-locked"); }
function trapClose(el) { el.classList.remove("open"); setTimeout(() => { el.hidden = true; if (!$(".modal.open,.lightbox.open")) document.body.classList.remove("is-locked"); }, 350); }
