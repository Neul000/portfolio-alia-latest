// Toggle mobile navigation without affecting link behavior
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.querySelector('nav');

mobileMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Billingual Function
document.getElementById("language-toggle").addEventListener("click", function() {
  const currentLang = this.textContent.includes("EN") ? "en" : "my";
  const newLang = currentLang === "en" ? "my" : "en";
  this.textContent = newLang === "en" ? "EN" : "BM";
  
  document.querySelectorAll("[data-en]").forEach(element => {
    element.textContent = element.getAttribute(`data-${newLang}`);
  });
});

// Image Click-to-Expand Modal with Navigation
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let images = document.querySelectorAll(".expandable");
let currentIndex = 0;

// Function to Open Modal & Show Image
function openModal(index) {
  currentIndex = index;
  modal.style.display = "flex";
  modalImg.src = images[currentIndex].src;
}

//Blob Movement
const blob = document.getElementById("wanderingBlob");
const face = document.getElementById("blobFace");

let isDragging = false;
let offsetX, offsetY;

// Random wandering
function wanderBlob() {
  if (isDragging) return;
  const viewportWidth = window.innerWidth;
  const randomLeft = Math.random() * (viewportWidth - 80);
  blob.style.left = `${randomLeft}px`;
  face.textContent = "😌";
}
setInterval(wanderBlob, 4000);

// Dragging
blob.addEventListener("mousedown", (e) => {
  isDragging = true;
  blob.classList.add("dragging");
  face.textContent = "😮";

  const rect = blob.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  blob.style.left = `${e.clientX - offsetX}px`;
  blob.style.bottom = `${window.innerHeight - e.clientY - (blob.offsetHeight - offsetY)}px`;
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    blob.classList.remove("dragging");
    blob.style.animation = "bounce 0.6s ease";
    face.textContent = "😵‍💫";

    setTimeout(() => {
      blob.style.animation = "floaty 3s ease-in-out infinite";
      face.textContent = "😊";
    }, 600);
  }
});

  
//Function mobile swipe gallery
function scrollGallery(direction) {
  const gallery = document.getElementById("leadershipGallery");
  const scrollAmount = 300;
  gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Function to Close Modal
function closeModalFunc() {
  modal.style.display = "none";
}

// Function to Navigate Left
function prevImage() {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  modalImg.src = images[currentIndex].src;
}

// Function to Navigate Right
function nextImage() {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  modalImg.src = images[currentIndex].src;
}

// Add Event Listeners to Each Image
images.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Event Listeners for Close & Navigation
closeModal.addEventListener("click", closeModalFunc);
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Close modal when clicking outside the image
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Keyboard Navigation (Left/Right Arrow & Escape Key)
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeModalFunc();
  }
});