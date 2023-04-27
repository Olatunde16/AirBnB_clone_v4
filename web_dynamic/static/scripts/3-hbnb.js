#!/usr/bin/node

$(document).ready(function () {
  $.ajax(
    {
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (data) {
        console.log('API CHECK');
        if (data.status === 'OK') {
          console.log('available');
          $('#api_status').toggleClass('unavailable available');
        }
      }
    }
  );

  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    success: function (resultPlaces) {
      console.log(resultPlaces);
      for (const place of resultPlaces) {
        $('.places').append(
                    `<article>\
                      <div class="title_box">\
                        <h2>${place.name}</h2>\
                        <div class="price_by_night">${place.price_by_night}</div>\
                      </div>\
                      <div class="information">\
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>\
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>\
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>\
                      </div>\
                      <div class="user">\
                      </div>\
                      <div class="description">\
                        ${place.description}\
                      </div>\
                    </article>`
        );
      }
    },
    contentType: 'application/json'
  });
});
