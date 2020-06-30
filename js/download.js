'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.download = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      window.updateMap(xhr.response, window.filter);
    });

    xhr.open('GET', URL);
    xhr.send();
  };

})();
