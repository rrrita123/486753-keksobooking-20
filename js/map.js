'use strict';

// Модуль управляет карточками объявлений и метками
window.map = (function () {
  var WIDTH_MARK_MAIN = 65;
  var HEIGHT_MARK_MAIN = 65;
  var WIDTH_MARK_FIRST = 65;
  var HEIGHT_MARK_FIRST = 80;
  var LOCATION_Y_FROM = 130;
  var LOCATION_Y_TO = 630;
  var PIN_LIMIT = 5;

  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var inputAddressElement = document.querySelector('#address');
  var xLeftDefaultPin = parseInt(mapPinMainElement.style.left, 10);
  var yTopDefaultPin = parseInt(mapPinMainElement.style.top, 10);
  var widthMapElement = document.querySelector('.map').offsetWidth;

  // Запись в input "Адрес" координат главной метки
  var setAddressMarkMain = function (x, y) {
    if ((x >= 0 && x <= widthMapElement) && (y >= LOCATION_Y_FROM && y <= LOCATION_Y_TO)) {
      inputAddressElement.value = x + ', ' + y;
    }
  };

  // Отрисовка меток на карте с помощью DocumentFragment
  var renderMarks = function (pins) {
    var fragment = document.createDocumentFragment();
    pins = pins.slice(0, PIN_LIMIT); // Выводить на карту не более 5 меток

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].offer) {
        fragment.appendChild(window.pin.createMark(pins[i], i));
      }
    }

    mapPinsElement.appendChild(fragment);

  };

  var selectsMapFilter = document.querySelectorAll('.map__filters select, .map__filters fieldset');

  return {
    // Функция обработчик успешной загрузки
    onSuccess: function (pins) {
      renderMarks(pins);
      window.filter.activateFilter();
      window.form.setStateCollection(selectsMapFilter, false);
    },

    // Удаление меток
    removePins: function () {
      var mapPinsCollectionElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      mapPinsCollectionElements.forEach(function (pins) {
        pins.remove();
      });
    },

    // Получение координат главной метки
    getAddressMarkMain: function (state, x, y) {
      x = x !== undefined ? x : parseInt(mapPinMainElement.style.left, 10);
      y = y !== undefined ? y : parseInt(mapPinMainElement.style.top, 10);

      var markMainX;
      var markMainY;
      if (state === true) {
        markMainX = Math.round(x + (WIDTH_MARK_FIRST * 0.5));
        markMainY = Math.round(y + HEIGHT_MARK_FIRST);
      } else {
        mapPinMainElement.style.left = xLeftDefaultPin + 'px';
        mapPinMainElement.style.top = yTopDefaultPin + 'px';

        markMainX = Math.round(xLeftDefaultPin + (WIDTH_MARK_MAIN * 0.5));
        markMainY = Math.round(yTopDefaultPin + (HEIGHT_MARK_MAIN * 0.5));
      }

      setAddressMarkMain(markMainX, markMainY);

      return {
        x: markMainX,
        y: markMainY
      };
    },

    mapPinsElement: mapPinsElement,
    renderMarks: renderMarks
  };
})();
