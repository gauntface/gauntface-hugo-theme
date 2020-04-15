declare const haCSS: Array<string>;

window.addEventListener('load', () => {
  if (!haCSS) {
    return
  }

  const head = document.querySelector('head');
  for (const c of haCSS) {
    const l = document.createElement('link');
    l.href = c;
    l.rel = "stylesheet";
    head.appendChild(l);
  }
});