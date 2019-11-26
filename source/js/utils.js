'use strict';

(function () {
  var ESC_KEY = 'Escape';

  window.utils = {
    escPressHandler: function (evt, cb) {
      if (evt.key === ESC_KEY) {
        cb();
      }
    },
  };
})();
