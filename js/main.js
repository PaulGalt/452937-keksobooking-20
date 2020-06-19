'use strict';

(function () {

  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1200;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;

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

  function makeSiteDisabled() {
    makeDisabledMap(true);
    makeDisabledForm(true);
    mapPinMain.addEventListener('mousedown', activateSiteOnClick);
    mapPinMain.addEventListener('keydown', activateSiteOnButton);
  }

  makeSiteDisabled();

  function makeSiteEnabled() {
    makeDisabledMap(false);
    makeDisabledForm(false);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    mapPinMain.removeEventListener('mousedown', activateSiteOnClick);
    mapPinMain.removeEventListener('keydown', activateSiteOnButton);

    window.download();
  }

  window.main = {
    MIN_LOCATION_X: MIN_LOCATION_X,
    MAX_LOCATION_X: MAX_LOCATION_X,
    MIN_LOCATION_Y: MIN_LOCATION_Y,
    MAX_LOCATION_Y: MAX_LOCATION_Y,
    map: map,
    mapPinMain: mapPinMain,
    makeDisabledSite: function () {
      makeDisabledMap(true);
      makeDisabledForm(true);
      mapPinMain.addEventListener('mousedown', activateSiteOnClick);
      mapPinMain.addEventListener('keydown', activateSiteOnButton);
    },
  };
})();
