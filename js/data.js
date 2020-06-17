'use strict';

(function () {

  var NUMBER_AD = 8;
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
    ad.location.x = getRandomNumber(window.main.MIN_LOCATION_X, window.main.MAX_LOCATION_X);
    ad.location.y = getRandomNumber(window.main.MIN_LOCATION_Y, window.main.MAX_LOCATION_Y);
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

  window.data = {
    ads: ads,
  };
})();
