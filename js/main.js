'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilterBlock = document.querySelector('.map__filters');
  var mapFilters = mapFilterBlock.querySelectorAll('.map__filter');
  var mapFeature = mapFilterBlock.querySelector('.map__features');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');

  function makeDisabledMap(value) {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = value;
    }
    mapFeature.disabled = value;
  }

  function makeDisabledForm(value) {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = value;
    }
  }

  function activateSiteOnClick(evt) {
    if (evt.button === 0) {
      makeSiteEnabled();
    }
  }

  function activateSiteOnButton(evt) {
    if (evt.key === 'Enter') {
      makeSiteEnabled();
    }
  }

  function makeSiteEnabled() {
    makeDisabledMap(false);
    makeDisabledForm(false);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    mapPinMain.removeEventListener('mousedown', activateSiteOnClick);
    mapPinMain.removeEventListener('keydown', activateSiteOnButton);
    window.ajax('GET');
    window.setNewAddress(window.startMainPinPositionX, window.startMainPinPositionY);
  }

  window.main = {
    map: map,
    mapPinMain: mapPinMain,
    makeDisabledSite: function () {
      makeDisabledMap(true);
      makeDisabledForm(true);
      mapPinMain.addEventListener('mousedown', activateSiteOnClick);
      mapPinMain.addEventListener('keydown', activateSiteOnButton);
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      document.querySelector('.map__pin--main').style.left = window.startMainPinPositionX + 'px';
      document.querySelector('.map__pin--main').style.top = window.startMainPinPositionY + 'px';
    },
  };

  window.main.makeDisabledSite();
})();
