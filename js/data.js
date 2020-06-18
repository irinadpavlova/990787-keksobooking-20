'use strict';

(function () {
  var MASS_LENGTH = 8;
  var AVATARS_SRC = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLES = ['Уютное гнездышко для молодоженов', 'Роскошные аппартаменты', 'Просто и со вкусом', 'Любимое местечко', 'В самом центе Токио', 'Лучший вид из окна', 'Антикризисное предложение', 'Такого больше не найдете'];
  var HOME_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_ADDRESS_X = 0;
  var MAX_ADDRESS_X = 1200;
  var MIN_ADDRESS_Y = 0;
  var MAX_ADDRESS_Y = 750;
  var PRICES = [500, 800, 900, 1000, 2000, 3000, 4000, 5000];
  var ROOMS = [1, 2, 3];
  var GUESTS = [1, 2, 3, 4, 5];
  var DESCRIPTIONS = ['Великолепная квартира-студия в центре Токио.', 'Подходит как туристам, так и бизнесменам.', 'Квартира полностью укомплектована и недавно отремонтирована.', 'Удобное расположение квартиры позволит Вам насладиться отдыхом в полной мере.', 'Вас порадуют просторные комнаты и шикарный вид из окна.', 'Остановившись у нас однажды Вы не сможете выбрать другую квартиру.', 'У нас Вы найдете максимум уюта и комфорта.', 'Роскошные интерьеры нашей квартиры не оставят Вас равнодушными.'];
  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1125;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var OFFSET_X = 25;
  var OFFSET_Y = 70;

  window.data = {
    massLength: MASS_LENGTH,
    avatarsSrc: AVATARS_SRC,
    titles: TITLES,
    homeTypes: HOME_TYPES,
    checkin: CHECKIN,
    features: FEATURES,
    photos: PHOTOS,
    minAddressX: MIN_ADDRESS_X,
    maxAddressX: MAX_ADDRESS_X,
    minAddressY: MIN_ADDRESS_Y,
    maxAddressY: MAX_ADDRESS_Y,
    prices: PRICES,
    rooms: ROOMS,
    guests: GUESTS,
    descriptions: DESCRIPTIONS,
    minLocationX: MIN_LOCATION_X,
    maxLocationX: MAX_LOCATION_X,
    minLocationY: MIN_LOCATION_Y,
    maxLocationY: MAX_LOCATION_Y,
    offsetX: OFFSET_X,
    offsetY: OFFSET_Y
  };
})();
