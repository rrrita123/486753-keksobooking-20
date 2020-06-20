'use strict';

window.util = (function () {
  return {
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },

    // Нажатие левой кнопки мыши
    isLeftButtomMouse: function (evt, action) {
      if (evt.button === 0) {
        action();
      }
    }
  };
})();
