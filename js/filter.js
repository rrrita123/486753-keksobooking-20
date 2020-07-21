'use strict';

window.filter = (function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var typeElement = document.querySelector('#housing-type');
  var priceElement = document.querySelector('#housing-price');
  var roomElement = document.querySelector('#housing-rooms');
  var guestElement = document.querySelector('#housing-guests');
  var featuresElement = document.querySelector('#housing-features');

  var filteredPins;
  var pins;

  var PriceTypeToRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },

    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },

    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filtrationItem = function (element, parametr) {
    return element.value === 'any' ? true : parametr.toString() === element.value;
  };

  var onTypeFilter = function (item) {
    return filtrationItem(typeElement, item.offer.type);
  };

  var onPriceFilter = function (item) {
    var filterPrice = PriceTypeToRange[priceElement.value.toUpperCase()];
    return filterPrice ? item.offer.price >= filterPrice.MIN && item.offer.price <= filterPrice.MAX : true;
  };

  var onRoomsFilter = function (item) {
    return filtrationItem(roomElement, item.offer.rooms);
  };

  var onGuestFilter = function (item) {
    return filtrationItem(guestElement, item.offer.guests);
  };

  var onFeaturesFilter = function (item) {
    var filterFeatures = featuresElement.querySelectorAll(':checked');
    var valueFeatures = item.offer.features;
    var isFiltered = false;

    if (filterFeatures.length > 0) {
      isFiltered = Array.from(filterFeatures).every(function (element) {
        return valueFeatures.includes(element.value);
      });
    } else {
      isFiltered = true;
    }

    return isFiltered;
  };

  // Функция обработчик собирает цепочки фильтров
  var onFilterChange = window.util.debounce(function () {
    filteredPins = pins.filter(onTypeFilter)
                        .filter(onPriceFilter)
                        .filter(onRoomsFilter)
                        .filter(onGuestFilter)
                        .filter(onFeaturesFilter);

    window.cardShow.closeCard();
    window.map.removePins();
    window.map.renderMarks(filteredPins);
  }, 500);

  var activateFilter = function (pinsArray) {
    filteredPins = pinsArray;
    pins = pinsArray;
    mapFilterElement.addEventListener('change', onFilterChange);
  };

  var deactivateFilter = function () {
    mapFilterElement.removeEventListener('change', onFilterChange);
  };

  return {
    getFilteredPins: function () {
      return filteredPins;
    },
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter
  };
})();
