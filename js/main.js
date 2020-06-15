'use strict';

var NUMBER_AD = 8;
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1200;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MAIN_PIN_X = 62;
var MAIN_PIN_Y = 84;
var PIN_X = 50;
var PIN_Y = 70;

var ads = [];
var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
var controlTimes = ['12.00', '13.00', '14.00'];
var descriptionOffer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet eget risus nec pharetra. Suspendisse ipsum nunc, laoreet ut vehicula quis, pretium vitae nisl. Etiam gravida quam pretium faucibus faucibus. Aenean est ex, egestas non ante vitae, dapibus eleifend purus. Fusce mauris ante, tincidunt nec lacinia at, lobortis quis dolor.';

function getRandomNumber(maxValue, minValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function getAvatars() {
  var avatars = [];
  for (var i = 0; i < NUMBER_AD; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return avatars;
}

function getOfferTitles() {
  var offerTitles = [];
  for (var i = 0; i < NUMBER_AD; i++) {
    offerTitles[i] = 'Lorem Ipsum - ' + (i + 1);
  }
  return offerTitles;
}

function getElements(items, maxValue, minValue) {
  return items[getRandomNumber(maxValue, minValue)];
}

function getOfferFeatures() {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  return getUniqueElements(features, features.length, 0);
}

function getOfferPhotos() {
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  return getUniqueElements(photos, photos.length, 1);
}

function getUniqueElements(items, maxValue, minValue) {
  var elementsCount = getRandomNumber(maxValue, minValue);
  var elements = [];
  for (var i = 0; i < elementsCount; i++) {
    var randomElementNumber = getRandomNumber(items.length - 1, 0);
    elements[i] = items[randomElementNumber];
    items.splice(randomElementNumber, 1);
  }
  return elements;
}

function getAd(ad) {
  ad.location.x = getRandomNumber(MAX_LOCATION_X, MIN_LOCATION_X);
  ad.location.y = getRandomNumber(MAX_LOCATION_Y, MIN_LOCATION_Y);
  ad.offer.title = getElements(getOfferTitles(), getOfferTitles().length - 1, 0);
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.price = getRandomNumber(1000000, 0);
  ad.offer.type = getElements(propertyTypes, propertyTypes.length - 1, 0);
  ad.offer.rooms = getRandomNumber(5, 1);
  ad.offer.guests = getRandomNumber(5, 1);
  ad.offer.checkin = getElements(controlTimes, controlTimes.length - 1, 0);
  ad.offer.checkout = ad.offer.checkin;
  ad.offer.features = getOfferFeatures();
  ad.offer.description = descriptionOffer;
  ad.offer.photos = getOfferPhotos();

  return ad;
}

function getAds(numberAd) {
  var avatars = getAvatars();
  for (var i = 0; i < numberAd; i++) {
    var ad = {
      author: {
        avatar: '',
      },
      offer: {
        title: '',
        address: '',
        price: 0,
        type: '',
        rooms: 0,
        guests: 0,
        checkin: '',
        checkout: '',
        features: '',
        description: '',
        photos: '',
      },
      location: {
        x: '',
        y: '',
      },
    };
    var avatarNumber = getRandomNumber(avatars.length - 1, 0);
    ad.author.avatar = avatars[avatarNumber];
    avatars.splice(avatarNumber, 1);
    var adElement = getAd(ad);
    ads.push(adElement);
  }
  return ads;
}

getAds(NUMBER_AD);

var map = document.querySelector('.map');

function createNewElement() {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_AD; i++) {
    var newElement = template.cloneNode(true);
    newElement.style = 'left: ' + (ads[i].location.x - PIN_X / 2) + 'px; top: ' + (ads[i].location.y - PIN_Y) + 'px;';
    newElement.querySelector('img').src = ads[i].author.avatar;
    newElement.querySelector('img').alt = ads[i].offer.title;
    fragment.appendChild(newElement);
  }
  return fragment;
}

function renderNewElement() {
  var pinsMap = document.querySelector('.map__pins');
  pinsMap.appendChild(createNewElement());
}

// function setCardTitle(template, title) {
//   if (title) {
//     template.querySelector('.popup__title').textContent = title;
//   } else {
//     template.querySelector('.popup__title').classList.add('hidden');
//   }
// }

// function setCardAddress(template, address) {
//   if (address) {
//     template.querySelector('.popup__text--address').textContent = address;
//   } else {
//     template.querySelector('.popup__text--address').classList.add('hidden');
//   }
// }

// function setCardPrice(template, price) {
//   if (price) {
//     template.querySelector('.popup__text--price').textContent = price + '₽/ночь';
//   } else {
//     template.querySelector('.popup__text--price').classList.add('hidden');
//   }
// }

// function setCardType(template, type) {
//   switch (type) {
//     case 'flat':
//       template.querySelector('.popup__type').textContent = 'Квартира';
//       break;
//     case 'bungalo':
//       template.querySelector('.popup__type').textContent = 'Бунгало';
//       break;
//     case 'house':
//       template.querySelector('.popup__type').textContent = 'Дом';
//       break;
//     case 'palace':
//       template.querySelector('.popup__type').textContent = 'Дворец';
//       break;
//     default:
//       template.querySelector('.popup__type').classList.add('hidden');
//   }
// }

// function setCardGuest(template, guestNumber, roomNumber) {
//   if (guestNumber && roomNumber) {
//     template.querySelector('.popup__text--capacity').textContent = roomNumber + ' комнаты для ' + guestNumber + ' гостей';
//   } else {
//     template.querySelector('.popup__text--capacity').classList.add('hidden');
//   }
// }

// function setCardTime(template, checkin, checkout) {
//   if (checkin && checkout) {
//     template.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
//   } else {
//     template.querySelector('.popup__text--time').classList.add('hidden');
//   }
// }

// function setCardFeature(template, features) {
//   if (features) {
//     var featuresItems = template.querySelector('.popup__features').children;
//     for (var i = 0; i < featuresItems.length; i++) {
//       featuresItems[i].classList.add('hidden');
//     }
//     for (var j = 0; j < features.length; j++) {
//       switch (features[j]) {
//         case 'wifi':
//           template.querySelector('.popup__feature--wifi').classList.remove('hidden');
//           break;
//         case 'dishwasher':
//           template.querySelector('.popup__feature--dishwasher').classList.remove('hidden');
//           break;
//         case 'parking':
//           template.querySelector('.popup__feature--parking').classList.remove('hidden');
//           break;
//         case 'washer':
//           template.querySelector('.popup__feature--washer').classList.remove('hidden');
//           break;
//         case 'elevator':
//           template.querySelector('.popup__feature--elevator').classList.remove('hidden');
//           break;
//         case 'conditioner':
//           template.querySelector('.popup__feature--conditioner').classList.remove('hidden');
//           break;
//       }
//     }
//   } else {
//     template.querySelector('.popup__features').classList.add('hidden');
//   }
// }

// function setCardDescription(template, description) {
//   if (description) {
//     template.querySelector('.popup__description').textContent = description;
//   } else {
//     template.querySelector('.popup__description').classList.add('hidden');
//   }
// }

// function setCardPhoto(template, photos) {
//   if (photos) {
//     for (var i = 0; i < photos.length; i++) {
//       var photoTemplate = template.querySelector('.popup__photo');
//       if (i >= 1) {
//         photoTemplate = photoTemplate.cloneNode(true);
//       }
//       var photoBlock = template.querySelector('.popup__photos');
//       photoTemplate.src = photos[i];
//       photoBlock.appendChild(photoTemplate);
//     }
//   } else {
//     template.querySelector('.popup__photos').classList.add('hidden');
//   }
// }

// function setCardAvatar(template, avatar) {
//   if (avatar) {
//     template.querySelector('.popup__avatar').src = avatar;
//   } else {
//     template.querySelector('.popup__avatar').classList.add('hidden');
//   }
// }

// function createNewCard(offer) {
//   var template = document.querySelector('#card').content.querySelector('.map__card');
//   var fragment = document.createDocumentFragment();
//   var newCard = template.cloneNode(true);
//   setCardTitle(newCard, offer.offer.title);
//   setCardAddress(newCard, offer.offer.address);
//   setCardPrice(newCard, offer.offer.price);
//   setCardType(newCard, offer.offer.type);
//   setCardGuest(newCard, offer.offer.guests, offer.offer.rooms);
//   setCardTime(newCard, offer.offer.checkin, offer.offer.checkout);
//   setCardFeature(newCard, offer.offer.features);
//   setCardDescription(newCard, offer.offer.description);
//   setCardPhoto(newCard, offer.offer.photos);
//   setCardAvatar(newCard, offer.author.avatar);
//   fragment.appendChild(newCard);

//   return fragment;
// }

// function renderNewCard(offers) {
//   var newElement = createNewCard(offers[0]);
//   map.insertBefore(newElement, map.querySelector('.map__filters-container'));
// }

// renderNewCard(ads);

var mapFilterBlock = document.querySelector('.map__filters');
var mapFilters = mapFilterBlock.querySelectorAll('.map__filter');
var mapFeature = mapFilterBlock.querySelector('.map__features');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');

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
  renderNewElement();
  setNewAddress();
  setMinPrice();
  setGuestNumber();
}

