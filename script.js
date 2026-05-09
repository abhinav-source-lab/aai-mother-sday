<!-- index.html (refined, warm + cute, keeping your structure + features) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Mother's Day, Aai 💖</title>

  <!-- Fonts: elegant + soft handwritten accent -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Quicksand:wght@400;600;700&family=Sacramento&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="style.css">
</head>

<body>

<!-- soft ambient glow -->
<div class="ambient ambient-a"></div>
<div class="ambient ambient-b"></div>

<header class="hero section reveal">
  <div class="container">

    <p class="eyebrow">with all my love</p>

    <h1>Happy Mother's Day, Aai</h1>

    <p class="hero-subtitle">
      This little space is just for you —
      filled with love, quiet moments, and everything you mean to us.
    </p>

    <div class="hero-actions">
      <a class="btn btn-primary" href="#gallery">Open Album ✨</a>

      <button class="btn btn-soft" id="sprinkleLoveBtn">
        Send Aai a Hug 💖
      </button>
      
      <button class="btn btn-soft" id="musicBtn">
        Play Music 🎵
      </button>
    </div>

    <p class="hug-counter" id="hugCounterText">Hugs sent: 0</p>

  </div>
</header>

<main>

<!-- MESSAGE SECTION -->
<section class="section reveal">
  <div class="container">

    <h2>Messages for You</h2>

    <div class="message-grid">

      <div class="message-card">
        <h3>From Me</h3>
        <p>
          Aai, you are the warmth in everything we call home.
          The way you love, care, and show up for us — it shapes who I am every day.
          I’m endlessly grateful for you.
        </p>
      </div>

      <div class="message-card">
        <h3>From Aurus</h3>
        <p>
          Thank you for cuddles, snacks, and always letting me be close to you.
          Also, I am clearly your favorite. 🐾
        </p>
      </div>

    </div>

  </div>
</section>

<!-- GALLERY -->
<section class="section reveal" id="gallery">
  <div class="container">
    <h2>Our Family Album</h2>
    <p class="section-subtext">Little moments, big love.</p>
    <div class="photo-grid" id="photoGrid"></div>
  </div>
</section>

<!-- MEMORY -->
<section class="section reveal">
  <div class="container">

    <h2>Memory Notes</h2>

    <p class="section-subtext">
      Each click is a reminder of how loved you are.
    </p>

    <button class="btn btn-primary" id="memoryBtn">
      Open Memory ✨
    </button>

    <div class="memory-card" id="memoryCard">
      <p id="memoryText">Click to reveal a little piece of love.</p>
    </div>

  </div>
</section>

</main>

<footer class="footer">
  <p>
    Made with love for Aai — our home, our comfort, our everything 🤍
  </p>
</footer>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox">
  <button id="lightboxClose">×</button>
  <img id="lightboxImg">
  <p id="lightboxCaption"></p>
</div>

<!-- MUSIC -->
<audio id="bgMusic" loop>
  <source src="music.mp3" type="audio/mpeg">
</audio>

<script src="script.js"></script>

</body>
</html>

// ===============================
// script.js (enhanced interactions)
// ===============================

const photos = [
  { src: "photo-01.png", caption: "Warm hugs and open skies." },
  { src: "photo-02.png", caption: "A family selfie full of love." },
  { src: "photo-03.png", caption: "Every candid moment is a treasure." },
  { src: "photo-04.png", caption: "The comfort of being together." },
  { src: "photo-05.png", caption: "Cozy smiles by the window." },
  { src: "photo-06.png", caption: "Mirror memories with heart." },
  { src: "photo-07.png", caption: "Aai and Aurus, best team ever." },
  { src: "photo-08.png", caption: "A room full of joy and family." },
  { src: "photo-09.png", caption: "Soft moments from a special day." },
  { src: "photo-10.png", caption: "Home, comfort, and everyday love." }
];

const photoGrid = document.getElementById("photoGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const sprinkleLoveBtn = document.getElementById("sprinkleLoveBtn");
const hugCounterText = document.getElementById("hugCounterText");

let hugs = 0;
let musicPlaying = false;

/* -------- Gallery -------- */
photos.forEach((p) => {
  const card = document.createElement("div");
  card.className = "photo-card";

  const img = document.createElement("img");
  img.src = p.src;

  const caption = document.createElement("div");
  caption.className = "photo-caption";
  caption.innerText = p.caption;

  card.appendChild(img);
  card.appendChild(caption);

