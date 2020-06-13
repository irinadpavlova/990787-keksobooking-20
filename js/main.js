'use strict';

var MASS_LENGTH = 8;
var AVATARS_SRC = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Уютное гнездышко для молодоженов', 'Роскошные аппартаменты', 'Просто и со вкусом', 'Любимое местечко', 'В самом центе Токио', 'Лучший вид из окна', 'Антикризисное предложение', 'Такого больше не найдете'];
var HOME_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_ADDRESS_X = 0;
var MAX_ADDRESS_X = 1200;
var MIN_ADDRESS_Y = 0;
var MAX_ADDRESS_Y = 750;
var PRICES = [500, 800, 900, 1000, 2000, 3000, 4000, 5000];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3, 4, 5];
var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио.', 'Подходит как туристам, так и бизнесменам.', 'Квартира полностью укомплектована и недавно отремонтирована.', 'Удобное расположение квартиры позволит Вам насладиться отдыхом в полной мере.', 'Вас порадуют просторные комнаты и шикарный вид из окна.', 'Остановившись у нас однажды Вы не сможете выбрать другую квартиру.', 'У нас Вы найдете максимум уюта и комфорта.', 'Роскошные интерьеры нашей квартиры не оставят Вас равнодушными.'];
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1125;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var OFFSET_X = 25;
var OFFSET_Y = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;
var MAIN_PIN_POSITION_X = 570;
var MAIN_PIN_POSITION_Y = 375;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomMassElement = function (mass) {
  var randomIndex = Math.floor(Math.random() * mass.length);
  var randomMassElement = mass[randomIndex];
  mass.splice(randomIndex, 1);
  return randomMassElement;
};

var getRandomMass = function (mass) {
  var newMass = mass.slice(0, getRandomInteger(1, mass.length));
  return newMass;
};

var getRandomString = function (mass) {
  var string = mass[getRandomInteger(0, mass.length - 1)];
  return string;
};

var getCheckinCheckout = function (checkin) {
  var checkinIndex = getRandomInteger(0, checkin.length - 2);
  return {
    checkoutValue: checkin[checkinIndex],
    checkinValue: checkin[checkinIndex + 1]
  };
};

var createObject = function (avatarsSrc, titles, minAddressX, maxAddressX, minAddressY, maxAddressY, prices, homeTypes, rooms, guests, checkin, features, descriptions, photos, minLocationX, maxLocationX, minLocationY, maxLocationY) {
  var checkinCheckoutTmp = getCheckinCheckout(checkin);
  var addObjectTmp = {
    author: {
      avatar: 'img/avatars/user' + getRandomMassElement(avatarsSrc) + '.png'
    },
    offer: {
      title: getRandomMassElement(titles),
      address: getRandomInteger(minAddressX, maxAddressX) + ',' + getRandomInteger(minAddressY, maxAddressY),
      price: getRandomMassElement(prices),
      type: getRandomString(homeTypes),
      rooms: getRandomString(rooms),
      guests: getRandomString(guests),
      checkin: checkinCheckoutTmp.checkinValue,
      checkout: checkinCheckoutTmp.checkoutValue,
      features: getRandomMass(features),
      description: getRandomMassElement(descriptions),
      photos: getRandomMass(photos)
    },
    location: {
      x: getRandomInteger(minLocationX, maxLocationX),
      y: getRandomInteger(minLocationY, maxLocationY)
    }
  };
  return addObjectTmp;
};

// Получение массива, состоящего из 8 объявлений (объектов)

var createAddObjects = function (massLength) {
  var addObjectsTmp = [];
  for (var i = 0; i < massLength; i++) {
    var addObject = createObject(AVATARS_SRC, TITLES, MIN_ADDRESS_X, MAX_ADDRESS_X, MIN_ADDRESS_Y, MAX_ADDRESS_Y, PRICES, HOME_TYPES, ROOMS, GUESTS, CHECKIN, FEATURES, DESCRIPTIONS, PHOTOS, MIN_LOCATION_X, MAX_LOCATION_X, MIN_LOCATION_Y, MAX_LOCATION_Y);
    addObjectsTmp.push(addObject);
  }
  return addObjectsTmp;
};
var addObjects = createAddObjects(MASS_LENGTH);

// Отрисовка меток объявлений на карте

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left:' + (object.location.x + OFFSET_X) + 'px' + ';' + 'top:' + (object.location.y - OFFSET_Y) + 'px';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;
  return pinElement;
};

