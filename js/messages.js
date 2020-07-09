'use strict';

window.messages = (function () {
  var mainElement = document.querySelector('main');

  // Функция вывода сообщения об ошибке
  var onError = function (message) {
    var errorTemplateElement = document.querySelector('#error').content;

    var cloneError = errorTemplateElement.cloneNode(true);
    cloneError.querySelector('.error__message').innerHTML = 'Ошибка загрузки объявления' + '<br>' + message;

    mainElement.appendChild(cloneError);

    document.addEventListener('keydown', onMessageEscClose);
    document.addEventListener('click', onMessageClose);
  };

  // Функция вывода сообщения об успешной отправки
  var onSuccess = function () {
    var successTemplateElement = document.querySelector('#success').content;

    var cloneSuccess = successTemplateElement.cloneNode(true);
    mainElement.appendChild(cloneSuccess);

    document.addEventListener('keydown', onMessageEscClose);
    document.addEventListener('click', onMessageClose);
  };

  // Обработчик закрытия сообщения на click
  var onMessageClose = function (evt) {
    if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button') || evt.target.classList.contains('success')) {
      closeMessage();
    }
  };

  // Обработчик закрытия сообщения на ESC
  var onMessageEscClose = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  // Функция закрытия сообщения
  var closeMessage = function () {
    var errorElement = document.querySelector('.error');
    var succesElement = document.querySelector('.success');

    if (errorElement) {
      errorElement.remove();
    } else if (succesElement) {
      succesElement.remove();
    }

    document.removeEventListener('keydown', onMessageEscClose);
    document.removeEventListener('click', onMessageClose);
  };

  return {
    onError: onError,
    onSuccess: onSuccess

  };
})();
