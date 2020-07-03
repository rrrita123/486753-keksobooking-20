'use strict';

window.backend = (function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
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
  };

})();
