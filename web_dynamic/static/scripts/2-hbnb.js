$(document).ready(function () {
  let amenitiesChecked = [];
  const url = 'http://0.0.0.0:5001/api/v1/status/';

  $.getJSON(url, function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const index = amenitiesChecked.indexOf(amenityId);

    if (this.checked && index === -1) {
      amenitiesChecked.push(amenityId);
    } else if (!this.checked && index!== -1) {
      amenitiesChecked.splice(index, 1);
    }

    $('.amenities h4').text(amenitiesChecked.join(', '));
  });
});