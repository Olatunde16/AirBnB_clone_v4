$(document).ready(function () {
  const checkedAmenities = {};

  $('input').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    method: "GET",
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });
});
