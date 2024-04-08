$(document).ready(function () {
  const checkedAmenities = {};
  const checkedCities = {};
  const checkedStates = {};

  $('input.amenity_checkbox').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    const amenitiesList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
    $('#checkedAmenitiesList').text('Checked amenities:' + amenitiesList);
  });

  $('input.city_checkbox').change(function () {
    const cityId = $(this).attr('data-id');
    const cityName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      checkedCities[cityId] = cityName;
    } else {
      delete checkedCities[cityId];
    }
    const citiesList = Object.values(checkedCities).join(', ');
    const statesList = Object.values(checkedStates).join(', ');
    if (checkedStates.length === 0 && checkedCities.length === 0) {
      $('div.locations h4').html('&nbsp;');
    } else if (checkedStates.length === 0 && checkedCities.length !== 0) {
      $('div.locations h4').text('Cities: ' + citiesList.join(', '));
    } else {
      $('div.locations h4').text('States: ' + statesList.join(', '));
    }
  });

  $('input.state_checkbox').change(function () {
    const stateId = $(this).attr('data-id');
    const stateName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      checkedStates[stateId] = stateName;
    } else {
      delete checkedStates[stateId];
    }
    const citiesList = Object.values(checkedCities).join(', ');
    const statesList = Object.values(checkedStates).join(', ');
    if (checkedStates.length === 0 && checkedCities.length === 0) {
      $('div.locations h4').html('&nbsp;');
    } else if (checkedStates.length === 0 && checkedCities.length !== 0) {
      $('div.locations h4').text('Cities: ' + citiesList.join(', '));
    } else {
      $('div.locations h4').text('States: ' + statesList.join(', '));
    }
  });

  function getPlaces () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checkedAmenities), cities: Object.keys(checkedCities), states: Object.keys(checkedStates) }),
      success: function (places) {
        $('section.places').empty();
        for (const place of places) {
          appendArticle(place);
        }
      }
    });
  }
  getPlaces();
  $('.search_btn').click(function () {
    getPlaces();
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status',
    success: function (response) {
      if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  });

  // function findPlaces () {

  //     $.ajax({
  //         type: 'Post',
  //         url: 'http://0.0.0.0:5001/api/v1/places_search',
  //         contentType: 'application/json',
  //         data: JSON.stringify({}),
  //         success: function (places) {
  //             for (const place of places) {
  //             appendArticle(place);
  //             }
  //         }
  // });
  // }

  function appendArticle (place) {
    const guestS = place.max_guest !== 1 ? 'Guests' : 'Guest';
    const roomS = place.number_rooms !== 1 ? 'Bedrooms' : 'Bedroom';
    const bathroomS = place.number_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom';
    $('section.places').append(`
    <article>
    <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
        <div class="max_guest">${place.max_guest} ${guestS}</div>
            <div class="number_rooms">${place.number_rooms} ${roomS}</div>
            <div class="number_bathrooms">${place.number_bathrooms} ${bathroomS}</div>
    </div>
        <div class="description"><p>${place.description}</p></div>
            <div class="reviews">
                <h2>Reviews <span class="toggle_btn1" place-id="${place.id}">(show)</span></h2>
            </div>
        <div class="place_reviews" id="${place.id}"></div>
    </acrticle>
    `);
  }
  $(document).on('click', '.toggle_btn1', function () {
    const placeId = $(this).attr('place-id'); /* the place id */
    if ($(this).text() === '(show)') {
      $(this).text('(hide)');
      $.ajax({
        type: 'Get',
        url: 'http://0.0.0.0:5001/api/v1/places/' + placeId + '/reviews',
        success: function (reviews) {
          for (const review of reviews) {
            $('div#' + placeId).append(review.text + '<br><br>');
          }
        }
      });
    } else {
      $(this).text('(show)');
      $('div#' + placeId).empty();
    }
  });
});
