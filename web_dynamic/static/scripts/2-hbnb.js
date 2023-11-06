#!/usr/bin/node
/* The JS script that manages the amenities.*/
/* global $ */
$(document).ready(function () {
  const amenitiesBox = {};

  $('.amenityBox').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).prop('checked')) {
      amenitiesBox[amenityId] = amenityName;
    } else {
      delete amenitiesBox[amenityId];
    }
    updateAmenitiesList();
    console.log(amenitiesBox);
  });

  function updateAmenitiesList () {
    const amenitiesList = Object.values(amenitiesBox).join(', ');
    const h4 = $('div.amenities > h4');
    if (amenitiesList) {
      h4.text(amenitiesList);
    } else {
      h4.html('&nbsp;');
    }
  }
  const url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function(data){
    if (data.status === 'OK'){
      $('div#api_status').addClass('available');
    }else{
      $('div#api_status').removeClass('available');
    }
  })
});
