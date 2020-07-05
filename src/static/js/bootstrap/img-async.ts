import {OnLoad} from '../utils/_onload';

function onLoad(i: HTMLElement) {
  i.classList.add('is-loaded');
}

function setupImg(i: HTMLImageElement) {
  i.addEventListener('load', () => onLoad(i));
  if (i.complete) {
    onLoad(i);
  }
}

OnLoad(function() {
  const imgs = document.querySelectorAll('img');
  console.log('Images: ', imgs);
  for (const i of imgs) {
    setupImg(i);
  }
})