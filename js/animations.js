function initAnimations() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));
  if (reduced) return;
  const p = $("[data-parallax]"); let t = false;
  if (p) addEventListener("scroll", () => {
    if (t) return; t = true;
    requestAnimationFrame(() => { p.style.transform = `translateY(${-scrollY * p.dataset.parallax}px)`; t = false; });
  }, { passive: true });
}
