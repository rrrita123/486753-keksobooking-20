'use strict';

// Модуль управления карточки объявления
window.cardShow = (function () {
  // Отслеживает клик по метке, получает ее индекс
  window.map.mapPinsElement.addEventListener('click', function (evt) {
    if (!(evt.target.parentElement.classList.contains('map__pin--main'))) {
      if (evt.target.parentElement.classList.contains('map__pin') || (evt.target.classList.contains('map__pin'))) {
        var dataIndex = (evt.target.parentElement.getAttribute('data-index')) || (evt.target.getAttribute('data-index'));
        if (document.querySelector('.map__card')) {
          var mapCardElement = document.querySelector('.map__card');
          document.querySelector('.map').removeChild(mapCardElement);
        }
        openCard(dataIndex);
      }
    }
  });

  // Выводит карточку с данными одного предложения
  var openCard = function (dataIndex) {
    document.querySelector('.map__filters-container').before(window.card.createCard(window.map.offerArr[dataIndex]));

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

  // Зактывает карточку
  var closeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    document.querySelector('.map').removeChild(mapCardElement);

    document.removeEventListener('keydown', onCardEscClose);
  };
})();
