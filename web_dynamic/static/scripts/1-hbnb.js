#!/usr/bin/node

$(function () {
  const tickedAmenities = {};

  function updateAmenities () {
    const allAmenities = Object.keys(tickedAmenities).join(', ');
    $('.amenities h4').text(allAmenities);
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).prop('checked')) {
      tickedAmenities[amenityId] = amenityName;
    } else {
      delete tickedAmenities[amenityId];
    }

    updateAmenities();
  });
});
