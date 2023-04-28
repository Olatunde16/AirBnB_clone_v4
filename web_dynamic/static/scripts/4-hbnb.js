/* Management of selections of amenities */

$(document).ready(function () {
  const selectedAmenities = {};

  // Process changes to checkbox for equipment
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      // If checked, add to the list
      selectedAmenities[amenityId] = amenityName;
    } else {
      // If unchecked, remove from the list
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the chosen amenities.
    const amenityNames = Object.values(selectedAmenities);
    $('.amenities h4').text(amenityNames.join(', ') || '\u00A0');
  });


  // Request API status
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });


  // Request Fetch places
  function fetchPlaces() {
    const dataToSend = { amenities: Object.keys(selectedAmenities) };
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(dataToSend),
      success: function (data) {
        $('section.places').empty();
        data.forEach(place => $('section.places').append(addPlace(place)));
      },
      error: function (error) {
        console.log('POST request error', error);
      }
    });
  }

  $('button').click(fetchPlaces);

  function addPlace(place) {
    return `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest</div>
          <div class="number_rooms">${place.number_rooms} Bedroom</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`;
  }
  fetchPlaces();
});
