'use strict';

(function () {
  var menuContainer = document.querySelector('.page-header__inner');
  if (menuContainer !== null) {
    var body = document.querySelector('body');
    var menuBtn = menuContainer.querySelector('.page-header__menu-btn');
    var menu = menuContainer.querySelector('.menu');
    var menuInner = menuContainer.querySelector('.menu__inner');
    var breakpoint = window.matchMedia('(max-width: 1023px)');
    var menuItems = menu.querySelectorAll('.menu__item');


    var menuEscPressHandler = function (evt) {
      window.utils.escPressHandler(evt, closeModal);
    };

    var clickMenuHandler = function (condition) {
      if (condition === true) {
        for (var i = 0; i < menuItems.length; i++) {
          menuItems[i].addEventListener('click', closeModal);
        }
      } else {
        for (var i = 0; i < menuItems.length; i++) {
          menuItems[i].removeEventListener('click', closeModal);
        }
      }
    };

    var closeModal = function () {
        scrollLock.enablePageScroll(body);
        scrollLock.removeScrollableTarget(menuInner);
        menu.classList.add('menu--close');
        document.removeEventListener('keydown', menuEscPressHandler);
        setTimeout(function () {
          menuContainer.classList.remove('page-header__inner--open');
          menu.classList.remove('menu--open');
          menu.classList.remove('menu--close');
        }, 300);
    };

    var clickButtonHandler = function () {
      if (!menu.classList.contains('menu--open')) {
        scrollLock.disablePageScroll(body);
        scrollLock.addScrollableTarget(menuInner);
        menu.classList.remove('menu--close');
        menu.classList.add('menu--open');
        menuContainer.classList.add('page-header__inner--open');
        document.addEventListener('keydown', menuEscPressHandler);
        window.addEventListener('resize', breakpointChecker);
        clickMenuHandler(true);
        return;
      }
      clickMenuHandler(false);
      closeModal();
    };
    menuBtn.addEventListener('click', clickButtonHandler);

    var breakpointChecker = function () {
      if (breakpoint.matches !== true) {
        scrollLock.enablePageScroll(body);
        scrollLock.removeScrollableTarget(menu);
        body.classList.remove('no-scroll');
        menu.classList.remove('menu--open');
        menu.classList.remove('menu--close');
        menuContainer.classList.remove('page-header__inner--open');
        document.removeEventListener('keydown', menuEscPressHandler);
      }
    };
  }
})();
