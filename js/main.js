'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAIN_PIN_MIN_X = 0;
  var MAIN_PIN_MAX_X = 1200;
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 710;
  var MAIN_PIN_MAX_ADDRESS_Y = 630;

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = adForm.querySelector('#address');

  var getAddressValueFromPin = function (positionX, pinWidth, positionY, pinHeight) {
    var addressValueTmp = Math.round(positionX + pinWidth / 2) + ',' + Math.round(positionY + pinHeight / 2);
    return addressValueTmp;
  };

  var removeMapPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPinsElements) {
      for (var i = 0; i < mapPinsElements.length; i++) {
        mapPinsElements[i].remove();
      }
    }
  };

  var removeCard = function () {
    var mapCards = map.querySelectorAll('.map__card');
    if (mapCards) {
      for (var i = 0; i < mapCards.length; i++) {
        mapCards[i].remove();
      }
    }
  };

  var getDisabledPage = function () {
    for (var i = 0; i < adFieldsets.length; i++) {
      adFieldsets[i].setAttribute('disabled', 'disabled');
    }
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilter.classList.add('ad-form--disabled');
    window.filter.setDisabled();
    removeMapPins();
    removeCard();
    address.value = getAddressValueFromPin(MAIN_PIN_START_X, MAIN_PIN_WIDTH, MAIN_PIN_START_Y, MAIN_PIN_WIDTH);
    mapPinMain.style.top = MAIN_PIN_START_Y + 'px';
    mapPinMain.style.left = MAIN_PIN_START_X + 'px';
  };

  getDisabledPage();

  var successHandler = function (data) {
    getCardsArrayWithId(data);
    window.filter.setEnabled();
    window.pins.renderPins(window.data.cards.slice(0, 5));
    window.map.init();
  };

  var getCardsArrayWithId = function (data) {
    data.forEach(function (element, index) {
      element.id = index;
      if (element.offer) {
        window.data.cards.push(element);
      }
    });
    return window.data.cards;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; width: 500px; height: 80px; padding: 30px; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = '350px';
    node.style.top = '400px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getActivePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFieldsets.length; i++) {
      adFieldsets[i].removeAttribute('disabled');
    }
    mapFilter.classList.remove('ad-form--disabled');
  };

  var mapPinMainMoveHelper = function () {
    getActivePage();
    if (window.data.cards.length === 0) {
      window.backend.load(successHandler, errorHandler);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      mapPinMainMoveHelper();
    }
  });

  var onPinMainPress = function (evt) {
    if (evt.key === 'Enter') {
      mapPinMainMoveHelper();
    }
  };

  mapPinMain.addEventListener('keydown', onPinMainPress);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var getAddressFromPinCoords = function (evtParameter) {
      var shift = {
        x: startCoords.x - evtParameter.clientX,
        y: startCoords.y - evtParameter.clientY
      };
      startCoords = {
        x: evtParameter.clientX,
        y: evtParameter.clientY
      };
      var pinPositionX = mapPinMain.offsetLeft - shift.x;
      var pinPositionY = mapPinMain.offsetTop - shift.y;

      var pinEndCoordX = Math.round(pinPositionX + MAIN_PIN_WIDTH / 2);
      var pinEndCoordY = Math.round(pinPositionY + MAIN_PIN_HEIGHT);

      if (pinEndCoordX >= MAIN_PIN_MIN_X && pinEndCoordX <= MAIN_PIN_MAX_X && pinEndCoordY >= MAIN_PIN_MIN_Y && pinEndCoordY <= MAIN_PIN_MAX_Y) {
        mapPinMain.style.top = pinPositionY + 'px';
        mapPinMain.style.left = pinPositionX + 'px';
        if (pinEndCoordY >= MAIN_PIN_MAX_ADDRESS_Y) {
          pinEndCoordY = MAIN_PIN_MAX_ADDRESS_Y;
        }
        address.value = pinEndCoordX + ',' + pinEndCoordY;
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      getAddressFromPinCoords(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      getAddressFromPinCoords(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.main = {
    getDisabledPage: getDisabledPage
  };

})();
