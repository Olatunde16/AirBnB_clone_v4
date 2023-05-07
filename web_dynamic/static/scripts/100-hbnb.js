$('document').ready(function () {
    const amenityIds = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenityIds[$(this).attr('data-id')];
      }
      $('.amenities h4').text(Object.values(amenityIds).join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let x = 0; x < data.length; x++) {
          const place = data[x];
          $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' +
          place.price_by_night + '</div></div><div class="information"><div class="max_guest"><div class="guest_image"></div>' +
          place.max_guest + ' Guests</div><div class="number_rooms"><div class="bed_image"></div>' +
          place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><div class="bath_image"></div>' +
          place.number_bathrooms + ' Bathroom</div></div>' + '<div class="user"><b>Owner:</b>' + place.owner + '</div><div class="description">' + place.description +
          '</div></article>');
        }
      }
    });
    $('.filters button').click(function () {
      $('.places > article').remove();
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          for (let x = 0; x < data.length; x++) {
            const place = data[x];
            $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' +
          place.price_by_night + '</div></div><div class="information"><div class="max_guest"><div class="guest_image"></div>' +
          place.max_guest + ' Guests</div><div class="number_rooms"><div class="bed_image"></div>' +
          place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><div class="bath_image"></div>' +
          place.number_bathrooms + ' Bathroom</div></div>' + '<div class="user"><b>Owner:</b>' + place.owner + '</div><div class="description">' + place.description +
          '</div></article>');
          }
        }
      });
    });
  });
  
