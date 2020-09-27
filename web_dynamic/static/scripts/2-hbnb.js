$(document).ready(function() {
  const request = require('request');
  let amenityObject = {};

  $('input[type="checkbox"]').click(function(){
    if ($(this).is(":checked")) {
      amenityObject[$(this).data('id')] = $(this).data('name');
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    } else if ($(this).is(":not(:checked)")) {
      delete amenityObject[$(this).data('id')];
      $('div.amenities h4').text(Object.values(amenityObject).join(', '));
    }
    console.log(amenityObject)
  });
  request("http://0.0.0.0:5001/api/v1/status/", function (err, resp, body) {
    if (resp.statusCode === 200) {
      // let element = document.getElementById("api_status");
      // element.className += "available";
      $('api_status').addClass('available');
    } else {
      $('api_status').removeClass('available');
    }
  });
});
