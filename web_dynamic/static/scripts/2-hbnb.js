$(document).ready(function () {
  const amenity_check = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      amenity_check[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenity_check[$(this).data('id')];
    }
    const amenity_list = Object.values(amenity_check);
    if (amenity_list.length > 0) {
      $('div.amenities > h4').text(amenity_list.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (result, textStatus) {
    if (textStatus === 'success') {
      if (result.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
