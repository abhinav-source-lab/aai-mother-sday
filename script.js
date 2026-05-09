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

revealElements.forEach((element) => revealObserver.observe(element));

function getCardPattern(index) {
  if (index % 5 === 0) return "wide";
  if (index % 3 === 0) return "tall";
  return "";
}

function renderGallery() {
  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `photo-card ${getCardPattern(index)}`.trim();
    button.dataset.index = String(index);
    button.dataset.caption = photo.caption;
    button.setAttribute("aria-label", `Open photo ${index + 1}`);

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = `Family photo ${index + 1}`;
    image.loading = "lazy";

    button.appendChild(image);
    photoGrid.appendChild(button);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = photos[index].src;
  lightboxCaption.textContent = photos[index].caption;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function shiftLightbox(step) {
  currentIndex = (currentIndex + step + photos.length) % photos.length;
  lightboxImg.src = photos[currentIndex].src;
  lightboxCaption.textContent = photos[currentIndex].caption;
}

photoGrid.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".photo-card");
  if (!clickedCard) return;
  openLightbox(Number(clickedCard.dataset.index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => shiftLightbox(-1));
lightboxNext.addEventListener("click", () => shiftLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") shiftLightbox(1);
  if (event.key === "ArrowLeft") shiftLightbox(-1);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 320) scrollTopBtn.classList.add("show");
  else scrollTopBtn.classList.remove("show");
});

scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = (x / bounds.width - 0.5) * 4;
    const rotateX = (y / bounds.height - 0.5) * -4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

memoryBtn.addEventListener("click", () => {
  const randomNote = memoryNotes[Math.floor(Math.random() * memoryNotes.length)];
  memoryText.textContent = randomNote;
  memoryCard.classList.remove("show");
  void memoryCard.offsetWidth;
  memoryCard.classList.add("show");
});

sprinkleLoveBtn.addEventListener("click", () => {
  hugsSent += 1;
  hugCounterText.textContent = `Hugs sent: ${hugsSent}`;
  sprinkleLoveBtn.style.filter = "brightness(1.05)";
  setTimeout(() => {
    sprinkleLoveBtn.style.filter = "";
  }, 180);
});

renderGallery();
