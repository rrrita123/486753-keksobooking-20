'use strict';

window.filter = (function () {
  var housingTypeElement = document.querySelector('#housing-type');
  var pinArray;

  // Фильтрация меток
  var updatePin = function (typeHouseInput) {
    pinArray = window.backend.getDataResponse();
    window.map.removePins();

    if (typeHouseInput !== 'any') {
      pinArray = pinArray.filter(function (it) {
        return it.offer.type === typeHouseInput;
      });
    }
    window.map.renderMarks(pinArray);
  };

  // Обработчик выбора фильтра тип жилья
  var onHousingTypeFilter = function (evt) {
    window.cardShow.closeCard();
    updatePin(evt.target.value);
  };

  housingTypeElement.addEventListener('change', onHousingTypeFilter);

  return {
    getPinArray: function () {
      return pinArray;
    },
    updatePin: updatePin
  };
})();
