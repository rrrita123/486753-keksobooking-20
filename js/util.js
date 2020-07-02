'use strict';

window.util = (function () {
  return {
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
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
