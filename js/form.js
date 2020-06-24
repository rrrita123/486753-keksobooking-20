'use strict';

// Модуль работает с формой объявления
window.form = (function () {

  var priceTypeOffer = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var capacityElement = document.querySelector('#capacity');
  var capacityCollectionElements = capacityElement.querySelectorAll('option');
  var roomNumberElement = document.querySelector('#room_number');

  // Функция обработчик сравнивает количество гостей с количеством комнат
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

  var typeRoomElement = document.querySelector('#type');
  var inputPriceElement = document.querySelector('#price');

  // Обработчик определяет минимальную цену за жилье
  var onInputTypeRoomChange = function (evt) {
    var nameType = evt.target.value;
    inputPriceElement.setAttribute('min', priceTypeOffer[nameType]);
    inputPriceElement.setAttribute('placeholder', priceTypeOffer[nameType]);
  };

  typeRoomElement.addEventListener('change', onInputTypeRoomChange);

  var timeElement = document.querySelector('.ad-form__element--time');
  var timeOutElement = document.querySelector('#timeout');
  var timeInElement = document.querySelector('#timein');

  // Обработчик синхронизирует поля «Время заезда» и «Время выезда»
  var onInputTimeInChange = function (evt) {
    var indexTime;
    if (evt.target.getAttribute('id') === 'timein') {
      indexTime = window.data.TIMES_CHECKIN.indexOf(evt.target.value);
      timeOutElement.value = window.data.TIMES_CHECKOUT[indexTime];
    } else {
      indexTime = window.data.TIMES_CHECKOUT.indexOf(evt.target.value);
      timeInElement.value = window.data.TIMES_CHECKIN[indexTime];
    }
  };

  timeElement.addEventListener('change', onInputTimeInChange);

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