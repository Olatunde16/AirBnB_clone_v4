#!/usr/bin/node

$(document).ready(function () {
  const amenityIds = {};

  function updateApiStatus () {
    $.get(`http://${window.location.hostname}:5001/api/v1/status/`, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function updatePlaces () {
    $.ajax({
      type: 'POST',
      url: `http://${window.location.hostname}:5001/api/v1/places_search/`,
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        $('section.places').empty();

        data.forEach(function (place) {
          const article = $('<article></article>');

          const titleBox = $('<div class="title_box"></div>');

          titleBox.append('<h2>' + place.name + '</h2>');
          titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');

          article.append(titleBox);

          const information = $('<div class="information"></div>');

          information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
          information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');

          article.append(information);

          const description = $('<div class="description"></div>');

          description.append(place.description);

          article.append(description);

          $('section.places').append(article);
        });
      }
    });
  }

  updateApiStatus();
  updatePlaces();

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    const amenitiesList = Object.values(amenityIds).join(', ');
    $('.amenities h4').text(amenitiesList);

    updatePlaces();
  });

  $('button').click(function () {
    updatePlaces();
  });
});
