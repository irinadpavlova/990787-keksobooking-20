'use strict';

(function () {
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

  var createAddObjects = function (massLength) {
    var addObjectsTmp = [];
    for (var i = 0; i < massLength; i++) {
      var addObject = createObject(window.data.avatarsSrc, window.data.titles, window.data.minAddressX, window.data.maxAddressX, window.data.minAddressY, window.data.maxAddressY, window.data.prices, window.data.homeTypes, window.data.rooms, window.data.guests, window.data.checkin, window.data.features, window.data.descriptions, window.data.photos, window.data.minLocationX, window.data.maxLocationX, window.data.minLocationY, window.data.maxLocationY);
      addObjectsTmp.push(addObject);
    }
    return addObjectsTmp;
  };
  var addObjects = createAddObjects(window.data.massLength);
  window.main = {
    addObjects: addObjects
  };
})();
