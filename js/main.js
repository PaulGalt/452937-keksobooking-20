'use strict';

var NUMBER_ADS = 8;
var MIN_LOCATION_X = 200;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var ads = [];

var offerTypeArr = ['palace', 'flat', 'house', 'bungalo'];
var timeArr = ['12.00', '13.00', '14.00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptionOffer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet eget risus nec pharetra. Suspendisse ipsum nunc, laoreet ut vehicula quis, pretium vitae nisl. Etiam gravida quam pretium faucibus faucibus. Aenean est ex, egestas non ante vitae, dapibus eleifend purus. Fusce mauris ante, tincidunt nec lacinia at, lobortis quis dolor.';
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


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

function getOfferTitle() {
  return getOfferTitleArr()[getRandomNumber(getOfferTitleArr().length - 1, 0)];
}

function getOfferType() {
  return offerTypeArr[getRandomNumber(3, 0)];
}

function getOfferPrice() {
  return (getRandomNumber(1000000, 0));
}

function getOfferRooms() {
  return getRandomNumber(5, 1);
}

function getOfferGuest() {
  return getRandomNumber(5, 1);
}

function getOfferTime() {
  return timeArr[getRandomNumber(2, 0)];
}

function getOfferFeatures() {
  return getUniqueElements(featuresArr, 5, 0);
}

function getOfferPhotos() {
  return getUniqueElements(photosArr, 3, 1);
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
  ad.offer.title = getOfferTitle();
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.price = getOfferPrice();
  ad.offer.type = getOfferType();
  ad.offer.rooms = getOfferRooms();
  ad.offer.guests = getOfferGuest();
  ad.offer.checkin = getOfferTime();
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

getAds(NUMBER_ADS);


console.log(ads);

