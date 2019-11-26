function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
      typeof Symbol === 'function' &&
      obj.constructor === Symbol &&
      obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

(function () {
  var ymapsTouchScroll = function ymapsTouchScroll(map) {
    var _ref =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$preventScroll = _ref.preventScroll,
      preventScroll = _ref$preventScroll === void 0 ? true : _ref$preventScroll,
      _ref$preventTouch = _ref.preventTouch,
      preventTouch = _ref$preventTouch === void 0 ? true : _ref$preventTouch,
      _ref$textScroll = _ref.textScroll,
      textScroll =
        _ref$textScroll === void 0
          ? 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl'
          : _ref$textScroll,
      _ref$textTouch = _ref.textTouch,
      textTouch =
        _ref$textTouch === void 0
          ? 'Чтобы переместить карту проведите по ней двумя пальцами'
          : _ref$textTouch;

    if (
      typeof window === 'undefined' ||
      _typeof(map) !== 'object' ||
      (!preventScroll && !preventTouch) ||
      typeof textScroll !== 'string' ||
      typeof textTouch !== 'string'
    )
      return;
    var isTouch =
      /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
    var eventsPane = map.panes.get('events');
    var eventsPaneEl = eventsPane.getElement();
    var text = isTouch ? textTouch : textScroll;
    var styles = {
      alignItems: 'center',
      boxSizing: 'border-box',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      padding: '40px',
      textAlign: 'center',
      transition: 'background .2s',
      touchAction: 'auto'
    };
    Object.keys(styles).forEach(function (name) {
      eventsPaneEl.style[name] = styles[name];
    });

    var hintToggle = function hintToggle(fl) {
      eventsPaneEl.style.background = 'rgba(0, 0, 0, '.concat(
        fl ? '.6' : '0',
        ')'
      );
      eventsPaneEl.textContent = fl ? text : '';
    };

    if (preventTouch && isTouch) {
      map.behaviors.disable('drag');
      ymaps.domEvent.manager.add(eventsPaneEl, 'touchmove', function (e) {
        hintToggle(e.get('touches').length === 1);
      });
      ymaps.domEvent.manager.add(eventsPaneEl, 'touchend', function () {
        hintToggle(false);
      });
    }

    if (preventScroll && !isTouch) {
      var scrollToggle = function scrollToggle(fl) {
        var behavior = 'scrollZoom';
        fl ? map.behaviors.enable(behavior) : map.behaviors.disable(behavior);
      };

      var isMouseEnter = false;
      var isCtrlPress = false;
      scrollToggle(false);
      eventsPane.events.add('wheel', function () {
        if (!isMouseEnter) return;
        scrollToggle(isCtrlPress);
        hintToggle(!isCtrlPress);
      });
      eventsPane.events.add('mousedown', function () {
        hintToggle(false);
      });
      eventsPane.events.add('mouseenter', function () {
        isMouseEnter = true;
      });
      eventsPane.events.add('mouseleave', function () {
        isMouseEnter = false;
        hintToggle(false);
      });
      document.addEventListener('keydown', function (e) {
        isCtrlPress = e.ctrlKey;
        if (isCtrlPress) hintToggle(false);
      });
      document.addEventListener('keyup', function () {
        isCtrlPress = false;
      });
    }
  };

  window.ymapsTouchScroll = ymapsTouchScroll;
})();
