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

var addObject = {};

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

var createObject = function (avatarsSrc, titles, minAddressX, maxAddressX, minAddressY, maxAddressY, prices, homeTypes, rooms, guests, checkin, features, descriptions, photos, minLocationX, maxLocationX, minLocationY, maxLocationY) {
  addObject = {
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
      checkin: getRandomString(checkin),
      checkout: checkin[0],
      features: getRandomMass(features),
      description: getRandomMassElement(descriptions),
      photos: getRandomMass(photos)
    },
    location: {
      x: getRandomInteger(minLocationX, maxLocationX),
      y: getRandomInteger(minLocationY, maxLocationY)
    }
  };
  return addObject;
};

createObject(AVATARS_SRC, TITLES, MIN_ADDRESS_X, MAX_ADDRESS_X, MIN_ADDRESS_Y, MAX_ADDRESS_Y, PRICES, HOME_TYPES, ROOMS, GUESTS, CHECKIN, FEATURES, DESCRIPTIONS, PHOTOS, MIN_LOCATION_X, MAX_LOCATION_X, MIN_LOCATION_Y, MAX_LOCATION_Y);

var getCheckoutIndex = function (checkin) {
  var indexCheckin = checkin.indexOf(addObject.offer.checkin);
  if (indexCheckin === 0) {
    var indexCheckout = indexCheckin;
  } else {
    indexCheckout = indexCheckin - 1;
  }
  var checkoutValue = checkin[indexCheckout];
  return checkoutValue;
};

var createMass = function (massLength) {
  var addsMass = [];
  for (var i = 0; i < massLength; i++) {
    addObject = createObject(AVATARS_SRC, TITLES, MIN_ADDRESS_X, MAX_ADDRESS_X, MIN_ADDRESS_Y, MAX_ADDRESS_Y, PRICES, HOME_TYPES, ROOMS, GUESTS, CHECKIN, FEATURES, DESCRIPTIONS, PHOTOS, MIN_LOCATION_X, MAX_LOCATION_X, MIN_LOCATION_Y, MAX_LOCATION_Y);
    addsMass.push(addObject);
    addObject.offer.checkout = getCheckoutIndex(CHECKIN);
  }
  return addsMass;
};

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left:' + (object.location.x + OFFSET_X) + 'px' + ';' + 'top:' + (object.location.y - OFFSET_Y) + 'px';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();

var createMapPins = function (massLength) {
  for (var i = 0; i < massLength; i++) {
    fragment.appendChild(createPin(createMass(MASS_LENGTH)[i]));
  }
};

createMapPins(MASS_LENGTH);

mapPins.appendChild(fragment);

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
// var renderAdd = function (object) {
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
// fragment.appendChild(renderAdd(createMass(MASS_LENGTH)[0]));
//
// mapAdd.appendChild(fragment);

var map = document.querySelector('.map');

var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var filterSelects = mapFilter.querySelectorAll('select');
var filterFieldset = mapFilter.querySelector('fieldset');

var getDisabledPage = function () {
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].setAttribute('disabled', 'disabled');
  }

  mapFilter.classList.add('ad-form--disabled');

  filterFieldset.setAttribute('disabled', 'disabled');

  for (var i = 0; i < filterSelects.length; i++) {
    filterSelects[i].setAttribute('disabled', 'disabled');
  }
};

var getActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].removeAttribute('disabled');
  }
  for (var i = 0; i < filterSelects.length; i++) {
    filterSelects[i].removeAttribute('disabled');
  }
  filterFieldset.removeAttribute('disabled');
  mapFilter.classList.remove('ad-form--disabled');
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 ) {
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

roomNumber.addEventListener("change", function() {
  var currentVal = this.value;
  if (currentVal === "100") {
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = true;
    }
    capacity.children[capacity.children.length - 1].disabled = false;
    capacity.children[capacity.children.length - 1].selected = true;
  } else if (currentVal === "3") {
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = false;
    }
    capacity.children[capacity.children.length - 1].disabled = true;
    capacity.children[capacity.children.length - 4].selected = true;
  } else if (currentVal === "2") {
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = true;
    }
    capacity.children[capacity.children.length - 3].disabled = false;
    capacity.children[capacity.children.length - 2].disabled = false;
    capacity.children[capacity.children.length - 3].selected = true;
  } else if (currentVal === "1"){
    for (var i = 0; i < capacity.children.length; i++) {
      capacity.children[i].disabled = true;
    }
    capacity.children[capacity.children.length - 2].disabled = false;
    capacity.children[capacity.children.length - 2].selected = true;
  }
});

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

var getTimeoutFromTimein = function (timein) {
  switch (timein) {
    case '12:00':
      timeout.children[1].disabled = true;
      timeout.children[2].disabled = true;
      timeout.children[0].selected = true;
      break;
    case '13:00':
      timeout.children[0].disabled = true;
      timeout.children[2].disabled = true;
      timeout.children[1].selected = true;
      break;
    case '14:00':
      timeout.children[0].disabled = true;
      timeout.children[1].disabled = true;
      timeout.children[2].selected = true;
      break;
  }
  return timein;
};

timein.addEventListener('change', function () {
  getTimeoutFromTimein(timein.value);
});
