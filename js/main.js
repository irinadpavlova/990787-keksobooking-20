'use strict';

var size = 8;
var arr = [];
var pool = [];  //avatar 01..08

for (var i = 1; i <= size; i++) {
  arr.push('0' + i);
}

for (i = 1; i <= size; i++) {
  var value = arr.splice(Math.floor(Math.random() * ((size - i) - 1) + 1), 1);
  pool.push(value.pop());
}
console.log(pool);

var getRandomInteger = function (min, max) {                               //random number function
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log(getRandomInteger(0, 1200)); //address x
console.log(getRandomInteger(0, 750));  //address y

console.log(getRandomInteger(0, 1200)); //pin x
console.log(getRandomInteger(130, 630)); //pin y


var houseType = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomMass = function (mass) {                              //random array function
  mass.length = getRandomInteger(1, mass.length);
  return mass;
}

console.log(getRandomMass(features));
console.log(getRandomMass(photos));

var getRandomString = function (mass) {                            //random string function
  var string = mass[getRandomInteger(0, mass.length - 1)];
  return string;
}

console.log(getRandomString(houseType));
console.log(getRandomString(checkin));
console.log(getRandomString(checkout));

var addObject = {
                  "author": {
                      "avatar": 'img/avatars/user' + 'pool' + '.png'
                  },
                  "offer": {
                      "title": 'строка, заголовок предложения',
                      "address":  'getRandomInteger(0, 1200),' + 'getRandomInteger(0, 750)',
                      "price": 'число, стоимость',
                      "type": 'getRandomString(houseType)',
                      "rooms": 'число, количество комнат',
                      "guests": 'число, количество гостей, которое можно разместить',
                      "checkin": 'getRandomString(checkin)',
                      "checkout": 'getRandomString(checkout)',
                      "features": 'getRandomMass(features)',
                      "description": 'строка с описанием',
                      "photos": 'getRandomMass(photos)',
                  },
                  "location": {
                      "x": getRandomInteger(0, 1200),
                      "y": getRandomInteger(130, 630)
                  }
                }

console.log(addObject);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var advertisement = document.createElement('div');
advertisement.classList.add('map__advertisement');
map.appendChild(advertisement);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderCard = function(card) {
  var cardElement = cardTemplate.cloneNode(true);
  var pinElement = pinTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = "img/avatars/user + 'pool[i]' + .png";
  cardElement.querySelector('.popup__text--address').textContent = getRandomInteger(0, 1200), getRandomInteger(0, 750);
  cardElement.querySelector('.popup__type').textContent = getRandomString(houseType);
  cardElement.querySelector('.popup__text--time').textContent = getRandomString(checkin), + getRandomString(checkout);
  cardElement.querySelector('.popup__features').textContent = getRandomMass(features);
  cardElement.querySelector('.popup__photo').textContent = getRandomMass(photos);

  return cardElement;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < 9; i++) {
  fragment.appendChild(renderCard(card[i]));
}

advertisement.appendChild(fragment);
