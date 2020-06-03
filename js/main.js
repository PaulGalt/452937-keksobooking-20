'use strict';

var NUMBER_ADS = 8;
var MIN_LOCATION_X = 200;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var ads = [];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var timeArr = ['12.00', '13.00', '14.00'];
var descriptionOffer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet eget risus nec pharetra. Suspendisse ipsum nunc, laoreet ut vehicula quis, pretium vitae nisl. Etiam gravida quam pretium faucibus faucibus. Aenean est ex, egestas non ante vitae, dapibus eleifend purus. Fusce mauris ante, tincidunt nec lacinia at, lobortis quis dolor.';

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAvatarArr(numberAds) {
  var avatarArr = [];
  for (var i = 0; i < numberAds; i++) {
    avatarArr[i] = 'img/avatars/user0' + (i + 1);
  }
  return avatarArr;
}

function getOfferTitleArr() {
  var offerTitleArr = [];
  for (var i = 0; i < NUMBER_ADS; i++) {
    offerTitleArr[i] = 'Lorem Ipsum - ' + (i + 1);
  }
  return offerTitleArr;
}

function getArrowElement(arr, max, min) {
  return arr[getRandomNumber(max, min)];
}

function getOfferFeatures() {
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  return getUniqueElements(featuresArr, featuresArr.length - 1, 0);
}

function getOfferPhotos() {
  var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  return getUniqueElements(photosArr, photosArr.length - 1, 1);
}

function getUniqueElements(arr, maxQty, minQty) {
  var qtyElements = getRandomNumber(maxQty, minQty);
  var elementArr = [];
  for (var i = 0; i < qtyElements; i++) {
    var randomElementNumber = getRandomNumber(arr.length - 1, 0);
    elementArr[i] = arr[randomElementNumber];
    arr.splice(randomElementNumber, 1);
  }
  return elementArr;
}

function getAd(ad) {
  ad.location.x = getRandomNumber(MAX_LOCATION_X, MIN_LOCATION_X);
  ad.location.y = getRandomNumber(MAX_LOCATION_Y, MIN_LOCATION_Y);
  ad.offer.title = getArrowElement(getOfferTitleArr(), getOfferTitleArr().length - 1, 0);
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.price = getRandomNumber(1000000, 0);
  ad.offer.type = getArrowElement(typeArr, typeArr.length - 1, 0);
  ad.offer.rooms = getRandomNumber(5, 1);
  ad.offer.guests = getRandomNumber(5, 1);
  ad.offer.checkin = getArrowElement(timeArr, timeArr.length - 1, 0);
  ad.offer.checkout = ad.offer.checkin;
  ad.offer.features = getOfferFeatures();
  ad.offer.description = descriptionOffer;
  ad.offer.photos = getOfferPhotos();

  return ad;
}

function getAds(numberAds) {
  var avatarArr = getAvatarArr(numberAds);
  for (var i = 0; i < numberAds; i++) {
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
    var avatarNumber = getRandomNumber(avatarArr.length - 1, 0);
    ad.author.avatar = avatarArr[avatarNumber];
    avatarArr.splice(avatarNumber, 1);
    var adElement = getAd(ad);
    ads.push(adElement);
  }
  return ads;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');
