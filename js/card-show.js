'use strict';

// Модуль управления карточки объявления
window.cardShow = (function () {

  // Отслеживает клик по метке, получает ее индекс
  window.map.mapPinsElement.addEventListener('click', function (evt) {
    var buttonPin;
    if (evt.target.parentElement.classList.contains('map__pin')) {
      buttonPin = evt.target.parentElement;
    } else if (evt.target.classList.contains('map__pin')) {
      buttonPin = evt.target;
    }

    if (buttonPin && buttonPin.getAttribute('data-index')) {
      setPinActiveClass(buttonPin);
      openCard(buttonPin.getAttribute('data-index'));
    }
  });

  // Добавляется метке класс активности
  var setPinActiveClass = function (element) {
    if (element.classList.contains('map__pin--active')) {
      return;
    }

    var PinActiveElement = document.querySelector('.map__pin--active');
    if (PinActiveElement) {
      PinActiveElement.classList.remove('map__pin--active');
    }

    element.classList.add('map__pin--active');
  };

  // Выводит карточку с данными одного предложения
  var openCard = function (dataIndex) {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      if (mapCardElement.getAttribute('data-index') === dataIndex) { // Изменение атрибута data-
        return;
      }

      closeCard(); // Закрытие карточки
    }

    var offerArr = window.backend.getDataResponse();
    document.querySelector('.map__filters-container').before(window.card.createCard(offerArr[dataIndex]));
    mapCardElement = document.querySelector('.map__card');
    mapCardElement.setAttribute('data-index', dataIndex);

    var closeCardElement = document.querySelector('.popup__close');
    closeCardElement.addEventListener('click', onCardClose);
    document.addEventListener('keydown', onCardEscClose);
  };

  // Обработчик закрытия карточки по клику
  var onCardClose = function () {
    closeCard();
  };

  // Обработчик закрытия карточки на ESC
  var onCardEscClose = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  // Закрывает карточку
  var closeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      document.querySelector('.map').removeChild(mapCardElement);

      document.removeEventListener('keydown', onCardEscClose);
    }
  };

  return {
    closeCard: closeCard
  };
})();
