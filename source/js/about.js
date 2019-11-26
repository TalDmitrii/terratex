'use strict';

(function () {
  var container = document.querySelector('.about-competence__container');
  if (container !== null) {
    var body = document.querySelector('body');
    var wrapper = document.querySelector('#competence');
    var main = body.querySelector('body > main');
    var items = container.querySelectorAll('.about-competence__item');
    var breakpoint = window.matchMedia('(max-width: 1023px)');

    var menuEscPressHandler = function (evt) {
      window.utils.escPressHandler(evt, closeModal);
    };

    var closeModal = function () {
      scrollLock.enablePageScroll(body);
      main.style.position = '';
      main.style.zIndex = '';
      wrapper.style.position = '';
      wrapper.style.zIndex = '';
      Array.prototype.slice.call(items).forEach(function (item) {
        item.classList.remove('about-competence__item--show');
        scrollLock.removeScrollableTarget(item);
      });
      document.removeEventListener('keydown', menuEscPressHandler);
    };

    var clickImgHandler = function (evt) {
      var item = evt.target.closest('.about-competence__item');
      var isImg = evt.target.closest('.about-competence__item-img');
      var isText = evt.target.closest('.about-competence__item > p');
      var isButtonDetails = evt.target.closest('.about-competence__details');
      var isCloseButton = evt.target.closest('.about-competence__button-close');

      if (isButtonDetails) {
        evt.preventDefault();
      }

      if (isImg || isText || isButtonDetails) {
        main.style.position = 'relative';
        main.style.zIndex = '999';
        wrapper.style.position = 'relative';
        wrapper.style.zIndex = '999';
        scrollLock.disablePageScroll(body);
        scrollLock.addScrollableTarget(item);
        item.classList.add('about-competence__item--show');
        document.addEventListener('keydown', menuEscPressHandler);
      }

      if (isCloseButton) {
        closeModal();
      }
    };

    var breakpointChecker = function () {
      if (breakpoint.matches === true) {
        container.addEventListener('click', clickImgHandler);
      } else {
        container.removeEventListener('click', clickImgHandler);
        closeModal();
      }
    };

    window.addEventListener('resize', breakpointChecker);
    breakpointChecker();
  }
})();
