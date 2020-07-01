'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  window.pins = {
    createPin: function (object) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style = 'left:' + (object.location.x - window.data.offsetX) + 'px' + ';' + 'top:' + (object.location.y - window.data.offsetY) + 'px';
      pinElement.querySelector('img').src = object.author.avatar;
      pinElement.querySelector('img').alt = object.offer.title;
      pinElement.setAttribute('data-index', object.id);
      return pinElement;
    },
    renderPins: function (object) {
      var fragmentForPinsTmp = document.createDocumentFragment();
      object.forEach(function (element) {
        fragmentForPinsTmp.appendChild(window.pins.createPin(element));
      });
      mapPins.appendChild(fragmentForPinsTmp);
    }
  };

})();
