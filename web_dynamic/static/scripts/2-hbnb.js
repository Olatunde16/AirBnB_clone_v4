$(document).ready(function () {
  $('input[type=checkbox]').on('click', function () {
    const amenityList = [];
    $('input:checked').each(function () {
      amenityList.push($(this).attr('data-id'));
    });
    $('.amenities h4').text(amenityList.join(', '));
    if (amenityList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') { $('div#api_status').addClass('available'); } else { $('div#api_status').removeClass('available'); }
  });
});
