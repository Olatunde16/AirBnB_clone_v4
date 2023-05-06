$(function () {
  function addToSelectedAmenities () {
    const selectedAmenity = [];
    $.each($('input:checked'), function (i, input) {
      selectedAmenity.push($(input).data('name'));
    });
    $('div.amenities h4').empty();
    if (selectedAmenity.length) {
      $('div.amenities h4').append(selectedAmenity.join(', '));
    }
  }
  $('input[type=checkbox]').on('change', addToSelectedAmenities);

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
  // Create and populate article tag with places data.
  $.ajax({
    type: 'POST',
    url: postUrl, 
    data: '{}',
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
      });
    },
    error: function () {
      console.log('Error')
    }
   });
});
