$('document').ready(function () {
  const amenityIds = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityIds[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityIds).join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
