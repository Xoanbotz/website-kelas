function initGallery() {
  const cats = ["Semua", "Class Moments", "School Activities", "Friends", "Events"];
  const tabs = $("#galleryTabs"), wall = $("#masonry"), lb = $("#lightbox");
  let shown = [], cur = 0;
  function render(c) {
    wall.replaceChildren();
    shown = MEMORIES.filter(m => c === "Semua" || m.category === c);
    if (!shown.length) { wall.textContent = "Belum ada foto di kategori ini. Tambahkan di data/memories.js."; return; }
    shown.forEach((m, i) => {
      const f = document.createElement("figure"), b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Buka foto: " + m.caption);
      b.append(img(m.photo, "Foto kenangan", m.caption, 600, i % 3 ? 400 : 700));
      const cap = document.createElement("figcaption"); cap.textContent = `${m.caption} — ${m.date}`;
      b.append(cap); f.append(b); b.addEventListener("click", () => show(i, true)); wall.append(f);
    });
  }
  function show(i, first) {
    cur = (i + shown.length) % shown.length; const m = shown[cur], el = $("#lbImg");
    el.style.opacity = 0;
    setTimeout(() => { el.onerror = () => { el.onerror = null; el.src = placeholder("Foto kenangan", 900, 600); }; el.src = m.photo; el.alt = m.caption; $("#lbCap").textContent = `${m.caption} — ${m.date}`; el.style.opacity = 1; }, first ? 0 : 200);
    if (first) trapOpen(lb);
  }
  cats.forEach((c, i) => {
    const b = document.createElement("button"); b.className = "tab"; b.role = "tab"; b.textContent = c; b.setAttribute("aria-selected", i === 0);
    b.addEventListener("click", () => { $$(".tab", tabs).forEach(t => t.setAttribute("aria-selected", t === b)); render(c); });
    tabs.append(b);
  });
  $("#lbPrev").onclick = () => show(cur - 1); $("#lbNext").onclick = () => show(cur + 1);
  lb.addEventListener("click", e => { if (e.target === lb || e.target.dataset.close !== undefined) trapClose(lb); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") trapClose(lb); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1);
  });
  render("Semua");
}
