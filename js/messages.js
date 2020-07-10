'use strict';

window.messages = (function () {
  var mainElement = document.querySelector('main');

  // Функция вывода сообщения об ошибке
  var onError = function (message) {
    var errorTemplateElement = document.querySelector('#error').content;

    var cloneError = errorTemplateElement.cloneNode(true);
    cloneError.querySelector('.error__message').innerHTML = 'Ошибка загрузки объявления' + '<br>' + message;

    mainElement.appendChild(cloneError);
    document.querySelector('.error').classList.add('message');

    messageControllerEvent('add');
  };

  // Функция вывода сообщения об успешной отправки
  var onSuccess = function () {
    var successTemplateElement = document.querySelector('#success').content;

    var cloneSuccess = successTemplateElement.cloneNode(true);
    mainElement.appendChild(cloneSuccess);
    document.querySelector('.success').classList.add('message');

    messageControllerEvent('add');
  };

  // Обработчик закрытия сообщения на click
  var onMessageClose = function (evt) {
    if (evt.target.classList.contains('message') || evt.target.classList.contains('error__button')) {
      closeMessage();
    }
  };

  // Функция добавляет/удаляет отбаротчики событий
  var messageControllerEvent = function (parameter) {
    var messageElement = document.querySelector('.message');
    if (parameter === 'add') {
      document.addEventListener('keydown', onMessageEscClose);
      messageElement.addEventListener('click', onMessageClose);
    } else {
      document.removeEventListener('keydown', onMessageEscClose);
      messageElement.removeEventListener('click', onMessageClose);
    }
  };

  // Обработчик закрытия сообщения на ESC
  var onMessageEscClose = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  // Функция закрытия сообщения
  var closeMessage = function () {
    messageControllerEvent('remove');
    document.querySelector('.message').remove();
  };

  return {
    onError: onError,
    onSuccess: onSuccess
  };
})();
