'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
document.documentElement.classList.add('has-js');
menuButton.hidden = false;
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '−' : '+';
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
let lastImageTrigger;
document.querySelectorAll('[data-image]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    lastImageTrigger = trigger;
    lightboxImage.src = trigger.dataset.image;
    lightboxImage.alt = trigger.querySelector('img').alt;
    const caption = trigger.closest('figure').querySelector('figcaption');
    lightboxCaption.textContent = caption ? caption.textContent.trim() : lightboxImage.alt;
    lightbox.showModal();
    document.body.classList.add('dialog-open');
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    lightbox.querySelector('.lightbox-close').focus();
  }
});
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    const bounds = lightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
  }
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lightboxImage.removeAttribute('src');
  lastImageTrigger?.focus({ preventScroll: true });
});
const localPreview = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) || location.protocol === 'file:';
if (!localPreview) {
  window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
  window.ym.l = Date.now();
  const counter = document.createElement('script');
  counter.async = true;
  counter.src = 'https://mc.yandex.ru/metrika/tag.js?id=110000988';
  document.head.append(counter);
  window.ym(110000988, 'init', { ssr: true, webvisor: true, clickmap: true, ecommerce: 'dataLayer', referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
}
