'use strict';

// Модуль работает с формой объявления
window.form = (function () {
  // Функция обработчик сравнивает количество гостей с количеством комнат
  var capacityElement = document.querySelector('#capacity');
  var capacityCollectionElements = capacityElement.querySelectorAll('option');
  var roomNumberElement = document.querySelector('#room_number');

  var onInputRoomChange = function () {
    var numberSeats;
    for (var i = 0; i < capacityCollectionElements.length; i++) {
      numberSeats = capacityCollectionElements[i].value;
      if (roomNumberElement.value === '100' && numberSeats === '0') {
        capacityCollectionElements[i].classList.remove('hidden');
        capacityElement.value = numberSeats;
      } else if (roomNumberElement.value !== '100' && numberSeats <= roomNumberElement.value && numberSeats !== '0') {
        capacityCollectionElements[i].classList.remove('hidden');
        capacityElement.value = numberSeats;
      } else {
        capacityCollectionElements[i].classList.add('hidden');
      }
    }
  };

  roomNumberElement.addEventListener('change', onInputRoomChange);

  return {
    onInputRoomChange: onInputRoomChange,

    // Блокирует или разблокирует элементы формы
    setStateCollection: function (collection, state) {
      for (var i = 0; i < collection.length; i++) {
        if (state === true) {
          collection[i].setAttribute('disabled', state);
        } else {
          collection[i].removeAttribute('disabled');
        }
      }
    }
  };
})();
