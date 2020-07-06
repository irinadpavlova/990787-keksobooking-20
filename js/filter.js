'use strict';

(function () {
  var MASS_LENGTH = 5;
  var DEFAULT_VALUE = 'any';

  var filterForm = document.querySelector('.map__filters');
  var filters = filterForm.querySelectorAll('.map__filter');
  var featuresContainer = filterForm.querySelector('.map__features');

  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');

  var lowPrice = {
    from: 0,
    to: 9999,
  };

  var middlePrice = {
    from: 10000,
    to: 50000,
  };

  var highPrice = {
    from: 50001,
    to: 10000000,
  };

  var filterHousingType = function (advert) {
    return housingType.value === DEFAULT_VALUE || housingType.value === advert.offer.type;
  };

  var filterHousingPrice = function (advert) {
    return housingPrice.value === DEFAULT_VALUE || housingPrice.value === 'low' && advert.offer.price <= lowPrice.to || housingPrice.value === 'middle' && advert.offer.price >= middlePrice.from && advert.offer.price <= middlePrice.to || housingPrice.value === 'high' && advert.offer.price >= highPrice.from;
  };

  var filterHousingRooms = function (advert) {
    return housingRooms.value === DEFAULT_VALUE || housingRooms.value === advert.offer.rooms.toString();
  };

  var filterHousingGuests = function (advert) {
    return housingGuests.value === DEFAULT_VALUE || housingGuests.value === advert.offer.guests.toString();
  };

  var filterHousingFeatures = function (advert, features) {
    return features.every(function (feature) {
      return advert.offer.features.indexOf(feature) >= 0;
    });
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removePins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    mapPinsElements.forEach(function (it) {
      if (!it.matches('.map__pin--main')) {
        it.remove();
      }
    });
  };

  var setFiltersToAdverts = function () {
    removeCard();
    removePins();

    var adverts = [];

    var checkedFeatures = Array.from(featuresContainer.querySelectorAll('input:checked'));
    var features = checkedFeatures.map(function (feature) {
      return feature.value;
    });

    for (var i = 0; i < window.data.cards.length; i++) {
      var advert = window.data.cards[i];
      if (filterHousingType(advert) && filterHousingPrice(advert) && filterHousingRooms(advert) && filterHousingGuests(advert) && filterHousingFeatures(advert, features)) {
        adverts.push(advert);
      }

      if (adverts.length === MASS_LENGTH) {
        break;
      }
    }

    window.pins.render(adverts);
  };

  var onFilterChange = function () {
    window.debounce(setFiltersToAdverts);
  };

  var setDisabled = function () {
    filterForm.reset();

    filters.forEach(function (field) {
      field.disabled = true;
    });

    featuresContainer.disabled = true;

    filterForm.removeEventListener('change', onFilterChange);
  };

  var setEnabled = function () {
    filters.forEach(function (field) {
      field.disabled = false;
    });

    featuresContainer.disabled = false;

    filterForm.addEventListener('change', onFilterChange);
  };

  window.filter = {
    setDisabled: setDisabled,
    setEnabled: setEnabled
  };
})();
