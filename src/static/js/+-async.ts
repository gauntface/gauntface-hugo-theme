window.addEventListener('load', () => {
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
})