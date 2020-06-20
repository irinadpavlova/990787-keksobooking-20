'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var MAIN_PIN_MIN_X = 0;
  var MAIN_PIN_MAX_X = 1200;
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 710;
  var MAIN_PIN_MAX_ADDRESS_Y = 630;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');

  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterSelects = mapFilter.querySelectorAll('select');
  var filterFieldset = mapFilter.querySelector('fieldset');
  var address = adForm.querySelector('#address');

  var getAddressValueFromPin = function (positionX, pinWidth, positionY, pinHeight) {
    var addressValueTmp = Math.round(positionX + pinWidth / 2) + ',' + Math.round(positionY + pinHeight / 2);
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
    address.value = getAddressValueFromPin(mapPinMain.offsetLeft, MAIN_PIN_WIDTH, mapPinMain.offsetTop, MAIN_PIN_WIDTH);
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
  };

  var renderPins = function (pinsFragment) {
    mapPins.appendChild(pinsFragment);
  };

  var setDataAttributeForPins = function () {
    var mapPinsElements = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPinsElements.length; i++) {
      if (!mapPinsElements[i].matches('.map__pin--main')) {
        mapPinsElements[i].setAttribute('data-index', i - 1);
      }
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      getActivePage();
      renderPins(window.pins.fragmentForPins);
      setDataAttributeForPins();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      getActivePage();
      renderPins(window.pins.fragmentForPins);
      setDataAttributeForPins();
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
    if (roomNumber.value <= capacity.value) {
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

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // Перемещение метки

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
})();
