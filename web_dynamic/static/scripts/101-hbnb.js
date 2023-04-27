$('document').ready(function () {
    const status = () => {
        $.ajax({
          url: 'http://localhost:5001/api/v1/status/',
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            // Do something with the returned data
            if (data.status === 'OK') {
              $('DIV#api_status').addClass('available');
            }
          },
          error: function(xhr, status, error) {
            // Handle the error and perform an alternative action
            if ($('DIV#api_status').hasClass('available')) {
                $('DIV#api_status').removeClass('available');
          }}
        });
    }
      
    status();

    setInterval(status, 0.2 * 60 * 1000);
    // setInterval(console.clear, 0.3 * 60 * 1000);

    const loadAllPlaces = () => {
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
            type: 'POST',
            data: '{}',
            contentType: 'application/json',
            dataType: 'json',
            success: appendPlaces,
            error: function(xhr, status, error) {
                if (xhr.status === 0) {
                    console.log('Could not connect to the server');
                } else {
                    console.log('Internal error: ' + xhr.status);
                    console.log(error);
                }
                return true
            }
        });
    }

    loadAllPlaces()

    // Filters
    let amenities = {};
    $('INPUT[type="checkbox"].amenityCheckBox').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      if (Object.values(amenities).length === 0) {
        $('.amenities H4').html('&nbsp;');
      } else {
        $('.amenities H4').text(Object.values(amenities).join(', '));
      }
    });

    let state = {};
    $('INPUT[type="checkbox"].stateCheckBox').change(function () {
      if ($(this).is(':checked')) {
        state[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete state[$(this).attr('data-id')];
      }
      $('.locations H4').text(Object.values(state).join(', '));
    });

    let city = {};
    $('INPUT[type="checkbox"].cityCheckBox').change(function () {
      if ($(this).is(':checked')) {
        city[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete city[$(this).attr('data-id')];
      }
      $('.locations H4').text(Object.values(city).join(', '));
    });

    $('#button_id').click(() => {
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
            type: 'POST',
            data: JSON.stringify({ 'cities': Object.keys(city) , 'amenities': Object.keys(amenities), 'states': Object.keys(state)}),
            contentType: 'application/json',
            dataType: 'json',
            success: appendPlaces
    })})

    // Event
    $('#placesh1').click(() => {
        loadAllPlaces()
    }) 
})


function appendPlaces(data) {
  $('SECTION.places').empty();

  const promises = data.map(async place => {
    // creating the requests
    const amenities_place = {
      url: `http://localhost:5001/api/v1/places/${place.id}/amenities`,
      method: 'GET',
      timeout: 0,
    };
    const reviews_place = {
      url: `http://localhost:5001/api/v1/places/${place.id}/reviews`,
      method: 'GET',
      timeout: 0,
    };

    // making the requests
    const amenitiesPromise = $.ajax(amenities_place)
      .then(response => {
        place.amenities = response;
      })
      .catch(error => {
        console.log(error);
        place.amenities = [];
      });

    const reviewsPromise = $.ajax(reviews_place)
      .then(response => {
        place.reviews = response;
      })
      .catch(error => {
        console.log(error);
        place.reviews = [];
      });

    // creating the render for the place
    await Promise.all([amenitiesPromise, reviewsPromise]);
    let html = '';
    html += `<ARTICLE>
              <DIV class="title_box">
                <H2>${place.name}</H2>
                  <DIV class="price_by_night">
                    $${place.price_by_night}
                  </DIV>
                </DIV>
                <DIV class="information">
                  <DIV class="max_guest">
                    ${place.max_guest} Guests
                  </DIV>
                  <DIV class="number_rooms">
                    ${place.number_rooms} Bedrooms
                  </DIV>
                  <DIV class="number_bathrooms">
                    ${place.number_bathrooms} Bathrooms
                  </DIV>
                </DIV>
                <DIV class="description">
                <DIV><B>Owner: </B> ${place.user.first_name} ${place.user.last_name}</DIV>
                <DIV><B>City: </B> ${place.city.name}</DIV>
                </BR>
                  ${place.description}
                </DIV>`;
    // if the amenities is not an empty list
    if (place.amenities.length > 0) {
      html += `<DIV class="amenities_list">
                  <h2>Amenities</h2>
                  <UL>
                    ${place.amenities.map(amenity => `<LI>${amenity.name}</LI>`).join('')}
                  </UL>
                </DIV>`;
    }
    // if the reviews is not an empty list
    if (place.reviews.length > 0) {
      html += `<DIV class="reviews_list">
                  <h2>Reviews</h2>
                  <UL>
                    ${place.reviews.map(review => `<LI>${review.text}</LI>`).join('')}
                  </UL>
                </DIV>`;
    }
    html += `</ARTICLE>`;
    return html;
  });

  // when all the places are render
  Promise.all(promises).then(results => {
    const validResults = results.filter(result => result !== '');
    if (validResults.length > 0) {
      $('SECTION.places').append(validResults.join(''));
    } else {
      $('SECTION.places').html('<p>No places found</p>');
    }
  });
}



