$(document).ready(function() {
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
  $.get("http://0.0.0.0:5001/api/v1/status/", function (data, textStatus) {
    if (textStatus === 'success') {
      // $("#api_status").addClass("available");
      $("#api_status").toggleClass('notAvailable');
      $("#api_status").toggleClass('available');
    }
    // } else {
    //   $('#api_status').removeClass('available');
    // }
  });
});
