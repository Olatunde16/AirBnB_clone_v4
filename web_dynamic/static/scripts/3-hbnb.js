$(document).ready(() => {
  var checkAmenities = {};
  $(':checkbox').click(function () {
    if ($(this).prop('checked') === true) {
      checkAmenities[$(this).data('id')] = $(this).data('name');
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    } else if ($(this).prop('checked') === false) {
      delete checkAmenities[$(this).data('id')];
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function () {
      alert('asdasd');
    }
  });

});