var createMapPins = function (objectsArray) {
  var fragmentForPinsTmp = document.createDocumentFragment();
  for (var i = 0; i < objectsArray.length; i++) {
    fragmentForPinsTmp.appendChild(createPin(objectsArray[i]));
  }
  return fragmentForPinsTmp;
};

var fragmentForPins = createMapPins(addObjects);


//
// // Отрисовка карточки с объявлением на карте
//
// var mapFilter = document.querySelector('.map__filters-container');
//
// mapFilter.insertAdjacentHTML('beforebegin', '<div class="map__add"></div>');
// var mapAdd = document.querySelector('.map__add');
//
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
//
// var getHomeType = function (homeType) {
//   switch (homeType) {
//     case 'palace':
//       homeType = 'Дворец';
//       break;
//     case 'bungalo':
//       homeType = 'Бунгало';
//       break;
//     case 'house':
//       homeType = 'Дом';
//       break;
//     case 'flat':
//       homeType = 'Квартира';
//       break;
//   }
//   return homeType;
// };
//
// var containerPhotos = document.querySelector('#card').content.querySelector('.popup__photos');
// containerPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo popup__photo--second" width="45" height="40" alt="Фотография жилья">');
// containerPhotos.insertAdjacentHTML('beforeend', '<img src="" class="popup__photo popup__photo--third" width="45" height="40" alt="Фотография жилья">');
//
// var renderAddCard = function (object) {
//   var cardElement = cardTemplate.cloneNode(true);
//
//   var popupTitle = cardElement.querySelector('.popup__title');
//   popupTitle.textContent = object.offer.title;
//   if (!object.offer.title) {
//     popupTitle.remove();
//   }
//
//   var popupAddress = cardElement.querySelector('.popup__text--address');
//   popupAddress.textContent = object.offer.address;
//   if (!object.offer.address) {
//     popupAddress.remove();
//   }
//
//   var popupPrice = cardElement.querySelector('.popup__text--price');
//   popupPrice.textContent = object.offer.price + '₽/ночь';
//   if (!object.offer.price) {
//     popupPrice.remove();
//   }
//
//   var popupType = cardElement.querySelector('.popup__type');
//   popupType.textContent = getHomeType(object.offer.type);
//   if (!object.offer.type) {
//     popupType.remove();
//   }
//
//   var popupCapacity = cardElement.querySelector('.popup__text--capacity');
//   popupCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
//   if (!object.offer.rooms || !object.offer.guests) {
//     popupCapacity.remove();
//   }
//
//   var popupTime = cardElement.querySelector('.popup__text--time');
//   popupTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
//   if (!object.offer.checkin || !object.offer.checkout) {
//     popupTime.remove();
//   }
//
//   var featuresContainer = cardElement.querySelector('.popup__features');
//
//   var features = cardElement.querySelectorAll('.popup__feature');
//   for (var i = 0; i < features.length; i++) {
//     if (object.offer.features[i] === undefined) {
//       features[i].remove();
//     }
//   }
//
//   if (!object.offer.features) {
//     featuresContainer.remove();
//   }
//
//   var popupDescription = cardElement.querySelector('.popup__description');
//   popupDescription.textContent = object.offer.description;
//   if (!object.offer.description) {
//     popupDescription.remove();
//   }
//
//   var photosContainer = cardElement.querySelector('.popup__photos');
//   var photos = cardElement.querySelectorAll('.popup__photo');
//   var containerPhotos = document.querySelector('#card').content.querySelector('.popup__photos');
//   for (var i = 0; i < photos.length; i++) {
//     if (object.offer.photos[i]) {
//       photos[i].src = object.offer.photos[i];
//     } else {
//       photos[i].remove();
//     }
//   }
//
//   if (!object.offer.photos) {
//     photosContainer.remove();
//   }
//
//   var popupAvatar = cardElement.querySelector('.popup__avatar');
//   popupAvatar.src = object.author.avatar;
//   if (!object.author.avatar) {
//     popupAvatar.remove();
//   }
//
//   return cardElement;
// };
//
// var fragmentForCard = document.createDocumentFragment();
// fragmentForCard.appendChild(renderAddCard(addObjects[0]));
//
// mapAdd.appendChild(fragmentForCard);

// Валидация формы

var map = document.querySelector('.map');

var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var filterSelects = mapFilter.querySelectorAll('select');
var filterFieldset = mapFilter.querySelector('fieldset');
var address = adForm.querySelector('#address');

var getAddressValueFromPin = function (positionX, offsetX, positionY, offsetY) {
  var addressValueTmp = Math.round(positionX + offsetX) + ',' + Math.round(positionY + offsetY);
  return addressValueTmp;
};

