'use strict';

(function () {
  var MAIN_PIN_X = 62;
  var MAIN_PIN_Y = 84;
  var PIN_X = 50;
  var PIN_Y = 70;

  function createNewElement() {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.ads.length; i++) {
      var newElement = template.cloneNode(true);
      newElement.style = 'left: ' + (window.data.ads[i].location.x - PIN_X / 2) + 'px; top: ' + (window.data.ads[i].location.y - PIN_Y) + 'px;';
      newElement.querySelector('img').src = window.data.ads[i].author.avatar;
      newElement.querySelector('img').alt = window.data.ads[i].offer.title;
      fragment.appendChild(newElement);
    }
    return fragment;
  }

  window.map = {
    setMainPinPosition: function () {
      var mainPinPositionX = window.main.mapPinMain.style.left;
      var mainPinPositionY = window.main.mapPinMain.style.top;

      mainPinPositionX = Number(mainPinPositionX.substring(0, mainPinPositionX.length - 2)) + MAIN_PIN_X / 2;
      mainPinPositionY = Number(mainPinPositionY.substring(0, mainPinPositionY.length - 2)) + MAIN_PIN_Y;
      if (window.main.map.classList.contains('map--faded')) {
        mainPinPositionY = mainPinPositionY - MAIN_PIN_Y + MAIN_PIN_X / 2;
      }

      var mainPinPositions = [mainPinPositionX, mainPinPositionY];

      return mainPinPositions;
    },
    renderMap: function () {
      var pinsMap = document.querySelector('.map__pins');
      pinsMap.appendChild(createNewElement());
    }
  };

})();
