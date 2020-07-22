'use strict';

(function () {
  var PIN_X = 50;
  var PIN_Y = 70;
  var CHEAP_PRICE = 10000;
  var EXPENSIV_PRICE = 50000;
  var RoomFilterValues = [1, 2, 3];
  var GuestFilterValues = [0, 1, 2];
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

  function checkPropertyType(offers, filter) {
    var newTempOffers = [];
    if (filter.propertyType === 'any') {
      newTempOffers = offers;
    } else {
      for (var i = 0; i < offers.length; i++) {
        if (offers[i].offer.type === filter.propertyType) {
          newTempOffers.push(offers[i]);
        }
      }
    }
    return newTempOffers;
  }

  function checkPropertyPrice(offers, filter) {
    if (filter.propertyPrice !== 'any') {
      var newTempOffers = [];

      for (var i = 0; i < offers.length; i++) {
        switch (filter.propertyPrice) {
          case 'low':
            if (offers[i].offer.price < CHEAP_PRICE) {
              newTempOffers.push(offers[i]);
            }
            break;
          case 'high':
            if (offers[i].offer.price > EXPENSIV_PRICE) {
              newTempOffers.push(offers[i]);
            }
            break;
          case 'middle':
            if (offers[i].offer.price >= CHEAP_PRICE && offers[i].offer.price <= EXPENSIV_PRICE) {
              newTempOffers.push(offers[i]);
            }
            break;
        }
      }
    } else {
      newTempOffers = offers;
    }
    return newTempOffers;
  }

  function checkPropertyRooms(offers, filter) {
    if (filter.propertyRooms !== 'any') {
      var newTempOffers = [];

      for (var i = 0; i < offers.length; i++) {
        switch (+filter.propertyRooms) {
          case RoomFilterValues[0]:
            if (offers[i].offer.rooms === RoomFilterValues[0]) {
              newTempOffers.push(offers[i]);
            }
            break;
          case RoomFilterValues[1]:
            if (offers[i].offer.rooms === RoomFilterValues[1]) {
              newTempOffers.push(offers[i]);
            }
            break;
          case RoomFilterValues[2]:
            if (offers[i].offer.rooms === RoomFilterValues[2]) {
              newTempOffers.push(offers[i]);
            }
            break;
        }
      }
    } else {
      newTempOffers = offers;
    }
    return newTempOffers;
  }

  function checkPropertyGuests(offers, filter) {
    if (filter.propertyGuests !== 'any') {
      var newTempOffers = [];

      for (var i = 0; i < offers.length; i++) {
        switch (offers[i].offer.guests) {
          case GuestFilterValues[1]:
            if (+filter.propertyGuests === GuestFilterValues[1]) {
              newTempOffers.push(offers[i]);
            }
            break;
          case GuestFilterValues[2]:
            if (+filter.propertyGuests === GuestFilterValues[2]) {
              newTempOffers.push(offers[i]);
            }
            break;
          default:
            if (+filter.propertyGuests === GuestFilterValues[0]) {
              newTempOffers.push(offers[i]);
            }
            break;
        }
      }
    } else {
      newTempOffers = offers;
    }
    return newTempOffers;
  }

  function checkFeatures(offers, type) {
    var newTempOffers = [];
    for (var i = 0; i < offers.length; i++) {
      for (var j = 0; j < offers[i].offer.features.length; j++) {
        if (offers[i].offer.features[j] === type) {
          newTempOffers.push(offers[i]);
        }
      }
    }
    return newTempOffers;
  }

  window.updateMap = function (offers, filter) {
    removeAllOffers();
    removeAllCards();
    var newOffers = [];

    newOffers = checkPropertyType(offers, filter);
    newOffers = checkPropertyPrice(newOffers, filter);
    newOffers = checkPropertyRooms(newOffers, filter);
    newOffers = checkPropertyGuests(newOffers, filter);

    if (filter.propertyFeatures.wifi === 'On') {
      newOffers = checkFeatures(newOffers, 'wifi');
    }

    if (filter.propertyFeatures.dishwasher === 'On') {
      newOffers = checkFeatures(newOffers, 'dishwasher');
    }

    if (filter.propertyFeatures.parking === 'On') {
      newOffers = checkFeatures(newOffers, 'parking');
    }

    if (filter.propertyFeatures.washer === 'On') {
      newOffers = checkFeatures(newOffers, 'washer');
    }

    if (filter.propertyFeatures.elevator === 'On') {
      newOffers = checkFeatures(newOffers, 'elevator');
    }

    if (filter.propertyFeatures.conditioner === 'On') {
      newOffers = checkFeatures(newOffers, 'conditioner');
    }

    renderMap(newOffers);
    window.card.renderCards(newOffers);
  };

})();
