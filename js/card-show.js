'use strict';

// Модуль управления карточки объявления
window.cardShow = (function () {

  // Отслеживает клик по метке, получает ее индекс
  window.map.mapPinsElement.addEventListener('click', function (evt) {
    if (evt.target.parentElement.classList.contains('map__pin--main')) {
      return;
    }

    if (evt.target.parentElement.classList.contains('map__pin') || (evt.target.classList.contains('map__pin'))) {
      var dataIndexPin;
      if (evt.target.getAttribute('data-index')) {
        setPinActiveClass(evt.target);
        dataIndexPin = evt.target.getAttribute('data-index');
      } else {
        setPinActiveClass(evt.target.parentElement);
        dataIndexPin = evt.target.parentElement.getAttribute('data-index');
      }
      if (dataIndexPin) {
        openCard(dataIndexPin);
      }
    }
  });

  // Добавляется метке класс активности
  var setPinActiveClass = function (element) {
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
