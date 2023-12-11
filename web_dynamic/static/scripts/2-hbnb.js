#!/usr/bin/node

$(document).ready(function () {
  const amenityIds = {};

  function updateApiStatus () {
    $.get(`http://${window.location.hostname}:5001/api/v1/status/`, function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  updateApiStatus();

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    const amenitiesList = Object.values(amenityIds).join(', ');
    $('.amenities h4').text(amenitiesList);
  });
});
