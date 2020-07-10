'use strict';

(function () {
  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1200;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  window.MAIN_PIN_X = 62;
  window.MAIN_PIN_Y = 84;
  var mapTail = 22;
  window.startMainPinPositionX = window.main.mapPinMain.offsetLeft;
  window.startMainPinPositionY = window.main.mapPinMain.offsetTop;

  window.main.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var nextX = window.main.mapPinMain.offsetLeft - shift.x + window.main.mapPinMain.offsetWidth / 2;
      var nextY = window.main.mapPinMain.offsetTop - shift.y + window.main.mapPinMain.offsetHeight + mapTail;

      if (nextX > MIN_LOCATION_X && nextX < MAX_LOCATION_X) {
        window.main.mapPinMain.style.left = (window.main.mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if (nextY > MIN_LOCATION_Y && nextY < MAX_LOCATION_Y) {
        window.main.mapPinMain.style.top = (window.main.mapPinMain.offsetTop - shift.y) + 'px';
      }

      var positionX = window.main.mapPinMain.offsetLeft;
      var positionY = window.main.mapPinMain.offsetTop;

      window.setNewAddress(positionX, positionY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
