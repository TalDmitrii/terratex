'use strict';

(function () {
  var container = document.querySelector('.page-article__aside');
  if (container !== null) {
    var elements = document.querySelector('.articles-other');
    var footer = document.querySelector('footer.page-footer ');

    var debounceTimerId;
    var debounce = function (cb, interval) {
      clearTimeout(debounceTimerId);
      debounceTimerId = setTimeout(cb, interval);
    };

    var getCoordsTop = function (elem) {
      return elem.getBoundingClientRect().top + pageYOffset;
    };

    var onChange = function () {
      var positionContainer = getCoordsTop(container);
      var positionElement = getCoordsTop(elements);
      var positionFooter = getCoordsTop(footer);

      var breakpointEnd = window.matchMedia('(max-width: 1023px)');
      var isTablet = breakpointEnd.matches === true;

      if (!isTablet) {
        var winScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

        if (winScroll > (positionElement + elements.scrollHeight) && (winScroll + elements.scrollHeight) < positionFooter) {
          elements.style.top = (winScroll - 240) + 'px';
        }
        if ((winScroll + elements.scrollHeight) >= positionFooter) {
          elements.style.top = (positionFooter - elements.scrollHeight - 300) + 'px';
        }

        if (winScroll <= positionElement - window.innerHeight + 10) {
          elements.style.top = (winScroll - 240) + 'px';
        }
        if (winScroll <= positionContainer) {
          elements.style.top = '35px';
        }
      }
    };

    document.addEventListener('DOMContentLoaded', function () {
      onChange();
    });
    window.addEventListener('resize', function () {
      onChange();
    });
    window.addEventListener('scroll', function () {
      debounce(onChange, 200);
    });
  }
})();
