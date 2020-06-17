'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MIN_PALACE_PRICE = 10000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_FLAT_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;
  var titleField = document.querySelector('#title');

  function setNewAddress() {
    var newAddressX = window.map.setMainPinPosition()[0];
    var newAddressY = window.map.setMainPinPosition()[1];
    var addressField = document.querySelector('#address');
    addressField.value = newAddressX + ' , ' + newAddressY;
  }

  setNewAddress();

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
  });

  var priceField = document.querySelector('#price');
  var propertyType = document.querySelector('#type');

  function setMinPrice() {

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

  var checkin = document.querySelector('#timein');
  var checkout = document.querySelector('#timeout');

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
  var roomNumber = document.querySelector('#room_number');
  var guestNumber = document.querySelector('#capacity');

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

  document.querySelector('.ad-form__reset').addEventListener('click', function () {
    document.querySelector('.ad-form').reset();
    window.main.makeDisabledSite();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    setNewAddress();
    removeAllOffers();
  });

  document.querySelector('.ad-form__submit').addEventListener('click', function () {
    if (document.querySelector('.ad-form').invalid) {
      document.querySelector('.ad-form').submit();
      document.querySelector('.ad-form').reset();
      window.main.makeDisabledSite();
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      setNewAddress();
      removeAllOffers();
    }
  });
})();
