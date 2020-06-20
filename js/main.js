'use strict';

window.main = (function () {
  var mapPinActive = document.querySelector('.map__pin--main');

  // Обработчик активации страницы клика левой кнопки мыши
  var onMouseClick = function (evt) {
    window.util.isLeftButtomMouse(evt, setActiveState);
    mapPinActive.removeEventListener('mousedown', onMouseClick);
  };

  // Обработчик активации страницы по нажанию Enter на метку с клавиатуры
  var onPinEnterPress = function (evt) {
    window.util.isEnterEvent(evt, setActiveState);
    mapPinActive.removeEventListener('keydown', onPinEnterPress);
  };

  mapPinActive.addEventListener('keydown', onPinEnterPress);

  // Устанавливает неактивное состояние страницы
  var fieldsetsAdForm = document.querySelectorAll('.ad-form fieldset');
  var selectsMapFilter = document.querySelectorAll('.map__filters select, .map__filters fieldset');

  var setInactiveState = function () {
    window.form.setStateCollection(fieldsetsAdForm, true);
    window.form.setStateCollection(selectsMapFilter, true);
    window.map.getAddressMarkMain(false);
    window.form.onInputRoomChange();
  };

  setInactiveState();

  mapPinActive.addEventListener('mousedown', onMouseClick);

  // Устанавливает активное состояние страницы
  var setActiveState = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.form.setStateCollection(selectsMapFilter, false);
    window.form.setStateCollection(fieldsetsAdForm, false);
    window.map.getAddressMarkMain(true);
    window.form.onInputRoomChange();
    window.map.renderMarks();
  };
})();