function setMainPinPosition() {
  var mainPinPositionX = mapPinMain.style.left;
  var mainPinPositionY = mapPinMain.style.top;

  mainPinPositionX = Number(mainPinPositionX.substring(0, mainPinPositionX.length - 2)) + MAIN_PIN_X / 2;
  mainPinPositionY = Number(mainPinPositionY.substring(0, mainPinPositionY.length - 2)) + MAIN_PIN_Y;
  if (map.classList.contains('map--faded')) {
    mainPinPositionY = mainPinPositionY - MAIN_PIN_Y + MAIN_PIN_X / 2;
  }

  var mainPinPositions = [mainPinPositionX, mainPinPositionY];

  return mainPinPositions;
}

function setNewAddress() {
  var newAddressX = setMainPinPosition()[0];
  var newAddressY = setMainPinPosition()[1];
  var addressField = form.querySelector('#address');
  addressField.value = newAddressX + ' , ' + newAddressY;
}

setNewAddress();

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var titleField = form.querySelector('#title');

titleField.addEventListener('invalid', function () {
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity('Заголовок не должен превышать ' + MAX_TITLE_LENGTH + ' символов');
  } else if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Обязательное поле');
  } else {
    titleField.setCustomValidity('');
  }
});

titleField.addEventListener('input', function () {
  var valueLength = titleField.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleField.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleField.setCustomValidity('');
  }
  titleField.reportValidity();
});

