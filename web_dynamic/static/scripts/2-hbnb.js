$(document).ready(function () {
  let amenitiesChecked = []
  let url = 'http://0.0.0.0:5001/api/v1/status/'
  $.getJSON(url, function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });
  $('input ["type=checkbox"]').change(function() {
    if (this.checked) {
      let amenityId = $(this).attr('data-id');
      amenitiesChecked.push(amenityId);
     }
    else {
      amenitiesChecked.splice($.inArray(checked, amenitiesChecked), 1);
    }
    $('.amenities h4').text(amenitiesChecked);
  });
});
