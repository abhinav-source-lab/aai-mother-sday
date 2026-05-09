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

/* Gallery */
photos.forEach((p, i) => {
const card = document.createElement("div");
card.className = "photo-card";

const img = document.createElement("img");
img.src = p.src;

const caption = document.createElement("div");
caption.className = "photo-caption";
caption.innerText = p.caption;

card.appendChild(img);
card.appendChild(caption);

card.onclick = () => {
lightbox.classList.add("open");
lightboxImg.src = p.src;
lightboxCaption.innerText = p.caption;
};

photoGrid.appendChild(card);
});

/* Lightbox */
lightbox.onclick = () => lightbox.classList.remove("open");

/* Music */
musicBtn.onclick = () => {
if (music.paused) {
music.play();
musicBtn.innerText = "Pause Music ⏸";
} else {
music.pause();
musicBtn.innerText = "Play Music 🎵";
}
};

/* Hearts */
function createHeart() {
const h = document.createElement("div");
h.className = "heart";
h.innerText = "💖";
h.style.left = Math.random()*100+"vw";
document.body.appendChild(h);
setTimeout(()=>h.remove(),2000);
}

sprinkleLoveBtn.onclick = () => {
hugs++;
hugCounterText.innerText = `Hugs sent: ${hugs}`;
for(let i=0;i<5;i++) createHeart();
};

