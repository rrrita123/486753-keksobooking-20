'use strict';

// Модуль управляет карточками объявлений и метками
window.map = (function () {
  var WIDTH_MARK_MAIN = 65;
  var HEIGHT_MARK_MAIN = 65;
  var WIDTH_MARK_FIRST = 65;
  var HEIGHT_MARK_FIRST = 80;

  var mapPinsElement = document.querySelector('.map__pins');
  var offerArr = window.data.createArr(8);
  var mapPinMainElenemt = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');

  return {

    // // Отрисовка меток на карте с помощью DocumentFragment
    // onSuccess: function (pin) {
    //   console.log(pin);
    //   var fragment = document.createDocumentFragment();

    //   for (var i = 0; i < pin.length; i++) {
    //     fragment.appendChild(window.pin.createMark(pin[i], i));
    //   }

    //   mapPinsElement.appendChild(fragment);
    // },

    // Отрисовка меток на карте с помощью DocumentFragment
    renderMarks: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offerArr.length; i++) {
        fragment.appendChild(window.pin.createMark(offerArr[i], i));
      }

      mapPinsElement.appendChild(fragment);
    },

    // Получение координат главной метки
    getAddressMarkMain: function (state, x, y) {
      x = (x !== undefined) ? x : parseInt(mapPinMainElenemt.style.left, 10);
      y = (y !== undefined) ? y : parseInt(mapPinMainElenemt.style.top, 10);

      var markMainLeft = mapPinMainElenemt.offsetLeft;
      var markMainTop = mapPinMainElenemt.offsetTop;
      var markMainX;
      var markMainY;
      if (state === true) {
        markMainX = Math.round(x + (WIDTH_MARK_FIRST * 0.5));
        markMainY = Math.round(y + HEIGHT_MARK_FIRST);
      } else {
        markMainX = Math.round(markMainLeft + (WIDTH_MARK_MAIN * 0.5));
        markMainY = Math.round(markMainTop + (HEIGHT_MARK_MAIN * 0.5));
      }

      inputAddressElement.value = markMainX + ', ' + markMainY;

      return {
        x: markMainX,
        y: markMainY
      };
    },

    offerArr: offerArr,
    mapPinsElement: mapPinsElement

  };
})();
