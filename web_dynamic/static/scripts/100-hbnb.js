const amenitiesDict = {};
const statesDict = {};
const citiesDict = {};

$(document).ready(function () {
  handleStatusChange();

  $('input.checkAmenity').each(function () {
    checkAndAppend(this, amenitiesDict);
  });
  $('input.checkState').each(function () {
    checkAndAppend(this, statesDict);
  });
  $('input.checkCity').each(function () {
    checkAndAppend(this, citiesDict);
  });

  searchPlaces();

  $('button').click(function () {
    searchPlaces({
      states: Object.keys(statesDict),
      cities: Object.keys(citiesDict),
      amenities: Object.keys(amenitiesDict)
    });
  });
});

function handleStatusChange () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  }, 'json');
}

function checkAndAppend (inp, objDictionary) {
  $(inp).click(function () {
    let name;
    let displayDict;

    if ($(inp).prop('checked')) {
      objDictionary[$(inp).data('id')] = $(inp).data('name');
    } else {
      delete objDictionary[$(inp).data('id')];
    }

    if (objDictionary === amenitiesDict) {
      name = 'div.amenities h4';
      displayDict = objDictionary;
    } else {
      name = 'div.locations h4';
      displayDict = Object.assign({}, statesDict, citiesDict);
    }

    $(name).html(Object.values(displayDict).join(', '));

    if (Object.values(displayDict).length === 0) {
      $(name).html('&nbsp;');
    }
  });
}

function searchPlaces (dataDict = {}) {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify(dataDict),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      displayPlaces(data);
    }
  });
}

function displayPlaces (data) {
  $('section.places').empty();
  for (const place of data) {
    $('section.places').append('<article> <div class="title_box"> <h2></h2> <div class="price_by_night"></div> </div> <div class="information"> <div class="max_guest"></div> <div class="number_rooms"></div> <div class="number_bathrooms"></div> </div> <div class="user"></div> <div class="description"></div></article>');

    $('div.title_box h2').last().text(place.name);
    $('.price_by_night').last().text('$' + place.price_by_night);

    if (place.max_guest > 1) {
      $('.max_guest').last().text(`${place.max_guest} Guests`);
    } else {
      $('.max_guest').last().text(`${place.max_guest} Guest`);
    }

    if (place.number_rooms > 1) {
      $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
    } else {
      $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
    }

    if (place.number_bathrooms > 1) {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
    } else {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathroom`);
    }

    $('.description').last().html(place.description);
  }
}