var priceField = form.querySelector('#price');
var propertyType = form.querySelector('#type');

function setMinPrice() {
  var MIN_PALACE_PRICE = 10000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_FLAT_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;

  var propertyTypeValue = propertyType.value;
  switch (propertyTypeValue) {
    case 'palace':
      priceField.min = MIN_PALACE_PRICE;
      priceField.placeholder = MIN_PALACE_PRICE;
      break;
    case 'house':
      priceField.min = MIN_HOUSE_PRICE;
      priceField.placeholder = MIN_HOUSE_PRICE;
      break;
    case 'flat':
      priceField.min = MIN_FLAT_PRICE;
      priceField.placeholder = MIN_FLAT_PRICE;
      break;
    default:
      priceField.min = MIN_BUNGALO_PRICE;
      priceField.placeholder = MIN_BUNGALO_PRICE;
      break;
  }
}

propertyType.addEventListener('change', function () {
  setMinPrice();
  priceField.reportValidity();
});

priceField.addEventListener('invalid', function () {
  var maxPrice = priceField.max;
  var minPrice = priceField.min;
  if (priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity('Цена должна быть не меньше ' + minPrice + ' за ночь.');
  } else if (priceField.validity.rangeOverflow) {
    priceField.setCustomValidity('Цена должна быть не больше ' + maxPrice + ' за ночь.');
  } else if (priceField.validity.valueMissing) {
    priceField.setCustomValidity('Обязательное поле');
  } else {
    priceField.setCustomValidity('');
  }
});

