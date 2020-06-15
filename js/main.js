'use strict';

var PRICE_FROM = 500;
var PRICE_TO = 3000;
var TYPES_OFFER = ['palace', 'flat', 'house', 'bungalo'];
// var TYPES_VALUES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIMES_CHECKIN = ['12:00', '13:00', '14:00'];
var TIMES_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OFFER = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_Y_FROM = 130;
var LOCATION_Y_TO = 630;
var WIDTH_MARK = 50;
var HEIGHT_MARK = 70;
var WIDTH_MARK_MAIN = 65;
var HEIGHT_MARK_MAIN = 65;
var WIDTH_MARK_FIRST = 65;
var HEIGHT_MARK_FIRST = 84;

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
var createArr = function (countObject) {
  var offers = [];
  var widthMap = document.querySelector('.map').offsetWidth;

  for (var i = 0; i < countObject; i++) {
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
};

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
var offerArr = createArr(8);

// Отрисовка меток на карте с помощью DocumentFragment
var renderMarks = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerArr.length; i++) {
    fragment.appendChild(createMarks(offerArr[i]));
  }

  mapPins.appendChild(fragment);
};

var mapPinActive = document.querySelector('.map__pin--main');


// Полуение координат главной метки
var getAddressMarkMain = function (state) {
  var inputAddress = document.querySelector('#address');
  var markMainLeft = parseInt(mapPinActive.style.left, 10);
  var markMainTop = parseInt(mapPinActive.style.top, 10);
  if (state === true) {
    var markMainX = Math.round(markMainLeft + (WIDTH_MARK_FIRST * 0.5));
    var markMainY = Math.round(markMainTop + HEIGHT_MARK_FIRST);
  } else {
    markMainX = Math.round(markMainLeft + (WIDTH_MARK_MAIN * 0.5));
    markMainY = Math.round(markMainTop + (HEIGHT_MARK_MAIN * 0.5));
  }

  inputAddress.value = markMainX + ', ' + markMainY;
};

// Устанавливает или удаляет disabled элементам в коллекции
var setStateCollection = function (collection, state) {
  for (var i = 0; i < collection.length; i++) {
    if (state === true) {
      collection[i].setAttribute('disabled', state);
    } else {
      collection[i].removeAttribute('disabled');
    }
  }
};

// Устанавливает неактивное состояние страницы
var fieldsetsAdForm = document.querySelectorAll('.ad-form fieldset');
var selectsMapFilter = document.querySelectorAll('.map__filters select, .map__filters fieldset');

var setInactiveState = function () {
  setStateCollection(fieldsetsAdForm, true);
  setStateCollection(selectsMapFilter, true);

  getAddressMarkMain(false);
};

// setInactiveState(); //!!!!!!!!!!!!!!!!!!


// Обработчик клика левой кнопки мыши
var onMouseClick = function (evt) {
  if (evt.button === 0) {
    setActiveState();
    // getAddressMarkMain(true);
    mapPinActive.removeEventListener('mousedown', onMouseClick);
  }
};

mapPinActive.addEventListener('mousedown', onMouseClick);

// Обработчик активации страницы по нажанию на метку с клавиатуры
var onPinEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    setActiveState();
    // getAddressMarkMain(true);
  }
  mapPinActive.removeEventListener('keydown', onPinEnterPress);
};

mapPinActive.addEventListener('keydown', onPinEnterPress);

// Устанавливает активное состояние страницы
var setActiveState = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  setStateCollection(selectsMapFilter, false);
  setStateCollection(fieldsetsAdForm, false);
  getAddressMarkMain(true);

  renderMarks();
};


//  Обработчик соответствия количества гостей (спальных мест) с количеством комнат
var onInputRoomChange = function () {
  var capacityElement = document.querySelector('#capacity');

  if (roomNumberElement.value === '1') {
    capacityElement.querySelector('option[value="1"]').classList.remove('hidden');

    capacityElement.querySelector('option[value="0"]').classList.add('hidden');
    capacityElement.querySelector('option[value="2"]').classList.add('hidden');
    capacityElement.querySelector('option[value="3"]').classList.add('hidden');

    capacityElement.value = 1;
  } else if ((roomNumberElement.value === '2')) {

    capacityElement.querySelector('option[value="3"]').classList.add('hidden');
    capacityElement.querySelector('option[value="0"]').classList.add('hidden');

    capacityElement.querySelector('option[value="1"]').classList.remove('hidden');
    capacityElement.querySelector('option[value="2"]').classList.remove('hidden');

    capacityElement.value = 2;
  } else if ((roomNumberElement.value === '3')) {

    capacityElement.querySelector('option[value="0"]').classList.add('hidden');

    capacityElement.querySelector('option[value="1"]').classList.remove('hidden');
    capacityElement.querySelector('option[value="2"]').classList.remove('hidden');
    capacityElement.querySelector('option[value="3"]').classList.remove('hidden');

    capacityElement.value = 3;
  } else if ((roomNumberElement.value === '100')) {

    capacityElement.querySelector('option[value="1"]').classList.add('hidden');
    capacityElement.querySelector('option[value="2"]').classList.add('hidden');
    capacityElement.querySelector('option[value="3"]').classList.add('hidden');

    capacityElement.querySelector('option[value="0"]').classList.remove('hidden');

    capacityElement.value = 0;
  }


  console.log(roomNumberElement.value);
};



var roomNumberElement = document.querySelector('#room_number');
roomNumberElement.addEventListener('change', onInputRoomChange);

setActiveState(); // DEL!!!
onInputRoomChange();





// -----------------------------------------------------------------------------------------------------------

// // Модальное окно с информацией об объявлении, заполнение данными
// var mapCard = document.querySelector('#card').content;

// var createCard = function (map) {
//   var cloneCardElement = mapCard.cloneNode(true);

//   cloneCardElement.querySelector('.popup__title').textContent = map.offer.title;
//   cloneCardElement.querySelector('.popup__text--address').textContent = map.offer.address;
//   cloneCardElement.querySelector('.popup__text--price').textContent = map.offer.price + '₽/ночь';
//   cloneCardElement.querySelector('.popup__type').textContent = TYPES_VALUES[TYPES_OFFER.indexOf(map.offer.type)];
//   cloneCardElement.querySelector('.popup__text--capacity').textContent = map.offer.rooms + ' комнаты для ' + map.offer.guests + ' гостей';
//   cloneCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;

//   for (var i = 0; i < FEATURES_OFFER.length; i++) {
//     if (FEATURES_OFFER[i].indexOf(map.offer.features[i]) < 0) {
//       cloneCardElement.querySelector('.popup__feature--' + FEATURES_OFFER[i]).classList.add('hidden');
//     }
//   }

//   cloneCardElement.querySelector('.popup__description').textContent = map.offer.description;

//   var popupPhoto = cloneCardElement.querySelector('.popup__photos');

//   for (i = 0; i < map.offer.photos.length; i++) {
//     if (i > 0) {
//       var photoClone = cloneCardElement.querySelector('.popup__photo').cloneNode();
//       photoClone.src = map.offer.photos[i];
//       popupPhoto.appendChild(photoClone);
//     } else {
//       popupPhoto.querySelector('.popup__photo').src = map.offer.photos[i];
//     }
//   }

//   cloneCardElement.querySelector('.popup__avatar').src = map.author.avatar;

//   return cloneCardElement;
// };

// document.querySelector('.map__filters-container').before(createCard(offerArr[0]));
