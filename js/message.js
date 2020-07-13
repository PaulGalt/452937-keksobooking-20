'use strict';

(function () {

  window.onSuccess = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment();
    var newMessage = template.cloneNode(true);
    fragment.appendChild(newMessage);
    document.querySelector('main').appendChild(fragment);
    document.querySelector('.success').addEventListener('click', function () {
      document.querySelector('.success').remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        document.querySelector('.success').remove();
      }
    });
  };

  window.onError = function () {
    var template = document.querySelector('#error').content.querySelector('.error');
    var fragment = document.createDocumentFragment();
    var newMessage = template.cloneNode(true);
    fragment.appendChild(newMessage);
    document.querySelector('main').appendChild(fragment);
    document.querySelector('.error').addEventListener('click', function () {
      document.querySelector('.error').remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        document.querySelector('.error').remove();
      }
    });
  };

})();
