'use strict';

// Модуль, который создаёт данные
window.data = (function () {
  var PRICE_FROM = 500;
  var PRICE_TO = 3000;
  var TYPES_OFFER = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES_CHECKIN = ['12:00', '13:00', '14:00'];
  var TIMES_CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_OFFER = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_Y_FROM = 130;
  var LOCATION_Y_TO = 630;

  // Получение случайного целого числа в заданном интервале, максимум и минимум включаются
  var getRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создание массива случайной длинны
  var createArrRandom = function (array) {
    var featuresArr = [];
    var featuresLength = getRandom(1, array.length);

    for (var i = 0; i < featuresLength; i++) {
      featuresArr.push(array[i] + '');
    }

    return featuresArr;
  };

  // Создание массива из объектов
  return {
    createArr: function (countObject) {
      var offers = [];
      var widthMapElement = document.querySelector('.map').offsetWidth;

      for (var i = 0; i < countObject; i++) {
        var locationX = getRandom(0, widthMapElement);
        var locationY = getRandom(LOCATION_Y_FROM, LOCATION_Y_TO);

        offers[i] = {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png',
          },

          offer: {
            title: 'Заголовок предложения №' + (i + 1),
            address: locationX + ', ' + locationY,
            price: getRandom(PRICE_FROM, PRICE_TO),
            type: TYPES_OFFER[getRandom(0, TYPES_OFFER.length - 1)],
            rooms: getRandom(1, 3),
            guests: getRandom(1, 4),
            checkin: TIMES_CHECKIN[getRandom(0, TIMES_CHECKIN.length - 1)],
            checkout: TIMES_CHECKOUT[getRandom(0, TIMES_CHECKOUT.length - 1)],
            features: createArrRandom(FEATURES_OFFER),
            description: 'Описание №' + (i + 1),
            photos: createArrRandom(PHOTOS_OFFER),
          },

          location: {
            x: locationX,
            y: locationY,
          }
        };
      }

      return offers;
    },

    TYPES_OFFER: TYPES_OFFER,
    FEATURES_OFFER: FEATURES_OFFER,
    TIMES_CHECKIN: TIMES_CHECKIN,
    TIMES_CHECKOUT: TIMES_CHECKOUT
  };

})();