var getDisabledPage = function () {
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].setAttribute('disabled', 'disabled');
  }
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');

  filterFieldset.setAttribute('disabled', 'disabled');

  for (var j = 0; j < filterSelects.length; j++) {
    filterSelects[j].setAttribute('disabled', 'disabled');
  }
  address.value = getAddressValueFromPin(MAIN_PIN_POSITION_X, MAIN_PIN_WIDTH / 2, MAIN_PIN_POSITION_Y, MAIN_PIN_WIDTH / 2);
};

getDisabledPage();

var getActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].removeAttribute('disabled');
  }
  for (var j = 0; j < filterSelects.length; j++) {
    filterSelects[j].removeAttribute('disabled');
  }
  filterFieldset.removeAttribute('disabled');
  mapFilter.classList.remove('ad-form--disabled');
  mapPins.appendChild(fragmentForPins);
  address.value = getAddressValueFromPin(MAIN_PIN_POSITION_X, MAIN_PIN_WIDTH / 2, MAIN_PIN_POSITION_Y, MAIN_PIN_HEIGHT);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    getActivePage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    getActivePage();
  }
});

var capacity = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');

capacity.addEventListener('change', function () {
  if (capacity.value > roomNumber.value) {
    capacity.setCustomValidity('Количество гостей превышает количество спальних мест');
  } else {
    capacity.setCustomValidity('');
  }
});

roomNumber.addEventListener('change', function () {
  getCapacityFromRoomNumber(roomNumber.value);
});

var getCapacityFromRoomNumber = function (roomNumberValue) {
  switch (roomNumberValue) {
    case '100':
      for (var i = 0; i < capacity.children.length; i++) {
        capacity.children[i].disabled = true;
      }
      capacity.children[capacity.children.length - 1].disabled = false;
      capacity.children[capacity.children.length - 1].selected = true;
      break;
    case '3':
      for (var j = 0; j < capacity.children.length; j++) {
        capacity.children[j].disabled = false;
      }
      capacity.children[capacity.children.length - 1].disabled = true;
      capacity.children[capacity.children.length - 4].selected = true;
      break;
    case '2':
      for (var k = 0; k < capacity.children.length; k++) {
        capacity.children[k].disabled = true;
      }
      capacity.children[capacity.children.length - 3].disabled = false;
      capacity.children[capacity.children.length - 2].disabled = false;
      capacity.children[capacity.children.length - 3].selected = true;
      break;
    case '1':
      for (var n = 0; n < capacity.children.length; n++) {
        capacity.children[n].disabled = true;
      }
      capacity.children[capacity.children.length - 2].disabled = false;
      capacity.children[capacity.children.length - 2].selected = true;
      break;
  }
  return roomNumberValue;
};

var price = adForm.querySelector('#price');
var type = adForm.querySelector('#type');

var getMinPriceFromType = function (homeType) {
  switch (homeType) {
    case 'palace':
      price.setAttribute('min', '10000');
      price.setAttribute('placeholder', '10000');
      break;
    case 'bungalo':
      price.setAttribute('min', '0');
      price.setAttribute('placeholder', '0');
      break;
    case 'house':
      price.setAttribute('min', '5000');
      price.setAttribute('placeholder', '5000');
      break;
    case 'flat':
      price.setAttribute('min', '1000');
      price.setAttribute('placeholder', '1000');
      break;
  }
  return homeType;
};

type.addEventListener('change', function () {
  getMinPriceFromType(type.value);
});

var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');

var synchronizeTimeinTimeout = function (timeinTimeoutValue, timeinTimeout) {
  switch (timeinTimeoutValue) {
    case '12:00':
      timeinTimeout.children[1].disabled = true;
      timeinTimeout.children[2].disabled = true;
      timeinTimeout.children[0].selected = true;
      break;
    case '13:00':
      timeinTimeout.children[0].disabled = true;
      timeinTimeout.children[2].disabled = true;
      timeinTimeout.children[1].selected = true;
      break;
    case '14:00':
      timeinTimeout.children[0].disabled = true;
      timeinTimeout.children[1].disabled = true;
      timeinTimeout.children[2].selected = true;
      break;
  }
  return timeinTimeoutValue;
};

timein.addEventListener('change', function () {
  synchronizeTimeinTimeout(timein.value, timeout);
});

timeout.addEventListener('change', function () {
  synchronizeTimeinTimeout(timeout.value, timein);
});
