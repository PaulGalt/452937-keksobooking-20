'use strict';

(function () {

  window.ajax = function (type, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (type === 'GET') {
      var url = 'https://javascript.pages.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        window.updateMap(xhr.response, window.filter);
      });
    }

    if (type === 'POST') {
      url = 'https://javascript.pages.academy/keksobooking';

      xhr.addEventListener('load', function () {
        if (xhr.statusText === 'OK') {
          window.onSuccess();
        } else {
          window.onError();
        }
      });
    }

    xhr.open(type, url);
    xhr.send(data);
  };

})();
