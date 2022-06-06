export const modals = (function () {
  let popup = document.querySelector('.popup');
  let popupClose = document.querySelector('.popup__close');
  let body = document.querySelector('body');

  let sertificates = document.querySelectorAll('.certificate__card');
  popup.style.transform = `scale(0)`;

  const openCertificate = function () {
    popup.style.transform = `scale(1)`;
    popup.classList.add('popup__show');
    body.classList.add('lock');
  };

  sertificates.forEach(elem => {
    elem.addEventListener('click', function (e) {
      e.preventDefault();
      openCertificate();
    });
  });

  popupClose.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.remove('popup__show');
    body.classList.remove('lock');
    setTimeout(function () {
      popup.style.transform = `scale(0)`;
    }, 300);
  });

  window.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup')) {
      popup.classList.remove('popup__show');
      body.classList.remove('lock');
    }
  });

  window.goToSection = function (name) {
    document.querySelector(`.${name}`).scrollIntoView({ behavior: 'smooth' });
  };
})();
