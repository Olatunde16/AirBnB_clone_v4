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

function appendPlaces (data) {
  $('SECTION.places').empty();
  $('SECTION.places').append(data.map(place => {
    return `<ARTICLE>
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
                </DIV>
              </ARTICLE>`;
  }));
}