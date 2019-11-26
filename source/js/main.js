'use strict';

(function () {
  function Parallax(options) {
    options = options || {};
    this.nameSpaces = {
      wrapper: options.wrapper || '.main__parallax-container',
      layers: options.layers || '.main__header-parallax',
      deep: options.deep || 'data-parallax-deep'
    };
    this.init = function () {
      var self = this,
        parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
      for (var i = 0; i < parallaxWrappers.length; i++) {
        (function (i) {
          parallaxWrappers[i].addEventListener('mousemove', function (e) {
            var x = e.clientX,
              y = e.clientY,
              layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
            for (var j = 0; j < layers.length; j++) {
              (function (j) {
                var deep = layers[j].getAttribute(self.nameSpaces.deep),
                  disallow = layers[j].getAttribute('data-parallax-disallow'),
                  itemX = (disallow && disallow === 'x') ? 0 : x / deep,
                  itemY = (disallow && disallow === 'y') ? 0 : y / deep;
                if (disallow && disallow === 'both') return;
                layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
              })(j);
            }
          });
        })(i);
      }
    };
    this.init();
    return this;
  }

  window.addEventListener('load', function () {
    new Parallax();
  });
})();


// main-news__item  блок с видео
(function () {
  var containers = document.querySelectorAll('.main-news__item--video');
  if (containers.length > 0) {
    var body = document.querySelector('body');
    var modal = body.querySelector('.modal');
    var modalContent = modal.querySelector('.modal__content--player');

    var createElement = function (template) {
      var newElement = document.createElement('div');
      newElement.innerHTML = template.trim();
      return newElement.firstChild;
    };

    var getTempElement = function (id) {
      return '' +
        '<div class="modal__player">' +
        '<iframe type="text/html"' +
        ' src="http://www.youtube.com/embed/' + id +
        '?autoplay=1' +
        '&controls=3' +
        '&modestbranding=1' +
        '&rel=0' +
        '&showinfo=0"' +
        ' frameborder="0"' +
        ' allowfullscreen/>' +
        '</div>';
    };

    Array.prototype.slice.call(containers).forEach(function (item) {

      var menuEscPressHandler = function (evt) {
        window.utils.escPressHandler(evt, onCloseModal);
      };

      var player = null;
      var onCloseModal = function (evt) {
        if (evt === undefined || evt.target.closest('.modal__player') === null) {
          player.remove();
          modal.classList.remove('modal--show');
          modal.removeEventListener('click', onCloseModal);
          document.removeEventListener('keydown', menuEscPressHandler);
          scrollLock.enablePageScroll(body);
          scrollLock.removeScrollableTarget(item);
        }
      };

      item.addEventListener('click', function (evt) {
        evt.preventDefault();
        var itemLink = evt.target.closest('a[data-video-id]');
        if (itemLink) {
          var videoId = itemLink.dataset.videoId;
          player = createElement(getTempElement(videoId));
          modalContent.appendChild(player);
          modal.classList.add('modal--show');
          modal.addEventListener('click', onCloseModal);
          document.addEventListener('keydown', menuEscPressHandler);
          scrollLock.disablePageScroll(body);
          scrollLock.addScrollableTarget(item);
        }
      });
    });
  }
})();
