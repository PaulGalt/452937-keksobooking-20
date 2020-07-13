'use strict';

(function () {

  window.filter = {
    propertyType: document.querySelector('#housing-type').value,
  };

  document.querySelector('#housing-type').addEventListener('change', function () {
    window.filter = {
      propertyType: document.querySelector('#housing-type').value,
    };
    window.ajax('GET');
  });
})();
