'use strict';

(function () {
  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1200;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  window.MAIN_PIN_X = 62;
  window.MAIN_PIN_Y = 84;
  window.startMainPinPositionX = Number(window.main.mapPinMain.style.left.substring(0, window.main.mapPinMain.style.left.length - 2));
  window.startMainPinPositionY = Number(window.main.mapPinMain.style.top.substring(0, window.main.mapPinMain.style.top.length - 2));

  window.main.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if ((window.main.mapPinMain.offsetLeft) < (MIN_LOCATION_X - window.MAIN_PIN_X / 2)) {
        var shift = {
          x: MIN_LOCATION_X - window.MAIN_PIN_X / 2,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: startCoords.x,
          y: moveEvt.clientY
        };

        var positionX = MIN_LOCATION_X - window.MAIN_PIN_X / 2;
        var positionY = window.main.mapPinMain.offsetTop - shift.y;
        window.main.mapPinMain.style.left = positionX + 'px';
        window.main.mapPinMain.style.top = positionY + 'px';

      } else if ((window.main.mapPinMain.offsetTop) < (MIN_LOCATION_Y - window.MAIN_PIN_Y)) {
        shift = {
          x: startCoords.x - moveEvt.clientX,
          y: MIN_LOCATION_Y - window.MAIN_PIN_Y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: startCoords.y
        };

        positionX = window.main.mapPinMain.offsetLeft - shift.x;
        positionY = MIN_LOCATION_Y - window.MAIN_PIN_Y;
        window.main.mapPinMain.style.left = positionX + 'px';
        window.main.mapPinMain.style.top = positionY + 'px';

      } else if ((window.main.mapPinMain.offsetLeft) > (MAX_LOCATION_X - window.MAIN_PIN_X / 2)) {
        shift = {
          x: MAX_LOCATION_X - window.MAIN_PIN_X / 2,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: startCoords.x,
          y: moveEvt.clientY
        };

        positionX = MAX_LOCATION_X - window.MAIN_PIN_X / 2;
        positionY = window.main.mapPinMain.offsetTop - shift.y;
        window.main.mapPinMain.style.left = positionX + 'px';
        window.main.mapPinMain.style.top = positionY + 'px';

      } else if ((window.main.mapPinMain.offsetTop) > (MAX_LOCATION_Y - window.MAIN_PIN_Y)) {
        shift = {
          x: startCoords.x - moveEvt.clientX,
          y: MAX_LOCATION_Y - window.MAIN_PIN_Y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: startCoords.y
        };

        positionX = window.main.mapPinMain.offsetLeft - shift.x;
        positionY = MAX_LOCATION_Y - window.MAIN_PIN_Y;
        window.main.mapPinMain.style.left = positionX + 'px';
        window.main.mapPinMain.style.top = positionY + 'px';

      } else {
        shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        positionX = window.main.mapPinMain.offsetLeft - shift.x;
        positionY = window.main.mapPinMain.offsetTop - shift.y;

        window.main.mapPinMain.style.top = positionY + 'px';
        window.main.mapPinMain.style.left = positionX + 'px';

      }
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
