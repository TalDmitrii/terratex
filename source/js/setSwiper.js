'use strict';

(function () {
  var container = document.querySelector('.about-slider__container');

  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = elemTop < window.innerHeight && elemBottom >= container.clientHeight / 2;
    return isVisible;
  }

  if (container !== null) {
    new Swiper(container, {
      direction: 'vertical',
      slidesPerView: 'auto',
      roundLengths: true,
      autoHeight: true,
      touchReleaseOnEdges: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      breakpoints: {
        1024: {
          direction: 'horizontal',
        },
      },
      on: {
        init: function () {
          this.update();
          this.updateAutoHeight();

          var slider = this;
          slider.autoplay.stop();

          $(window).on('scroll', function () {
            if (isScrolledIntoView(container)) {
              slider.autoplay.start();
            } else {
              slider.autoplay.stop();
            }
          });
        },
        slideChange: function () {
          this.update();
          this.updateAutoHeight();
        },
        resize: function () {
          this.update();
          this.updateAutoHeight();
        },
      },
    });
  }
})();
