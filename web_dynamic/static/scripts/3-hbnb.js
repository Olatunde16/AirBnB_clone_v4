/* global $ */
$(document).ready(function () {
  const amenities = {};

  function updateAmenities () {
    const amenityList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenityList);
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    updateAmenities();
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

$(document).ready(function () {
  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (const place of data) {
        const article = $('<article></article>');

        const titleBox = $('<div class="title_box"></div>');
        titleBox.append($('<h2></h2>').text(place.name));
        titleBox.append($('<div class="price_by_night"></div>').text('$' + place.price_by_night));
        article.append(titleBox);

        const information = $('<div class="information"></div>');
        information.append($('<div class="max_guest"></div>').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
        information.append($('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
        information.append($('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
        article.append(information);

        article.append($('<div class="description"></div>').text(place.description));

        $('.places').append(article);
      }
    }
  });
});
