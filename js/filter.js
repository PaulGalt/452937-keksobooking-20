'use strict';

(function () {
  function checkFeatures(type) {
    var features = document.querySelectorAll('#housing-features input');

    for (var i = 0; i < features.length; i++) {
      if (features[i].value === type) {
        if (features[i].checked) {
          type = 'On';
        } else {
          type = 'Off';
        }
      }
    }
    return type;
  }

  function getFilterValue() {
    window.filter = {
      propertyType: document.querySelector('#housing-type').value,
      propertyPrice: document.querySelector('#housing-price').value,
      propertyRooms: document.querySelector('#housing-rooms').value,
      propertyGuests: document.querySelector('#housing-guests').value,
      propertyFeatures: {
        wifi: checkFeatures('wifi'),
        dishwasher: checkFeatures('dishwasher'),
        parking: checkFeatures('parking'),
        washer: checkFeatures('washer'),
        elevator: checkFeatures('elevator'),
        conditioner: checkFeatures('conditioner')
      }
    };
  }

  getFilterValue();

  document.querySelector('#housing-type').addEventListener('change', function () {
    window.filter.propertyType = document.querySelector('#housing-type').value;
    window.debounce(window.ajax('GET'));
  });

  document.querySelector('#housing-price').addEventListener('change', function () {
    window.filter.propertyPrice = document.querySelector('#housing-price').value;
    window.debounce(window.ajax('GET'));
  });

  document.querySelector('#housing-rooms').addEventListener('change', function () {
    window.filter.propertyRooms = document.querySelector('#housing-rooms').value;
    window.debounce(window.ajax('GET'));
  });

  document.querySelector('#housing-guests').addEventListener('change', function () {
    window.filter.propertyGuests = document.querySelector('#housing-guests').value;
    window.debounce(window.ajax('GET'));
  });

  document.querySelector('#housing-features').addEventListener('change', function () {
    getFilterValue();
    window.debounce(window.ajax('GET'));
  });
})();