priceField.addEventListener('input', function () {
  priceField.reportValidity();
});

var checkin = form.querySelector('#timein');
var checkout = form.querySelector('#timeout');

function setTime(selectedTime, shownTime) {
  switch (selectedTime.value) {
    case '12:00':
      shownTime.value = '12:00';
      break;
    case '13:00':
      shownTime.value = '13:00';
      break;
    case '14:00':
      shownTime.value = '14:00';
      break;
  }
}

checkin.addEventListener('change', function () {
  setTime(checkin, checkout);
});

checkout.addEventListener('change', function () {
  setTime(checkout, checkin);
});
var roomNumber = form.querySelector('#room_number');
var guestNumber = form.querySelector('#capacity');

function setGuestNumber() {
  var guests = guestNumber.children;
  for (var i = 0; i < guests.length; i++) {
    guests[i].disabled = true;
  }
  switch (roomNumber.value) {
    case '1':
      guestNumber.querySelector('option[value = "1"]').disabled = false;
      if (guestNumber.value === '1') {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Максимальное количество гостей - 1');
      }
      break;
    case '2':
      guestNumber.querySelector('option[value = "1"]').disabled = false;
      guestNumber.querySelector('option[value = "2"]').disabled = false;
      if (guestNumber.value === '1' || guestNumber.value === '2') {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Максимальное количество гостей - 2');
      }
      break;
    case '3':
      guestNumber.querySelector('option[value = "1"]').disabled = false;
      guestNumber.querySelector('option[value = "2"]').disabled = false;
      guestNumber.querySelector('option[value = "3"]').disabled = false;
      if (guestNumber.value !== '0') {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Максимальное количество гостей - 3');
      }
      break;
    case '100':
      guestNumber.querySelector('option[value = "0"]').disabled = false;
      if (guestNumber.value === '0') {
        guestNumber.setCustomValidity('');
      } else {
        guestNumber.setCustomValidity('Не для гостей :))');
      }
      break;
  }
  guestNumber.reportValidity();
}

function setRoomValidity() {
  switch (guestNumber.value) {
    case '3':
      if (roomNumber.value === '3') {
        guestNumber.setCustomValidity('');
      }
      break;
    case '2':
      if (roomNumber.value === '3' || roomNumber.value === '2') {
        guestNumber.setCustomValidity('');
      }
      break;
    case '1':
      if (roomNumber.value === '1' || roomNumber.value === '2' || roomNumber.value === '3') {
        guestNumber.setCustomValidity('');
      }
      break;
    case '0':
      if (roomNumber.value === '100') {
        guestNumber.setCustomValidity('');
      }
      break;
  }
  guestNumber.reportValidity();
}

guestNumber.addEventListener('change', function () {
  setRoomValidity();
});

roomNumber.addEventListener('change', function () {
  setRoomValidity();
  setGuestNumber();
});

function removeAllOffers() {
  var offers = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < offers.length; i++) {
    offers[i].remove();
  }
}

form.querySelector('.ad-form__reset').addEventListener('click', function () {
  form.reset();
  makeSiteDisabled();
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  setNewAddress();
  removeAllOffers();
});

form.querySelector('.ad-form__submit').addEventListener('click', function () {
  if (form.invalid) {
    form.submit();
    form.reset();
    makeSiteDisabled();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    setNewAddress();
    removeAllOffers();
  }
});

