// Pemutar musik: lagu siswa (assets/audio/members/student-XX.mp3) + musik latar.
const Player = (() => {
  const song = new Audio(), bg = new Audio();
  let bgOn = true, bgOk = false, timer;
  bg.loop = true; bg.volume = (window.SITE && SITE.bgVolume) || .35;
  const bar = () => $("#player");
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(timer); timer = setTimeout(() => (t.hidden = true), 3500);
  }
  const srcFor = s => s.audio || `assets/audio/members/student-${pad(s.id)}.mp3`;
  function resumeBg() { if (bgOn && bgOk) bg.play().catch(() => {}); }
  const ytId = u => ((u || "").match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/) || [])[1];
  function stopYt() { const f = $("#pYt"); f.src = "about:blank"; f.hidden = true; $("#pSeek").hidden = false; $("#pBtn").hidden = false; }
  // Tidak ada MP3: pakai musicUrl. YouTube diputar lewat pemutar resmi (embed), link lain dibuka di tab baru.
  function fallback(s) {
    const id = ytId(s.musicUrl);
    if (id) {
      const f = $("#pYt"); f.src = `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`; f.hidden = false;
      $("#pSeek").hidden = true; $("#pBtn").hidden = true;
      $("#pTitle").textContent = s.favoriteSong; $("#pArtist").textContent = s.artist; bar().hidden = false; return;
    }
    if (s.musicUrl) { if (!window.open(s.musicUrl, "_blank", "noopener")) toast("Pop-up diblokir. Izinkan pop-up untuk membuka lagu."); return; }
    toast(`Audio ${s.name} belum ada. Isi musicUrl atau taruh MP3 di assets/audio/members/`); resumeBg();
  }
  function play(s) {
    stopYt();
    if (song.dataset.id == s.id && !song.paused) { song.pause(); return; }
    song.dataset.id = s.id; song.src = srcFor(s);
    bg.pause();
    song.play().then(() => {
      $("#pTitle").textContent = s.favoriteSong; $("#pArtist").textContent = s.artist;
      bar().hidden = false;
    }).catch(() => fallback(s));
  }
  song.addEventListener("play", () => ($("#pBtn").textContent = "Jeda"));
  song.addEventListener("pause", () => ($("#pBtn").textContent = "Putar"));
  song.addEventListener("ended", () => { bar().hidden = true; resumeBg(); });
  song.addEventListener("timeupdate", () => { if (song.duration) $("#pSeek").value = (song.currentTime / song.duration) * 100; });
  function startBg() {
    if (!window.SITE || !SITE.bgMusic) return;
    bg.src = SITE.bgMusic;
    bg.play().then(() => { bgOk = true; const b = $("#soundBtn"); b.hidden = false; }).catch(() => {});
  }
  function init() {
    $("#pBtn").onclick = () => (song.paused ? (bg.pause(), song.play()) : song.pause());
    $("#pSeek").oninput = e => { if (song.duration) song.currentTime = (e.target.value / 100) * song.duration; };
    $("#pClose").onclick = () => { stopYt(); song.pause(); bar().hidden = true; resumeBg(); };
    $("#soundBtn").onclick = e => {
      bgOn = !bgOn; e.target.textContent = bgOn ? "Musik latar: On" : "Musik latar: Off";
      e.target.setAttribute("aria-pressed", bgOn);
      if (bgOn && song.paused) bg.play().catch(() => {}); else bg.pause();
    };
  }
  return { play, startBg, init };
})();
