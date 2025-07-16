// Select elements
const giftSection = document.getElementById("giftSection");
const namePrompt = document.getElementById("namePrompt");
const storySection = document.getElementById("storySection");
const nameInput = document.getElementById("nameInput");
const wishText = document.getElementById("wishText");
const msgBox = document.getElementById("msgBox");
const msgText = document.getElementById("msgText");
const catGif = document.getElementById("catGif");
const choiceBox = document.getElementById("choiceBox");
const carouselSection = document.getElementById("carouselSection");
const carousel = document.getElementById("carousel");

// Load animated gift box video
const giftBoxVideo = document.createElement("video");
giftBoxVideo.src = "https://cdn-icons-mp4.flaticon.com/512/14113/14113013.mp4";
giftBoxVideo.autoplay = true;
giftBoxVideo.loop = true;
giftBoxVideo.muted = true;
giftBoxVideo.className = "gift-box-video";
document.getElementById("giftBoxContainer").appendChild(giftBoxVideo);

// Cat GIFs and story messages
let catImages = ["img/cat1.gif", "img/cat2.gif", "img/cat3.gif"];
let messages = [
  "Happy Birthday Gorgeous😘! Today is all about celebrating",
  "Tap here for your Birthday Surprise 🎂🥳💐🎉❤️",
  "You are the Prettiest 😍 girl I have ever seen",
  "Let's grow old together, hand in hand🤝🏻, heart to heart💞",
  "Do you know what makes today extra special😍?",
  "It's your birthday🎂!",
  "I wish you laughter, love❤️, and unforgettable moments 😊",
  "You deserve every happiness. Enjoy every moment😊!"
];

let currentCat = 0;
let index = 0;
let typing = null;

// Show name prompt
function showNamePrompt() {
  giftSection.classList.add("hidden");
  namePrompt.classList.remove("hidden");
  nameInput.focus();
}

// Handle name input
function handleNameEnter() {
  const name = nameInput.value.trim();
  if (name) {
    namePrompt.classList.add("hidden");
    showMessages(name);
  }
}

// Show story messages with typing effect
function showMessages(name) {
  storySection.classList.remove("hidden");
  wishText.textContent = `Happy Birthday, ${name}!`;
  index = 0;
  nextMessage();
}

// Simulate typing
function typeMessage(message, callback) {
  let i = 0;
  msgText.textContent = "";
  if (typing) clearInterval(typing);
  typing = setInterval(() => {
    msgText.textContent += message.charAt(i);
    i++;
    if (i >= message.length) {
      clearInterval(typing);
      typing = null;
      if (callback) callback();
    }
  }, 50);
}

// Show next message
function nextMessage() {
  if (typing) return;
  if (index >= messages.length) {
    storySection.classList.add("hidden");
    choiceBox.classList.remove("hidden");
    return;
  }
  catGif.src = catImages[currentCat];
  currentCat = (currentCat + 1) % catImages.length;
  typeMessage(messages[index]);
  index++;
}

// Start the 3D carousel and music
function startCarousel() {
  choiceBox.classList.add("hidden");
  carouselSection.classList.remove("hidden");

  // ✅ Play background music
  const music = document.getElementById("bgMusic");
  if (music) {
    music.play().catch(() => {
      console.warn("Autoplay blocked. User interaction required.");
    });
  }

  // Create carousel images
  const imagePaths = [
    "img/p1.jpeg", "img/p2.jpeg", "img/p3.jpeg", "img/p4.jpeg", "img/p5.jpeg",
    "img/p6.jpeg", "img/p7.jpeg", "img/p8.jpeg", "img/p9.jpeg", "img/p10.jpeg"
  ];

  const angle = 360 / imagePaths.length;
  const radius = 380; // Adjust for circle size

  carousel.innerHTML = "";

  imagePaths.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    const rotation = angle * i;
    img.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
    carousel.appendChild(img);
  });
}
