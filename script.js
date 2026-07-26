function blowCandles() {
  const cakeWrapper = document.querySelector('.cake-wrapper');
  const button = document.getElementById('blow-btn');
  const blowSfx = document.getElementById('blow-sfx');

  // 1. Play the blowing sound effect
  if (blowSfx) {
    blowSfx.currentTime = 0; // Rewinds to start if clicked rapidly
    blowSfx.play().catch(error => {
      console.log("Audio playback error:", error);
    });
  }

  // 2. Trigger the CSS fade animation
  if (cakeWrapper) {
    cakeWrapper.classList.add('candles-blown');
  }

  // 3. Update the button state
  if (button) {
    button.textContent = 'Blown out! ✨';
    button.style.opacity = '0.6';
    button.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Existing Blow button code...
  const blowBtn = document.getElementById('blow-btn');
  if (blowBtn) {
    blowBtn.addEventListener('click', blowCandles);
  }

  // --- FLIP CARD EVENT LISTENER ---
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(card => {
    card.addEventListener('click', (event) => {
      // Don't flip if user is clicking video play/pause controls
      if (event.target.tagName === 'VIDEO') return;

      card.classList.toggle('flipped');
    });
  });
});

card.addEventListener('click', (event) => {
  // If clicking on video or its controls, do NOT flip the card
  if (event.target.tagName === 'VIDEO') return;

  card.classList.toggle('flipped');
});