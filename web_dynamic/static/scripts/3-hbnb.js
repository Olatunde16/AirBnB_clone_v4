$(document).ready(function () {
  const amenityIDs = {};
  const apiurl = 'http://' + window.location.hostname;
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityIDs[$(this).attr('data-name')] = $(this).attr('data-id');
    } else {
      delete amenityIDs[$(this).attr('data-name')];
    }
    const list = [];
    $.each(amenityIDs, function (index, place) {
      list.push(index);
    });
    if (list.length === 0) {
      $('.amenities h4').html('&nbsp');
    } else {
      $('.amenities h4').text(list.join(', '));
    }
  });

  $.get(apiurl + ':5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: apiurl + ':5001/api/v1/places_search/',
    data: JSON.stringify({}),
    success: function (data) {
      $.each(data, function (index, place) {
        $('section.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest(s)</div><div class="number_rooms">' + place.number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
      });
    },
    dataType: 'json'
  });
});
