'use strict';

// Модуль управляет карточками объявлений и метками
window.map = (function () {
  var WIDTH_MARK_MAIN = 65;
  var HEIGHT_MARK_MAIN = 65;
  var WIDTH_MARK_FIRST = 65;
  var HEIGHT_MARK_FIRST = 84;

  var mapPinsElement = document.querySelector('.map__pins');
  var offerArr = window.data.createArr(8);
  var mapPinMainElenemt = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');

  return {
    // Отрисовка меток на карте с помощью DocumentFragment
    renderMarks: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offerArr.length; i++) {
        fragment.appendChild(window.pin.createMark(offerArr[i], i));
      }

      mapPinsElement.appendChild(fragment);
    },

    // Получение координат главной метки
    getAddressMarkMain: function (state) {
      var markMainLeft = parseInt(mapPinMainElenemt.style.left, 10);
      var markMainTop = parseInt(mapPinMainElenemt.style.top, 10);
      var markMainX;
      var markMainY;
      if (state === true) {
        markMainX = Math.round(markMainLeft + (WIDTH_MARK_FIRST * 0.5));
        markMainY = Math.round(markMainTop + HEIGHT_MARK_FIRST);
      } else {
        markMainX = Math.round(markMainLeft + (WIDTH_MARK_MAIN * 0.5));
        markMainY = Math.round(markMainTop + (HEIGHT_MARK_MAIN * 0.5));
      }

      inputAddressElement.value = markMainX + ', ' + markMainY;
    },

    offerArr: offerArr,
    mapPinsElement: mapPinsElement

  };
})();
