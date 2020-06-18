'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + (object.location.x + window.data.offsetX) + 'px' + ';' + 'top:' + (object.location.y - window.data.offsetY) + 'px';
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

  var fragmentForPins = createMapPins(window.main.addObjects);
  window.pins = {
    fragmentForPins: fragmentForPins
  };
})();
