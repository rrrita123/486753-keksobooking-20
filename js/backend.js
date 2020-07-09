'use strict';

window.backend = (function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  var dataRespose = []; // массив для данных от сервера

  // Записывается ответ с сервера в переменную
  var setDataResponse = function (response) {
    dataRespose = response;
  };

  // Получаем переменную с данными от сервера
  var getDataResponse = function () {
    return dataRespose;
  };

  return {
    setDataResponse: setDataResponse,
    getDataResponse: getDataResponse,

    // Данные получаются с сервера
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
        setDataResponse(xhr.response);
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    // Данные отправляются на сервер
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess();
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };

})();
