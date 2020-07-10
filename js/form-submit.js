'use strict';

window.formSubmit = (function () {
  var formElement = document.querySelector('.ad-form');

  // Обработчик успешной отправки данных
  var onSuccess = function () {
    window.messages.onSuccess();
    window.main.setRepeatInactiveState();
  };

  // Обработчик ошибок при отправки данных
  var onError = function (message) {
    window.messages.onError(message);
  };

  // Отправка данных формы с на сервер с помощью AJAX
  // После успешной передачи данных страница переходит в неактивное состояние
  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onSuccess, onError);
  };

  formElement.addEventListener('submit', onSubmit);
})();
