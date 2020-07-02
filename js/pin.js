'use strict';

window.pin = (function () {
  var WIDTH_MARK = 50;
  var HEIGHT_MARK = 70;

  var markElement = document.querySelector('#pin').content;

  return {
    // Создание метки из шаблона, заполнение данными
    createMark: function (pin, i) {
      var cloneMarkElement = markElement.cloneNode(true);

      cloneMarkElement.querySelector('button').style = 'left: ' + (pin.location.x - (WIDTH_MARK * 0.5)) + 'px;' + 'top: ' + (pin.location.y - HEIGHT_MARK) + 'px;';
      cloneMarkElement.querySelector('img').src = pin.author.avatar;
      cloneMarkElement.querySelector('img').alt = pin.offer.title;
      cloneMarkElement.querySelector('button').setAttribute('data-index', i);

      return cloneMarkElement;
    }
  };
})();
