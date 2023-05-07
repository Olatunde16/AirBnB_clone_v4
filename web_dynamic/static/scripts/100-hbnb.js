$(function () {
  let selections = {};
  function addSelections () {
    selections = {};
    // Handle Amenities
    const amenities = {names: [], ids: []};
    $.each($('div.amenities input:checked'), function (i, input) {
      amenities.ids.push($(input).data('id'));
      amenities.names.push($(input).data('name'));
    });
    // Handle States
    const states = {names: [], ids: []};
    $.each($('#states li h2 input:checked'), function (i, input) {
      states.ids.push($(input).data('id'));
      states.names.push($(input).data('name'));
    });
    // Handle Cities
    const cities = {names: [], ids: []};
    $.each($('#cities li input:checked'), function (i, input) {
      cities.ids.push($(input).data('id'));
      cities.names.push($(input).data('name'));
    });
    // Add selected Amenities to selections
    if (amenities.names.length) {
      selections['amenities'] = amenities;
      $('div.amenities h4').empty();
      $('div.amenities h4').text(amenities.names.join(', '));
    }
    // Add selected States to selections
    if (states.names.length) {
      selections['states'] = states;
      $('div.locations h4').empty();
      $('div.locations h4').text(states.names.join(', '));
    }
    // And add selected Cities to selections
    if (cities.names.length) {
      selections['cities'] = cities;
      $('div.locations h4').empty();
      $('div.locations h4').text(cities.names.join(', '));
     }
  }
  $('input[type=checkbox]').on('change', addSelections);

  // Request the API status
  $.get('http://localhost:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      // Add the 'available' class to the API status div
      $('div#api_status').addClass('available');
    } else {
      // Remove the 'available' class to the API status div
      $('div#api_status').removeClass('avalaible');
    }
  });

  const postUrl = 'http://localhost:5001/api/v1/places_search/';

  // Filter places by Amenity
  function placesSearch () {
    const params = {};
    if (selections.amenities) {
      params['amenities'] = selections.amenities.ids;
    }
    if (selections.states) {
      params['states'] = selections.states.ids;
    }
    if (selections.cities) {
      params['cities'] = selections.cities.ids;
    }

    $('section.places').empty();

    $.ajax({
      type: 'POST',
      url: postUrl, 
      data: JSON.stringify(params),
      contentType: 'application/json',
      success: function (places, reqStatus) {
        $.each(places, function(i, place) {
          const article = `
            <article>
	    <div class="title_box">
	      <h2>${ place.name }</h2>
	      <div class="price_by_night">${ place.price_by_night }</div>
	    </div>
	    <div class="information">
	      <div class="max_guest">${place.max_guest} ${place.max_guest != 1 ? 'Guests' : 'Guest'}</div>
              <div class="number_rooms">${place.number_rooms} ${place.number_rooms != 1 ? 'Rooms' : 'Room'}</div>
              <div class="number_bathrooms">${place.number_bathrooms} ${place.number_bathrooms != 1 ? 'Bathrooms' : 'Bathroom'}</div>
	    </div>
	    <div class="user">
              <b>Owner:</b> ${ place.user ? place.user.first_name +' '+ place.user.last_name : 'N/A'}
            </div>
            <div class="description">
	      ${ place.description ? place.description : 'Nothing to show' }
            </div>
          </article> 
          `;
          $('section.places').append(article);
          // selections = {};
        });
      },
      error: function () {
        console.log('Error');
      }
    });
  }

  placesSearch();
  // On click fetch filtered Places
  $('button').on('click', placesSearch);
});
