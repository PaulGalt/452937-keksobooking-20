'use strict';

(function () {
  var PIN_X = 50;
  var PIN_Y = 70;
  window.MAX_OFFER = 5;

  function createNewElement(items) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    var maxPin = window.MAX_OFFER;
    if (items.length < maxPin) {
      maxPin = items.length;
    }

    for (var i = 0; i < maxPin; i++) {
      var newElement = template.cloneNode(true);
      newElement.style = 'left: ' + (items[i].location.x - PIN_X / 2) + 'px; top: ' + (items[i].location.y - PIN_Y) + 'px;';
      newElement.querySelector('img').src = items[i].author.avatar;
      newElement.querySelector('img').alt = items[i].offer.title;
      fragment.appendChild(newElement);
    }
    return fragment;
  }

  function renderMap(items) {
    var pinsMap = document.querySelector('.map__pins');
    pinsMap.appendChild(createNewElement(items));
  }

  function removeAllOffers() {
    var offers = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < offers.length; i++) {
      offers[i].remove();
    }
  }

  function removeAllCards() {
    var offers = document.querySelectorAll('.map__card');
    for (var i = 0; i < offers.length; i++) {
      offers[i].remove();
    }
  }

  window.updateMap = function (offers, filter) {
    removeAllOffers();
    removeAllCards();

    if (filter.propertyType === 'any') {
      renderMap(offers);
      window.card.renderCards(offers);
    } else {
      var newOffers = [];
      for (var i = 0; i < offers.length; i++) {
        if (offers[i].offer.type === filter.propertyType) {
          newOffers.push(offers[i]);
        }
      }
      renderMap(newOffers);
      window.card.renderCards(newOffers);
    }
  };
})();
