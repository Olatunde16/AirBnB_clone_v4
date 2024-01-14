$(function () {
  const amenityDict = {};

  $('input').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }).fail(function (xhr, textStatus, error) {
    console.log('Error: ' + error);
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search',
    data: JSON.stringify({}),
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      data.forEach((place) =>
        $('section.places').append(
                    `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''
                    }</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''
                    }</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''
                    }</div>
                </div>
                <div class="user">
                      <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                    </div>
                    <div class="description">
                  ${place.description}
                    </div>
              </article>
          `
        ));
    },
    dataType: "json",
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
