$(function () {
  const checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');

    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = $(this).data('name');
    } else {
      delete checkedAmenities[amenityId];
    }
    const amenitiesList = Object.values(checkedAmenities).join(', ');

    $('.amenities h4').text(amenitiesList);
  });

  function updateApiStatus() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function(response) {
        if (response.status === "OK") {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      },
      error: function(xhr, status, error) {
        console.error('Error fetching API status:', error);
      }
    });
  }

  updateApiStatus();

});
