document.addEventListener('DOMContentLoaded', () => {
    const blowBtn = document.getElementById('blow-btn');
    const cakeWrapper = document.querySelector('.cake-wrapper');
    const blowSfx = document.getElementById('blow-sfx');
    const hiddenElements = document.querySelectorAll('.hidden-content');
    
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    let isMusicPlaying = false;
  
    if (bgMusic) bgMusic.volume = 0.2;
    if (blowSfx) blowSfx.volume = 0.5; 


    // --- Blow Button Click Event ---
    if (blowBtn) {
        blowBtn.addEventListener('click', () => {

          if (bgMusic && !isMusicPlaying) {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicIcon.textContent = '🎶';
                isMusicPlaying = true;
            }).catch(err => console.log('Autoplay prevented:', err));
        }
            // 1. Play candle blow sound effect
            if (blowSfx) {
                blowSfx.currentTime = 0;
                blowSfx.play().catch(e => console.log('Audio playback prevented:', e));
            }

            // 2. Add candles-blown class to swap images & trigger bopping animation
            if (cakeWrapper) {
                cakeWrapper.classList.add('candles-blown');
            }

            // 3. Reveal hidden content (main video + note & gallery)
            hiddenElements.forEach(el => {
                el.classList.add('reveal');
            });

            // 4. Trigger celebration confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                setTimeout(() => {
                    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
                    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
                }, 250);
            }

            // 5. Update button text & disable it
            blowBtn.textContent = 'MAKE A WISH! 💖';
            blowBtn.style.opacity = '0.5'; // lowered opacity slightly more for a clearer disabled look
            blowBtn.style.cursor = 'default';
            blowBtn.style.pointerEvents = 'none'; // prevents all hover and touch/click interactions
            blowBtn.disabled = true;
        });
    }

    // --- Background Music Toggle ---
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicIcon.textContent = '🎵';
                isMusicPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicIcon.textContent = '🎶';
                    isMusicPlaying = true;
                }).catch(err => console.log('Playback error:', err));
            }
        });
    }

    // --- Tap to Flip Cards (Mobile Support) ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent flipping if interacting with video controls directly
            if (e.target.tagName === 'VIDEO' || e.target.tagName === 'SOURCE') return;
            card.classList.toggle('flipped');
        });
    });
});