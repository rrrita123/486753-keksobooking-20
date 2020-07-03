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
  var xLeftDefaultPin = parseInt(mapPinMainElenemt.style.left, 10);
  var yTopDefaultPin = parseInt(mapPinMainElenemt.style.top, 10);

  // Запись в input "Адрес" координат главной метки
  var setAddressMarkMain = function (x, y) {
    if ((x >= 0 && x <= window.data.widthMapElement) && (y >= window.data.LOCATION_Y_FROM && y <= window.data.LOCATION_Y_TO)) {
      inputAddressElement.value = x + ', ' + y;
    }
  };

  // Отрисовка меток на карте с помощью DocumentFragment
  var renderMarks = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer) {
        fragment.appendChild(window.pin.createMark(pins[i], i));
      }
    }

    mapPinsElement.appendChild(fragment);
  };

  return {

    // Функция обработчик успешной загрузки
    onSuccess: function (pins) {
      renderMarks(pins);
    },

    // Получение координат главной метки
    getAddressMarkMain: function (state, x, y) {
      x = x !== undefined ? x : parseInt(mapPinMainElenemt.style.left, 10);
      y = y !== undefined ? y : parseInt(mapPinMainElenemt.style.top, 10);

      var markMainX;
      var markMainY;
      if (state === true) {
        markMainX = Math.round(x + (WIDTH_MARK_FIRST * 0.5));
        markMainY = Math.round(y + HEIGHT_MARK_FIRST);
      } else {
        mapPinMainElenemt.style.left = xLeftDefaultPin + 'px';
        mapPinMainElenemt.style.top = yTopDefaultPin + 'px';

        markMainX = Math.round(xLeftDefaultPin + (WIDTH_MARK_MAIN * 0.5));
        markMainY = Math.round(yTopDefaultPin + (HEIGHT_MARK_MAIN * 0.5));
      }

      setAddressMarkMain(markMainX, markMainY);

      return {
        x: markMainX,
        y: markMainY
      };
    },

    offerArr: offerArr,
    mapPinsElement: mapPinsElement

  };
})();
