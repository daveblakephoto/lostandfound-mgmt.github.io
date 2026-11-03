const frames = document.querySelector('.frames');
const controls = document.querySelector('.gallery-controls');
const counter = controls.querySelector('output');
const thumbnails = [...document.querySelectorAll('.thumbnails a')];
const count = frames.children.length;

function currentIndex() {
  return Math.min(count - 1, Math.max(0, Math.round(frames.scrollLeft / frames.clientWidth)));
}

function show(index) {
  const target = (index + count) % count;
  frames.scrollTo({ left: frames.clientWidth * target, behavior: 'instant' });
  update();
}

function update() {
  const current = currentIndex();
  const label = String(current + 1).padStart(2, '0') + ' / ' + count;
  if (counter.textContent !== label) counter.textContent = label;
  thumbnails.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

controls.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => show(currentIndex() + Number(button.dataset.step)));
});
thumbnails.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(index);
  });
});
document.querySelector('.gallery').addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  show(currentIndex() + (event.key === 'ArrowLeft' ? -1 : 1));
});
frames.addEventListener('scroll', update, { passive: true });
new ResizeObserver(update).observe(frames);
controls.hidden = false;
update();
