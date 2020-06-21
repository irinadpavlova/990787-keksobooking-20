'use strict';

(function () {
  // var map = document.querySelector('.map');
  // var mapAdd = document.querySelector('.map__add');
  // var removeActivePinClass = function () {
  //   var pins = map.querySelectorAll('[data-index]');
  //   for (var i = 0; i < pins.length; i++) {
  //     if (pins[i].classList.contains('map__pin--active')) {
  //       pins[i].classList.remove('map__pin--active');
  //     }
  //   }
  // };
  //
  // var errorHandler = function (errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; text-align: center; width: 500px; height: 80px; padding: 30px; background-color: tomato;';
  //   node.style.position = 'absolute';
  //   node.style.left = '350px';
  //   node.style.top = '400px';
  //   node.style.fontSize = '30px';
  //
  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };
  //
  // var renderTargetCard = function (addObjects) {
  //   var fragmentForCardTmp = document.createDocumentFragment();
  //   fragmentForCardTmp.appendChild(window.card.createAddCard(addObjects));
  //   var targetCardTmp = mapAdd.appendChild(fragmentForCardTmp);
  //   return targetCardTmp;
  // };
  //
  // var onPopupEscPress = function (evt) {
  //   if (evt.key === 'Escape') {
  //     evt.preventDefault();
  //     var mapCard = map.querySelector('.map__card');
  //     mapCard.remove();
  //     removeActivePinClass();
  //   }
  // };
  //
  // var openPopup = function (cardIndex, targetPin) {
  //   window.backend.load(renderTargetCard, errorHandler);
  //
  //   targetPin.classList.add('map__pin--active');
  //
  //   document.addEventListener('keydown', onPopupEscPress);
  // };
  //
  // var closePopup = function () {
  //   var mapCard = map.querySelector('.map__card');
  //   mapCard.remove();
  //   removeActivePinClass();
  //
  //   document.removeEventListener('keydown', onPopupEscPress);
  // };
  //
  // map.addEventListener('click', function (evt) {
  //   var targetPin = evt.target.closest('[data-index]');
  //   var mapCard = map.querySelector('.map__card');
  //   if (mapCard && targetPin) {
  //     mapCard.remove();
  //     removeActivePinClass();
  //     var cardIndex = targetPin.dataset.index;
  //     openPopup(cardIndex, targetPin);
  //   } else if (targetPin) {
  //     cardIndex = targetPin.dataset.index;
  //     openPopup(cardIndex, targetPin);
  //   } else if (evt.target.closest('.popup__close')) {
  //     closePopup();
  //     removeActivePinClass();
  //   }
  // });
  //
  // map.addEventListener('keydown', function (evt) {
  //   if ((evt.key === 'Enter') && (evt.target.closest('.popup__close'))) {
  //     closePopup();
  //     removeActivePinClass();
  //   }
  // });
})();
