'use strict';

// скролл
(function () {
  var scrollStart = document.querySelector('.scroll-start');
  if (scrollStart !== null) {
    var scrollEnd = document.querySelector('.scroll-end');
    var getTopCoords = function (elem) {
      return elem.getBoundingClientRect().top + pageYOffset;
    };

    var intervalFunction;
    var INTERVAL = 5;
    var STEP = 9;
    var CORRECT_POSITION_SCROLL = 0;

    scrollStart.addEventListener('click', function () {
      var scrollToElement = getTopCoords(scrollEnd);
      var currentPosition = window.pageYOffset;

      /*
     * Делаем асинхронность
      */
      setTimeout(function () {
        intervalFunction = setInterval(function () {
          currentPosition += STEP;
          if (currentPosition > scrollToElement) {
            clearInterval(intervalFunction);
            window.scrollTo(0, (currentPosition - CORRECT_POSITION_SCROLL) + (scrollToElement - currentPosition));
          }

          if (currentPosition < scrollToElement) {
            window.scrollTo(0, currentPosition - CORRECT_POSITION_SCROLL);
          }
        }, INTERVAL);
      }, 0);
    });
  }
})();

(function ($) {
  $('body').on('click', '[href*="#"]', function (evt) {
    var fixedOffset = 0;
    if ($(this.hash).offset() !== undefined) {
      evt.preventDefault();
      $('html,body').stop().animate({
        scrollTop: $(this.hash).offset().top - fixedOffset
      }, 1000);
    }
  });
})(jQuery);
