document.addEventListener("DOMContentLoaded", () => {
  $$("img[data-ph]").forEach(i => i.addEventListener("error", () => { i.onerror = null; i.src = placeholder(i.dataset.ph, 800, 1000); }, { once: true }));
  initNavigation(); initMembers(); initMusic(); initGallery(); initAnimations();
  $("#enter").addEventListener("click", () => {
    $("#intro").classList.add("out"); document.body.classList.remove("is-locked");
    setTimeout(() => $("#intro").remove(), 1400);
  });
});
