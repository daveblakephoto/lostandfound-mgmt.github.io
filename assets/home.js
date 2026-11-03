const film = document.querySelector('.film');
const motion = matchMedia('(prefers-reduced-motion: reduce)');

function updateMotion() {
  if (motion.matches) {
    film.pause();
  } else {
    film.play().catch(() => {
      // The poster stays visible when autoplay is unavailable.
    });
  }
}

film.querySelector('source').addEventListener('error', () => {
  film.hidden = true;
});
motion.addEventListener('change', updateMotion);
updateMotion();
