'use strict';

(function () {
  // открытие соответствующей карточки с объявлением

  var map = document.querySelector('.map');
  var mapAdd = document.querySelector('.map__add');

  var removeActivePinClass = function () {
    var pins = map.querySelectorAll('[data-index]');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].classList.contains('map__pin--active')) {
        pins[i].classList.remove('map__pin--active');
      }
    }
  };

  var renderTargetCard = function (cardIndex) {
    var fragmentForCardTmp = document.createDocumentFragment();
    for (var i = 0; i < window.data.cards.length; i++) {
      var currentCard = window.data.cards[i];
      if (currentCard.id.toString() === cardIndex) {
        fragmentForCardTmp.appendChild(window.card.createAddCard(currentCard));
        var targetCardTmp = mapAdd.appendChild(fragmentForCardTmp);
      }
    }
    return targetCardTmp;
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var mapCard = map.querySelector('.map__card');
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
    mapCard.remove();
    removeActivePinClass();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.map = {
    init: function () {
      map.addEventListener('click', function (evt) {

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
      });
      map.addEventListener('keydown', function (evt) {
        if ((evt.key === 'Enter') && (evt.target.closest('.popup__close'))) {
          closePopup();
          removeActivePinClass();
        }
      });
    }
  };
})();
