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
  $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
  });
});
