/* global $ */
$(document).ready(function () {
  const amenities = {};

  function updateAmenities () {
    const amenityList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenityList);
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    updateAmenities();
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
