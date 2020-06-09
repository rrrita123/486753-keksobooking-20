'use strict';

var PRICE_FROM = 500;
var PRICE_TO = 3000;
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OFFER = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_Y_FROM = 130;
var LOCATION_Y_TO = 630;
var WIDTH_MARK = 50;
var HEIGHT_MARK = 70;

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
var createArr = function () {
  var offers = [];
  var widthMap = document.querySelector('.map').offsetWidth;

  for (var i = 0; i < 8; i++) {
    var locationX = getRandom(0, widthMap);
    var locationY = getRandom(LOCATION_Y_FROM, LOCATION_Y_TO);

    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: 'Заголовок предложения №' + (i + 1),
        address: locationX + ', ' + locationY,
        price: getRandom(PRICE_FROM, PRICE_TO),
        type: TYPE_OFFER[getRandom(0, TYPE_OFFER.length - 1)],
        rooms: getRandom(1, 3),
        guests: getRandom(1, 4),
        checkin: CHECKIN_OFFER[getRandom(0, CHECKIN_OFFER.length - 1)],
        checkout: CHECKOUT_OFFER[getRandom(0, CHECKOUT_OFFER.length - 1)],
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
};

document.querySelector('.map').classList.remove('map--faded');

var offerArr = createArr();
var mark = document.querySelector('#pin').content;

// Создание меток из шаблона, заполнение их данными
var createMarks = function (pin) {
  var cloneMarkElement = mark.cloneNode(true);

  cloneMarkElement.querySelector('button').style = 'left: ' + (pin.location.x - (WIDTH_MARK * 0.5)) + 'px;' + 'top: ' + (pin.location.y - HEIGHT_MARK) + 'px;';
  cloneMarkElement.querySelector('img').src = pin.author.avatar;
  cloneMarkElement.querySelector('img').alt = pin.offer.title;

  return cloneMarkElement;
};

var mapPins = document.querySelector('.map__pins');

// Отрисовка меток на карте с помощью DocumentFragment
var renderMarks = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerArr.length; i++) {
    fragment.appendChild(createMarks(offerArr[i]));
  }

  mapPins.appendChild(fragment);
};

renderMarks();
