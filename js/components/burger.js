export const burger = (function () {
  let burgerBtn = document.querySelector('.navbar__burger');
  let burgerMenu = document.querySelector('.burger__menu');
  let body = document.querySelector('body');

  burgerBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    body.classList.toggle('lock');
  });
})();
