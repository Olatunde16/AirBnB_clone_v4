/* global $ */
$(document).ready(function () {
  const amenities = {};

  function updateAmenities () {
    const checkedAmenities = Object.keys(amenities);
    const amenitiesText = checkedAmenities.join(',');
    $('#amenities h4').text(amenitiesText);
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      amenities[amenityId] = true;
    } else {
      delete amenities[amenityId];
    }
    updateAmenities();
  });
});
