'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters-container');

  mapFilter.insertAdjacentHTML('beforebegin', '<div class="map__add"></div>');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var containerPhotos = document.querySelector('#card').content.querySelector('.popup__photos');
  containerPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo popup__photo--second" width="45" height="40" alt="Фотография жилья">');
  containerPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo popup__photo--third" width="45" height="40" alt="Фотография жилья">');

  var getHomeType = function (homeType) {
    switch (homeType) {
      case 'palace':
        homeType = 'Дворец';
        break;
      case 'bungalo':
        homeType = 'Бунгало';
        break;
      case 'house':
        homeType = 'Дом';
        break;
      case 'flat':
        homeType = 'Квартира';
        break;
    }
    return homeType;
  };

  window.card = {
    createAddCard: function (object) {
      var cardElement = cardTemplate.cloneNode(true);

      var popupTitle = cardElement.querySelector('.popup__title');
      popupTitle.textContent = object.offer.title;
      if (!object.offer.title) {
        popupTitle.remove();
      }

      var popupAddress = cardElement.querySelector('.popup__text--address');
      popupAddress.textContent = object.offer.address;
      if (!object.offer.address) {
        popupAddress.remove();
      }

      var popupPrice = cardElement.querySelector('.popup__text--price');
      popupPrice.textContent = object.offer.price + '₽/ночь';
      if (!object.offer.price) {
        popupPrice.remove();
      }

      var popupType = cardElement.querySelector('.popup__type');
      popupType.textContent = getHomeType(object.offer.type);
      if (!object.offer.type) {
        popupType.remove();
      }

      var popupCapacity = cardElement.querySelector('.popup__text--capacity');
      popupCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
      if (!object.offer.rooms || !object.offer.guests) {
        popupCapacity.remove();
      }

      var popupTime = cardElement.querySelector('.popup__text--time');
      popupTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      if (!object.offer.checkin || !object.offer.checkout) {
        popupTime.remove();
      }

      var featuresContainer = cardElement.querySelector('.popup__features');
      var featureConditioner = cardElement.querySelector('.popup__feature--conditioner');
      var featureElevator = cardElement.querySelector('.popup__feature--elevator');
      var featureWasher = cardElement.querySelector('.popup__feature--washer');
      var featureParking = cardElement.querySelector('.popup__feature--parking');
      var featureDishwasher = cardElement.querySelector('.popup__feature--dishwasher');
      var featureWifi = cardElement.querySelector('.popup__feature--wifi');

      if (object.offer.features.indexOf('wifi') < 0) {
        featureWifi.remove();
      }

      if (object.offer.features.indexOf('dishwasher') < 0) {
        featureDishwasher.remove();
      }

      if (object.offer.features.indexOf('parking') < 0) {
        featureParking.remove();
      }

      if (object.offer.features.indexOf('washer') < 0) {
        featureWasher.remove();
      }

      if (object.offer.features.indexOf('elevator') < 0) {
        featureElevator.remove();
      }

      if (object.offer.features.indexOf('conditioner') < 0) {

        featureConditioner.remove();
      }

      if (!object.offer.features) {
        featuresContainer.remove();
      }

      var popupDescription = cardElement.querySelector('.popup__description');
      popupDescription.textContent = object.offer.description;
      if (!object.offer.description) {
        popupDescription.remove();
      }

      var photosContainer = cardElement.querySelector('.popup__photos');
      var photos = cardElement.querySelectorAll('.popup__photo');
      for (var p = 0; p < photos.length; p++) {
        if (object.offer.photos[p]) {
          photos[p].src = object.offer.photos[p];
        } else {
          photos[p].remove();
        }
      }

      if (!object.offer.photos) {
        photosContainer.remove();
      }

      var popupAvatar = cardElement.querySelector('.popup__avatar');
      popupAvatar.src = object.author.avatar;
      if (!object.author.avatar) {
        popupAvatar.remove();
      }
      return cardElement;
    }
  };
})();
