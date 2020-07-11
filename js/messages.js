'use strict';

window.messages = (function () {
  var mainElement = document.querySelector('main');

  // Функция вывода сообщения об ошибке
  var onError = function (message) {
    var errorTemplateElement = document.querySelector('#error').content;

    var cloneError = errorTemplateElement.cloneNode(true);
    cloneError.querySelector('.error__message').innerHTML = 'Ошибка загрузки объявления' + '<br>' + message;

    mainElement.appendChild(cloneError);

    messageAddEvent();
  };

  // Функция вывода сообщения об успешной отправки
  var onSuccess = function () {
    var successTemplateElement = document.querySelector('#success').content;

    var cloneSuccess = successTemplateElement.cloneNode(true);
    mainElement.appendChild(cloneSuccess);

    messageAddEvent();
  };

  // Обработчик закрытия сообщения на click
  var onMessageClose = function (evt) {
    if (evt.target.classList.contains('message') || evt.target.classList.contains('error__button')) {
      closeMessage();
    }
  };

  // Функция добавляет обработчик событий
  var messageAddEvent = function () {
    document.addEventListener('keydown', onMessageEscClose);
    document.querySelector('.message').addEventListener('click', onMessageClose);
  };

  // Обработчик закрытия сообщения на ESC
  var onMessageEscClose = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  // Функция закрытия сообщения
  var closeMessage = function () {
    var messageElement = document.querySelector('.message');
    document.removeEventListener('keydown', onMessageEscClose);
    messageElement.removeEventListener('click', onMessageClose);
    messageElement.remove();
  };

  return {
    onError: onError,
    onSuccess: onSuccess
  };
})();
