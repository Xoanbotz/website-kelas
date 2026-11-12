function initNavigation() {
  const toggle = $("#navToggle"), list = $("#navList").parentElement, bar = $("#navBar");
  const links = $$("#navList a");
  toggle.addEventListener("click", () => {
    const o = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", o);
    document.body.classList.toggle("is-locked", o);
  });
  links.forEach(a => a.addEventListener("click", () => {
    list.classList.remove("open"); toggle.setAttribute("aria-expanded", false); document.body.classList.remove("is-locked");
  }));
  const move = a => { if (!a || innerWidth <= 900) return; bar.style.width = a.offsetWidth + "px"; bar.style.transform = `translateX(${a.offsetLeft}px)`; };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const a = links.find(l => l.hash === "#" + e.target.id);
    links.forEach(l => l.classList.toggle("on", l === a)); move(a);
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => io.observe(s));
  addEventListener("resize", () => move($("#navList a.on")));
}
