function initMembers() {
  const grid = $("#memberGrid"), modal = $("#modal");
  STUDENTS.forEach((s, idx) => {
    const b = document.createElement("button");
    b.className = "m reveal"; b.type = "button"; b.setAttribute("aria-label", `Buka profil ${s.name}`);
    b.style.transitionDelay = `${(idx % 6) * 60}ms`;
    const box = document.createElement("div"); box.className = "m__img";
    box.append(img(s.photo, s.name, s.name, 600, 800));
    box.insertAdjacentHTML("beforeend", `<div class="m__over"><b></b><span></span></div>`);
    $("b", box).textContent = s.favoriteSong; $("span", box).textContent = s.artist;
    b.append(box);
    b.insertAdjacentHTML("beforeend", `<p class="m__no">No. ${pad(s.id)}</p><p class="m__name"></p>`);
    $(".m__name", b).textContent = s.name + (s.nickname ? ` (${s.nickname})` : "");
    b.addEventListener("click", () => open(s));
    grid.append(b);
  });
  let last;
  function open(s) {
    last = document.activeElement;
    const old = $("#mPhoto"); old.replaceWith(Object.assign(img(s.photo, s.name, s.name, 600, 800, false), { id: "mPhoto" }));
    const oc = $("#mCover"); oc.replaceWith(Object.assign(img(s.coverUrl || "", "Cover", "", 112, 112, false), { id: "mCover" }));
    $("#mNo").textContent = `No. ${pad(s.id)}`; $("#mName").textContent = s.name;
    $("#mNick").textContent = `Panggilan: ${s.nickname}`; $("#mBio").textContent = s.bio;
    $("#mSong").textContent = s.favoriteSong; $("#mArtist").textContent = s.artist;
    const a = $("#mPlay");
    if (s.musicUrl) { a.href = s.musicUrl; a.removeAttribute("aria-disabled"); } else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); }
    trapOpen(modal); $(".modal__close").focus();
  }
  const close = () => { trapClose(modal); last && last.focus(); };
  modal.addEventListener("click", e => { if (e.target === modal || e.target.dataset.close !== undefined) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });
}
