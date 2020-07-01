'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileInput = document.querySelector('#images');
  var roomPhotoContainer = document.querySelector('.ad-form__photo');

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      roomPhotoContainer.insertAdjacentHTML('beforeend', '<img src="" class="room-photo" alt="Фотография жилья">');
      var roomPhoto = roomPhotoContainer.querySelector('.room-photo');

      reader.addEventListener('load', function () {
        roomPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  window.room = {
    resetImage: function () {
      var roomImage = roomPhotoContainer.querySelector('.room-photo');
      roomImage.remove();
    }
  };

})();
