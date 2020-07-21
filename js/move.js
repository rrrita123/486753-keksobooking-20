'use strict';

// Модуль перемещения главной метки
window.move = (function () {
  var LOCATION_Y_FROM = 130;
  var LOCATION_Y_TO = 630;

  var pinMainElement = document.querySelector('.map__pin--main');
  var widthMapElement = document.querySelector('.map').offsetWidth;

  pinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var coordsLeftPinX;
    var coordsTopPinY;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      if (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        coordsLeftPinX = pinMainElement.offsetLeft - shift.x;
        coordsTopPinY = pinMainElement.offsetTop - shift.y;

        var coordPin = window.map.getAddressMarkMain(true, coordsLeftPinX, coordsTopPinY);

        if (coordPin.y >= LOCATION_Y_FROM && coordPin.y <= LOCATION_Y_TO) {
          pinMainElement.style.top = coordsTopPinY + 'px';
        }

        if (coordPin.x >= 0 && coordPin.x <= widthMapElement) {
          pinMainElement.style.left = coordsLeftPinX + 'px';
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.getAddressMarkMain(true, coordsLeftPinX, coordsTopPinY);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
