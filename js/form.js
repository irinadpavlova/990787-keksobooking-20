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
  var MASS_LENGTH = 8;

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

  var successHandler = function (objectsArray) {
    var fragmentForPinsTmp = document.createDocumentFragment();
    for (var i = 0; i < MASS_LENGTH; i++) {
      fragmentForPinsTmp.appendChild(window.pins.createPin(objectsArray[i]));
    }
    mapPins.appendChild(fragmentForPinsTmp);
    var mapPinsElements = document.querySelectorAll('.map__pin');
    for (var j = 0; j <= MASS_LENGTH; j++) {
      if (!mapPinsElements[j].matches('.map__pin--main')) {
        mapPinsElements[j].setAttribute('data-index', j - 1);
      }
    }
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
    address.value = getAddressValueFromPin(MAIN_PIN_START_X, MAIN_PIN_WIDTH, MAIN_PIN_START_Y, MAIN_PIN_WIDTH);
    var mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPinsElements) {
      for (var k = 0; k < mapPinsElements.length; k++) {
        mapPinsElements[k].remove();
      }
    }
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

  // var setDataAttributeForPins = function () {
  //   var mapPinsElements = document.querySelectorAll('.map__pin');
  //   for (var i = 0; i <= MASS_LENGTH; i++) {
  //     if (!mapPinsElements[i].matches('.map__pin--main')) {
  //       mapPinsElements[i].setAttribute('data-index', i - 1);
  //     }
  //   }
  // };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      getActivePage();
      window.backend.load(successHandler, errorHandler);
      // setDataAttributeForPins();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      getActivePage();
      window.backend.load(successHandler, errorHandler);
      // setDataAttributeForPins();
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

  // Отправка формы, сообщения

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    adForm.reset();
    getDisabledPage();
  });

  resetButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      adForm.reset();
      getDisabledPage();
    }
  });

  var renderSuccessPopup = function () {
    var mainContent = document.querySelector('main');
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

    var successMessage = successMessageTemplate.cloneNode(true);
    mainContent.appendChild(successMessage);
  };

  var onSuccessPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var popup = document.querySelector('.success');
      popup.remove();
    }
  };

  var onOutsideOfSuccessPopupClick = function (evt) {
    var successPopup = document.querySelector('.success');
    var targetMessage = evt.target.closest('.success__message');
    if (!targetMessage) {
      successPopup.remove();
    }
  };

  var openSuccessPopup = function () {
    renderSuccessPopup();

    document.addEventListener('click', onOutsideOfSuccessPopupClick);

    document.addEventListener('keydown', onSuccessPopupEscPress);
  };

  var closeSuccessPopup = function () {
    var successPopup = document.querySelector('.success');
    if (!successPopup) {
      document.removeEventListener('click', onOutsideOfSuccessPopupClick);

      document.removeEventListener('keydown', onSuccessPopupEscPress);
    }
  };

  var renderErrorPopup = function () {
    var mainContent = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

    var errorMessage = errorMessageTemplate.cloneNode(true);
    mainContent.appendChild(errorMessage);
  };

  var onErrorPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var popup = document.querySelector('.error');
      popup.remove();
    }
  };

  var onOutsideOfErrorPopupClick = function (evt) {
    var errorPopup = document.querySelector('.error');
    var targetMessage = evt.target.closest('.error__message');
    if (!targetMessage) {
      errorPopup.remove();
    }
  };

  var openErrorPopup = function () {
    renderErrorPopup();

    document.addEventListener('click', onOutsideOfErrorPopupClick);

    document.addEventListener('keydown', onErrorPopupEscPress);
  };

  var closeErrorPopup = function () {
    var errorPopup = document.querySelector('.error');
    if (!errorPopup) {
      document.removeEventListener('click', onOutsideOfErrorPopupClick);

      document.removeEventListener('keydown', onErrorPopupEscPress);
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      adForm.reset();
      getDisabledPage();
      openSuccessPopup();
      closeSuccessPopup();
    }, function () {
      openErrorPopup();
      closeErrorPopup();
    });
    evt.preventDefault();
  });
})();
