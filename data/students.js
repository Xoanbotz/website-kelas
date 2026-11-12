// Ganti isi data ini. Foto: assets/images/members/student-XX.jpg
// musicUrl: tautan resmi Spotify / YouTube Music. coverUrl: opsional.
window.STUDENTS = Array.from({ length: 33 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    name: `Student ${n}`,
    nickname: "Panggilan",
    photo: `assets/images/members/student-${n}.jpg`,
    favoriteSong: "Judul Lagu",
    artist: "Nama Artis",
    musicUrl: "",
    coverUrl: "",
    featured: false,
    bio: "Deskripsi singkat."
  };
});
