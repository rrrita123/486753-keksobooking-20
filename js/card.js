'use strict';

// Модуль, который создает карточки объявлений
window.card = (function () {
  var TYPES_VALUES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var mapCardElement = document.querySelector('#card').content;

  return {
    createCard: function (map) {
      var cloneCardElement = mapCardElement.cloneNode(true);

      cloneCardElement.querySelector('.popup__title').textContent = map.offer.title;
      cloneCardElement.querySelector('.popup__text--address').textContent = map.offer.address;
      cloneCardElement.querySelector('.popup__text--price').textContent = map.offer.price + '₽/ночь';
      cloneCardElement.querySelector('.popup__type').textContent = TYPES_VALUES[window.data.TYPES_OFFER.indexOf(map.offer.type)];
      cloneCardElement.querySelector('.popup__text--capacity').textContent = map.offer.rooms + ' комнаты для ' + map.offer.guests + ' гостей';
      cloneCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;

      for (var i = 0; i < window.data.FEATURES_OFFER.length; i++) {
        if (window.data.FEATURES_OFFER[i].indexOf(map.offer.features[i]) < 0) {
          cloneCardElement.querySelector('.popup__feature--' + window.data.FEATURES_OFFER[i]).classList.add('hidden');
        }
      }

      cloneCardElement.querySelector('.popup__description').textContent = map.offer.description;

      var popupPhotoElement = cloneCardElement.querySelector('.popup__photos');

      for (i = 0; i < map.offer.photos.length; i++) {
        if (i > 0) {
          var photoClone = cloneCardElement.querySelector('.popup__photo').cloneNode();
          photoClone.src = map.offer.photos[i];
          popupPhotoElement.appendChild(photoClone);
        } else {
          popupPhotoElement.querySelector('.popup__photo').src = map.offer.photos[i];
        }
      }

      cloneCardElement.querySelector('.popup__avatar').src = map.author.avatar;

      return cloneCardElement;
    }
  };
})();
