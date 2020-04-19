declare const haCSS: Array<string>;

function analytics() {
  (<any>window).dataLayer = [];

  function gtag(...any: (string | Date)[]) {
    (<any>window).dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'UA-161686512-1');

  const s = document.createElement('script');
  s.src = "https://www.googletagmanager.com/gtag/js?id=UA-161686512-1";
  s.async = true;
  s.defer = true;
}

function asyncCSS() {
  if (!('haCSS' in window)) {
    return
  }

  const head = document.querySelector('head');
  for (const c of haCSS) {
    const l = document.createElement('link');
    l.href = c;
    l.rel = "stylesheet";
    head.appendChild(l);
  }
}

function asyncDataSrc() {
  const elements = document.querySelectorAll<HTMLIFrameElement>("[data-src]");
  for (const e of elements) {
    e.src = e.dataset.src;
  }
}

window.addEventListener('load', () => {
  analytics();
  asyncCSS();
  asyncDataSrc();
})