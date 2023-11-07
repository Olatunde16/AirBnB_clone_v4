$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities[this.dataset.name] = this.dataset.id;
      $('.amenities h4').text(Object.keys(amenities).join(', '));
    } else {
      delete amenities[this.dataset.name];
    }
    if (Object.keys(amenities).length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.post({
    URL: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({ }),
    dataType: 'json',
    Headers: { 'Content-Type': 'application/json' },
    success: function (data) {
      for (const place of data) {
        $('.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
});
