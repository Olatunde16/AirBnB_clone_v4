$(document).ready(function () {
  /* Show API status */

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  /* Make amenities filter dynamic */

  let checkedAmenities = [];

  function fillHeader () {
    checkedAmenities = checkedAmenities.filter((item) => item !== '');
    if (checkedAmenities.length > 1) {
      let stringAmenities = checkedAmenities.join(', ');

      if (stringAmenities.length > 38) {
        stringAmenities = stringAmenities.slice(0, 37) + '...';
      }

      $('.checkedAmenities').text(stringAmenities);
    } else if (checkedAmenities.length === 1) {
      $('.checkedAmenities').text(checkedAmenities[0]);
    } else {
      $('.checkedAmenities').text('');
    }
  }

  $('.amenity-checkbox').on('change', function () {
    const amenityName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      checkedAmenities.push(amenityName);
      fillHeader();
    } else {
      checkedAmenities.splice(checkedAmenities.indexOf(amenityName), 1);
      fillHeader();
    }
  });
});
