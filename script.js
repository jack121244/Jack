/**
 * birthday-greeting.js
 * Minimal elegant JavaScript script for a birthday greeting animation
 * following the Default Design Guidelines inspiration.
 * 
 * Usage:
 * Include this script on a page with elements:
 * - An element with id="greetingHeadline" for the main greeting text
 * - An element with id="greetingSubtext" for the sub message
 * - A button with id="celebrateBtn" to trigger confetti animation
 * - A container with id="confettiContainer" to hold confetti elements
 */

// Confetti colors aligned with Default Design Guidelines palette
const CONFETTI_COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa'];

class ConfettiPiece {
  constructor(container) {
    this.container = container;
    this.element = document.createElement('div');
    this.element.classList.add('confetti-piece');
    this.size = 8 + Math.random() * 8; // 8-16 px wide confetti
    this.element.style.width = this.size + 'px';
    this.element.style.height = (this.size * 2) + 'px';
    this.element.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.element.style.borderRadius = '2px';
    this.element.style.position = 'absolute';
    this.element.style.opacity = 0.9;
    this.reset();
    this.container.appendChild(this.element);
  }

  reset() {
    this.x = Math.random() * this.container.offsetWidth;
    this.y = -Math.random() * 20 - 20; // Start above viewport
    this.rotation = Math.random() * 360;
    this.speedY = 2 + Math.random() * 3;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.opacity = 1;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    this.element.style.opacity = this.opacity;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.opacity -= 0.01;

    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    this.element.style.opacity = this.opacity;

    if (this.y > this.container.offsetHeight || this.opacity <= 0) {
      this.reset();
    }
  }
}

const birthdayGreeting = (() => {
  let confettiPieces = [];
  let animationFrameId = null;

  function animateConfetti() {
    confettiPieces.forEach(piece => piece.update());
    animationFrameId = requestAnimationFrame(animateConfetti);
  }

  function startConfetti(containerId, pieceCount = 50) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear previous confetti pieces if any
    container.innerHTML = '';
    confettiPieces = [];

    for (let i = 0; i < pieceCount; i++) {
      confettiPieces.push(new ConfettiPiece(container));
    }

    if (!animationFrameId) {
      animateConfetti();
    }
  }

  function stopConfetti() {
    if(animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    confettiPieces.forEach(piece => {
      if(piece.element.parentNode) {
        piece.element.parentNode.removeChild(piece.element);
      }
    });
    confettiPieces = [];
  }

  function init() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const headline = document.getElementById('greetingHeadline');
    const subtext = document.getElementById('greetingSubtext');
    const confettiContainer = document.getElementById('confettiContainer');

    if (!celebrateBtn || !headline || !subtext || !confettiContainer) return;

    // On button click, animate greeting and trigger confetti
    celebrateBtn.addEventListener('click', () => {
      // Animate headline - scale up and down
      headline.style.transition = 'transform 0.4s ease';
      headline.style.transform = 'scale(1.15)';
      setTimeout(() => {
        headline.style.transform = 'scale(1)';
      }, 400);

      // Animate subtext fade in from half opacity to full
      subtext.style.opacity = '0.5';
      subtext.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        subtext.style.opacity = '1';
      }, 100);

      startConfetti('confettiContainer', 60);

      // Stop confetti after 5 seconds
      setTimeout(stopConfetti, 5000);
    });
  }

  return {
    init
  };
})();

// Initialize on DOMContentLoaded for safe access
document.addEventListener('DOMContentLoaded', () => {
  birthdayGreeting.init();
});

/* 
 * Note:
 * For this script to work seamlessly with the recommended minimal elegant UI,
 * ensure your HTML has the following structure:
 *
 * <h1 id="greetingHeadline">Selamat Ulang Tahun!</h1>
 * <p id="greetingSubtext">Semoga harimu penuh kebahagiaan dan kejutan indah.</p>
 * <button id="celebrateBtn">Rayakan 🎉</button>
 * <div id="confettiContainer" style="position: fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; overflow:visible; z-index:9999;"></div>
 *
 * Include minimal CSS for confetti-piece like rounded rectangles with box shadow for subtle depth,
 * and style the button and text according to your design system.
 */