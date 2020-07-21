'use strict';

// Модуль работает с формой объявления
window.form = (function () {
  var TIMES_CHECKIN = ['12:00', '13:00', '14:00'];
  var TIMES_CHECKOUT = ['12:00', '13:00', '14:00'];

  var PriceTypeOffer = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
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

  // Функция устанавливает в input "цена" атрибуты min цены за жилье и соответствующий placeholder
  var setTypeRoomValue = function (indexName) {
    var inputPriceElement = document.querySelector('#price');
    inputPriceElement.setAttribute('min', PriceTypeOffer[indexName.toUpperCase()]);
    inputPriceElement.setAttribute('placeholder', PriceTypeOffer[indexName.toUpperCase()]);
  };

  // Обработчик определяет минимальную цену за жилье
  var onInputTypeRoomChange = function (evt) {
    var nameType = evt.target.value;
    setTypeRoomValue(nameType);
  };

  typeRoomElement.addEventListener('change', onInputTypeRoomChange);

  var timeElement = document.querySelector('.ad-form__element--time');
  var timeOutElement = document.querySelector('#timeout');
  var timeInElement = document.querySelector('#timein');

  // Обработчик синхронизирует поля «Время заезда» и «Время выезда»
  var onInputTimeInChange = function (evt) {
    var indexTime;
    if (evt.target.getAttribute('id') === 'timein') {
      indexTime = TIMES_CHECKIN.indexOf(evt.target.value);
      timeOutElement.value = TIMES_CHECKOUT[indexTime];
    } else {
      indexTime = TIMES_CHECKOUT.indexOf(evt.target.value);
      timeInElement.value = TIMES_CHECKIN[indexTime];
    }
  };

  timeElement.addEventListener('change', onInputTimeInChange);

  // Очистка полей формы, все заполненные поля возвращаются в изначальное состояние, в том числе фильтры
  var formsReset = function () {
    var formsElements = document.querySelectorAll('form');
    formsElements.forEach(function (form) {
      form.reset();
    });
  };

  var buttonResetElement = document.querySelector('.ad-form__reset');

  // Обработичик очистки формы по клику на кнопку "очистить"
  var onformReset = function () {
    window.main.setRepeatInactiveState();
  };

  buttonResetElement.addEventListener('click', onformReset);

  return {
    onInputRoomChange: onInputRoomChange,
    setTypeRoomValue: setTypeRoomValue,
    formsReset: formsReset,

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
