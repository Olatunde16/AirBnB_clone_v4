$(document).ready(function () {
    const checkedAmenities = {};
    const api = 'http://' + window.location.hostname;
  
    $('input[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        checkedAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete checkedAmenities[$(this).data('id')];
      }
      $('div.amenities h4').text(Object.values(checkedAmenities).join(', ') || '&nbsp;');
    });
  
    $.get(api + ':5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  
    $.ajax({
      type: 'POST',
      url: api + ':5001/api/v1/places_search/',
      data: JSON.stringify({}),
      contentType: 'application/json',
      success: function (data) {
        
      },
    });
  
    $('button').click(function () {
      $('section.places').empty();
      fetch(api + ':5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amenities: Object.keys(checkedAmenities) })
      })
        .then(response => response.json())
        .then(data => {
          for (const place of data) {
            const placeHTML = `
              <article>
                <div class="title">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">
                    ${place.price_by_night}
                  </div>
                </div>
                <div class="information">
                  <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.max_guest} Guests
                  </div>
                  <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_rooms} Bedrooms
                  </div>
                  <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_bathrooms} Bathroom
                  </div>
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>`;
            $('section.places').append(placeHTML);
          }
        });
    });
  });
