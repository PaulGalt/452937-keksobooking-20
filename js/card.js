'use strict';

(function () {
  function setCardTitle(template, title) {
    if (title) {
      template.querySelector('.popup__title').textContent = title;
    } else {
      template.querySelector('.popup__title').classList.add('hidden');
    }
  }

  function setCardAddress(template, address) {
    if (address) {
      template.querySelector('.popup__text--address').textContent = address;
    } else {
      template.querySelector('.popup__text--address').classList.add('hidden');
    }
  }

  function setCardPrice(template, price) {
    if (price) {
      template.querySelector('.popup__text--price').textContent = price + '₽/ночь';
    } else {
      template.querySelector('.popup__text--price').classList.add('hidden');
    }
  }

  function setCardType(template, type) {
    switch (type) {
      case 'flat':
        template.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        template.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        template.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        template.querySelector('.popup__type').textContent = 'Дворец';
        break;
      default:
        template.querySelector('.popup__type').classList.add('hidden');
    }
  }

  function setCardGuest(template, guestNumber, roomNumber) {
    if (guestNumber && roomNumber) {
      template.querySelector('.popup__text--capacity').textContent = roomNumber + ' комнаты для ' + guestNumber + ' гостей';
    } else {
      template.querySelector('.popup__text--capacity').classList.add('hidden');
    }
  }

  function setCardTime(template, checkin, checkout) {
    if (checkin && checkout) {
      template.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
    } else {
      template.querySelector('.popup__text--time').classList.add('hidden');
    }
  }

  function setCardFeature(template, features) {
    if (features) {
      var featuresItems = template.querySelector('.popup__features').children;
      for (var i = 0; i < featuresItems.length; i++) {
        featuresItems[i].classList.add('hidden');
      }
      for (var j = 0; j < features.length; j++) {
        switch (features[j]) {
          case 'wifi':
            template.querySelector('.popup__feature--wifi').classList.remove('hidden');
            break;
          case 'dishwasher':
            template.querySelector('.popup__feature--dishwasher').classList.remove('hidden');
            break;
          case 'parking':
            template.querySelector('.popup__feature--parking').classList.remove('hidden');
            break;
          case 'washer':
            template.querySelector('.popup__feature--washer').classList.remove('hidden');
            break;
          case 'elevator':
            template.querySelector('.popup__feature--elevator').classList.remove('hidden');
            break;
          case 'conditioner':
            template.querySelector('.popup__feature--conditioner').classList.remove('hidden');
            break;
        }
      }
    } else {
      template.querySelector('.popup__features').classList.add('hidden');
    }
  }

  function setCardDescription(template, description) {
    if (description) {
      template.querySelector('.popup__description').textContent = description;
    } else {
      template.querySelector('.popup__description').classList.add('hidden');
    }
  }

  function setCardPhoto(template, photos) {
    if (photos) {
      for (var i = 0; i < photos.length; i++) {
        var photoTemplate = template.querySelector('.popup__photo');
        if (i >= 1) {
          photoTemplate = photoTemplate.cloneNode(true);
        }
        var photoBlock = template.querySelector('.popup__photos');
        photoTemplate.src = photos[i];
        photoBlock.appendChild(photoTemplate);
      }
    } else {
      template.querySelector('.popup__photos').classList.add('hidden');
    }
  }

  function setCardAvatar(template, avatar) {
    if (avatar) {
      template.querySelector('.popup__avatar').src = avatar;
    } else {
      template.querySelector('.popup__avatar').classList.add('hidden');
    }
  }

  function createNewCard(offer) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var newCard = template.cloneNode(true);
    setCardTitle(newCard, offer.offer.title);
    setCardAddress(newCard, offer.offer.address);
    setCardPrice(newCard, offer.offer.price);
    setCardType(newCard, offer.offer.type);
    setCardGuest(newCard, offer.offer.guests, offer.offer.rooms);
    setCardTime(newCard, offer.offer.checkin, offer.offer.checkout);
    setCardFeature(newCard, offer.offer.features);
    setCardDescription(newCard, offer.offer.description);
    setCardPhoto(newCard, offer.offer.photos);
    setCardAvatar(newCard, offer.author.avatar);
    fragment.appendChild(newCard);

    return fragment;
  }

  function renderNewCard(offers) {
    var newElement = createNewCard(offers[0]);
    window.main.map.insertBefore(newElement, window.main.map.querySelector('.map__filters-container'));
  }

  renderNewCard(window.data.ads);

})();
