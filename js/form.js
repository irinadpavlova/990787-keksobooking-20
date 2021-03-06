'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
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
        [].forEach.call(capacity.children, function (it) {
          it.disabled = true;
        });
        capacity.children[capacity.children.length - 1].disabled = false;
        capacity.children[capacity.children.length - 1].selected = true;
        break;
      case '3':
        [].forEach.call(capacity.children, function (it) {
          it.disabled = false;
        });
        capacity.children[capacity.children.length - 1].disabled = true;
        capacity.children[capacity.children.length - 4].selected = true;
        break;
      case '2':
        [].forEach.call(capacity.children, function (it) {
          it.disabled = true;
        });
        capacity.children[capacity.children.length - 3].disabled = false;
        capacity.children[capacity.children.length - 2].disabled = false;
        capacity.children[capacity.children.length - 3].selected = true;
        break;
      case '1':
        [].forEach.call(capacity.children, function (it) {
          it.disabled = true;
        });
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

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    window.avatar.resetImage();
    window.room.resetImage();
    adForm.reset();
    window.main.getDisabledPage();
  });

  resetButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.avatar.resetImage();
      window.room.resetImage();
      adForm.reset();
      window.main.getDisabledPage();
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
      closeSuccessPopup();
    }
  };

  var onOutsideOfSuccessPopupClick = function (evt) {
    var successPopup = document.querySelector('.success');
    var targetMessage = evt.target.closest('.success__message');
    if (!targetMessage) {
      successPopup.remove();
      closeSuccessPopup();
    }
  };

  var openSuccessPopup = function () {
    renderSuccessPopup();

    document.addEventListener('click', onOutsideOfSuccessPopupClick);

    document.addEventListener('keydown', onSuccessPopupEscPress);
  };

  var closeSuccessPopup = function () {
    document.removeEventListener('click', onOutsideOfSuccessPopupClick);

    document.removeEventListener('keydown', onSuccessPopupEscPress);
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
      closeErrorPopup();
    }
  };

  var onOutsideOfErrorPopupClick = function (evt) {
    var errorPopup = document.querySelector('.error');
    var targetMessage = evt.target.closest('.error__message');
    if (!targetMessage) {
      errorPopup.remove();
      closeErrorPopup();
    }
  };

  var openErrorPopup = function () {
    renderErrorPopup();

    document.addEventListener('click', onOutsideOfErrorPopupClick);

    document.addEventListener('keydown', onErrorPopupEscPress);
  };

  var closeErrorPopup = function () {
    document.removeEventListener('click', onOutsideOfErrorPopupClick);

    document.removeEventListener('keydown', onErrorPopupEscPress);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      adForm.reset();
      window.data.cards = [];
      window.main.getDisabledPage();
      openSuccessPopup();
    }, function () {
      openErrorPopup();
    });
    evt.preventDefault();
  });
})();
