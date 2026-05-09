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

const memoryNotes = [
  "You are the safest place we know.",
  "Your hugs make hard days feel easy.",
  "You turn normal days into cherished memories.",
  "Everything feels calmer when you are around.",
  "Your love is the rhythm of our home.",
  "Thank you for always showing up with your whole heart."
];

const revealElements = document.querySelectorAll(".reveal");
const photoGrid = document.getElementById("photoGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const memoryBtn = document.getElementById("memoryBtn");
const memoryText = document.getElementById("memoryText");
const memoryCard = document.getElementById("memoryCard");
const sprinkleLoveBtn = document.getElementById("sprinkleLoveBtn");
const hugCounterText = document.getElementById("hugCounterText");

let currentIndex = 0;
let hugsSent = 0;

/* ---------------- Reveal Animation ---------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.17 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ---------------- Gallery Layout ---------------- */
function getCardPattern(index) {
  if (index % 5 === 0) return "wide";
  if (index % 3 === 0) return "tall";
  return "";
}

/* ---------------- Render Gallery ---------------- */
function renderGallery() {
  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `photo-card ${getCardPattern(index)}`.trim();
    button.dataset.index = index;
    button.setAttribute("aria-label", `Open photo ${index + 1}`);

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = `Family photo ${index + 1}`;
    image.loading = "lazy";

    // ✨ NEW: overlay caption
    const caption = document.createElement("div");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;

    button.appendChild(image);
    button.appendChild(caption);
    photoGrid.appendChild(button);
  });
}

/* ---------------- Lightbox ---------------- */
function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = photos[index].src;
  lightboxCaption.textContent = photos[index].caption;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function shiftLightbox(step) {
  currentIndex = (currentIndex + step + photos.length) % photos.length;
  lightboxImg.src = photos[currentIndex].src;
  lightboxCaption.textContent = photos[currentIndex].caption;
}

photoGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".photo-card");
  if (!card) return;
  openLightbox(Number(card.dataset.index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => shiftLightbox(-1));
lightboxNext.addEventListener("click", () => shiftLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") shiftLightbox(1);
  if (e.key === "ArrowLeft") shiftLightbox(-1);
});

/* ---------------- Scroll Top ---------------- */
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("show", window.scrollY > 320);
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------- Tilt Cards ---------------- */
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 4;
    const rotateX = (y / rect.height - 0.5) * -4;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ---------------- Memory Notes ---------------- */
memoryBtn.addEventListener("click", () => {
  const note = memoryNotes[Math.floor(Math.random() * memoryNotes.length)];
  memoryText.textContent = note;

  memoryCard.classList.remove("show");
  void memoryCard.offsetWidth;
  memoryCard.classList.add("show");
});

/* ---------------- ✨ Hug Button Upgrade ---------------- */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 2000);
}

sprinkleLoveBtn.addEventListener("click", () => {
  hugsSent++;
  hugCounterText.textContent = `Hugs sent: ${hugsSent}`;

  for (let i = 0; i < 6; i++) createHeart();
});

/* ---------------- Init ---------------- */
renderGallery();
