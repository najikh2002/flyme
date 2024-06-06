document.addEventListener("DOMContentLoaded", function () {
    const playBtn = document.getElementById("playButton");
    const lyricsContainer = document.getElementById("lyrics");
    let lyrics = [];
    const audio = new Audio("fmttm.mp3");

    // fetch("https://cdn.jsdelivr.net/gh/najikh2002/flyme/lyrics.json")
    fetch("lyrics.json")
      .then((response) => response.json())
      .then((data) => {
        lyrics = data;
        lyricsContainer.textContent = "Fly Me To The Moon"; // Clear loading text
      })
      .catch((error) => {
        console.error("Error loading lyrics:", error);
        lyricsContainer.textContent = "Failed to load lyrics";
      });

    playBtn.addEventListener('click', () => {
        audio.play();
        playBtn.style.display = 'none'; 
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

    audio.addEventListener('ended', () => {
        audio.currentTime = 0; 
        playBtn.style.display = 'block'; 
    });
  });