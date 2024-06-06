document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const lyricsContainer = document.getElementById("lyrics");
    let lyrics = [];

    fetch("https://cdn.jsdelivr.net/gh/najikh2002/flyme/lyrics.json")
      .then((response) => response.json())
      .then((data) => {
        lyrics = data;
        lyricsContainer.textContent = "Fly Me To The Moon"; // Clear loading text
      })
      .catch((error) => {
        console.error("Error loading lyrics:", error);
        lyricsContainer.textContent = "Failed to load lyrics";
      });

    audio.addEventListener("timeupdate", () => {
      const currentTime = audio.currentTime;
      const currentLyric = lyrics.find((lyric, index) => {
        const nextLyricTime = lyrics[index + 1]
          ? lyrics[index + 1].time
          : Infinity;
        return currentTime >= lyric.time && currentTime < nextLyricTime;
      });
      if (currentLyric) {
        lyricsContainer.textContent = currentLyric.text;
      }
    });
  });