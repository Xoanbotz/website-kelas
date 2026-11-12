function initMusic() {
  const modes = { all: "All Songs", fav: "Favorite Tracks", recent: "Recently Added" };
  const tabs = $("#musicTabs"), list = $("#trackList");
  const get = m => m === "fav" ? STUDENTS.filter(s => s.featured) : m === "recent" ? [...STUDENTS].sort((a, b) => b.id - a.id).slice(0, 10) : STUDENTS;
  function render(m) {
    list.replaceChildren();
    const items = get(m);
    if (!items.length) { list.innerHTML = `<li><span>Belum ada lagu favorit. Set <code>featured: true</code> di data/students.js.</span></li>`; return; }
    items.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="n">${pad(i + 1)}</span><span class="c"></span><div><b></b><span class="art"></span><span class="who"></span></div>`;
      $(".c", li).replaceWith(img(coverFor(s), "Cover", "", 112, 112));
      $("b", li).textContent = s.favoriteSong; $(".art", li).textContent = s.artist; $(".who", li).textContent = `dipilih ${s.nickname !== "Panggilan" ? s.nickname : s.name}`;
      const a = document.createElement("button"); a.type = "button"; a.className = "btn btn--sm"; a.textContent = "Play"; a.onclick = () => Player.play(s);
      li.append(a); list.append(li);
    });
  }
  Object.entries(modes).forEach(([k, label], i) => {
    const b = document.createElement("button"); b.className = "tab"; b.role = "tab"; b.textContent = label; b.setAttribute("aria-selected", i === 0);
    b.addEventListener("click", () => { $$(".tab", tabs).forEach(t => t.setAttribute("aria-selected", t === b)); render(k); });
    tabs.append(b);
  });
  render("all");
}
