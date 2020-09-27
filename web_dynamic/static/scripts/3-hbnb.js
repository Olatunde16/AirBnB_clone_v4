const amenities = {};

$(document).ready(function () {
  $('input').each(function () {
    checkAndAppend(this);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  }, 'json');
  $.ajaxSetup({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
  $.post('http://0.0.0.0:5001/api/v1/places_search/', {}, function (data) {
    for (const place in data) {
      $('section.places').append('<article> <div class="title_box"> <h2></h2> <div class="price_by_night"></div> </div> <div class="information"> <div class="max_guest"></div> <div class="number_rooms"></div> <div class="number_bathrooms"></div> </div> <div class="user"> <b>Owner:</b> </div> <div class="description"></div></article>');

      $('.title_box').val(place.name);
      $('.price_by_night').val(place.price_by_night);

      if (place.max_guest > 1) {
        $('.max_guest').val(`${place.max_guest} Guests`);
      } else {
        $('.max_guest').val(`${place.max_guest} Guest`);
      }

      if (place.number_room > 1) {
        $('.number_room').val(`${place.number_room} Bedrooms`);
      } else {
        $('.number_room').val(`${place.number_room} Bedroom`);
      }

      if (place.number_bathrooms > 1) {
        $('.number_bathrooms').val(`${place.number_bathrooms} Bathrooms`);
      } else {
        $('.number_bathrooms').val(`${place.number_bathrooms} Bathroom`);
      }

      $('.user').append(place.user.first_name, place.user.last_name);
      $('.description').html(place.description);
    }
  }, 'json');
});

function checkAndAppend (inp) {
  $(inp).click(function () {
    if ($(inp).prop('checked')) {
      amenities[$(inp).data('id')] = $(inp).data('name');
      console.log(amenities);
    } else {
      delete amenities[$(inp).data('id')];
    }
    $('div.amenities h4').html(Object.values(amenities).join(', '));
    if (Object.values(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    }
  });
}
