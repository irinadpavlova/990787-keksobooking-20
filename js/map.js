'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapAdd = document.querySelector('.map__add');

  var removeActivePinClass = function () {
    var pins = map.querySelectorAll('[data-index]');
    [].forEach.call(pins, function (it) {
      if (it.classList.contains('map__pin--active')) {
        it.classList.remove('map__pin--active');
      }
    });
  };

  var findCurrentCard = function (cardIndex) {
    for (var i = 0; i < window.data.cards.length; i++) {
      var tmpCard = window.data.cards[i];
      if (tmpCard.id.toString() === cardIndex) {
        return tmpCard;
      }
    }
    return null;
  };

  var renderTargetCard = function (cardIndex) {
    var currentCard = findCurrentCard(cardIndex);
    var targetCardTmp = mapAdd.appendChild(window.card.createAdvert(currentCard));
    return targetCardTmp;
  };

  var onPopupEscPress = function (evt) {
    var mapCard = map.querySelector('.map__card');
    if (evt.key === 'Escape' && mapCard) {
      evt.preventDefault();
      mapCard.remove();
      removeActivePinClass();
    }
  };

  var openPopup = function (cardIndex, targetPin) {
    renderTargetCard(cardIndex);
    targetPin.classList.add('map__pin--active');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
      removeActivePinClass();

      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onClickMap = function (evt) {
    var targetPin = evt.target.closest('[data-index]');
    var mapCard = map.querySelector('.map__card');
    if (mapCard && targetPin) {
      mapCard.remove();
      removeActivePinClass();
      var cardIndex = targetPin.dataset.index;
      openPopup(cardIndex, targetPin);
    } else if (targetPin) {
      cardIndex = targetPin.dataset.index;
      openPopup(cardIndex, targetPin);
    } else if (evt.target.closest('.popup__close')) {
      closePopup();
      removeActivePinClass();
    }
  };

  var onKeydownMap = function (evt) {
    if ((evt.key === 'Enter') && (evt.target.closest('.popup__close'))) {
      closePopup();
      removeActivePinClass();
    }
  };

  window.map = {
    init: function () {
      map.addEventListener('click', onClickMap);
      map.addEventListener('keydown', onKeydownMap);
    },
    uninit: function () {
      map.removeEventListener('click', onClickMap);
      map.removeEventListener('keydown', onKeydownMap);
    }
  };

})();
