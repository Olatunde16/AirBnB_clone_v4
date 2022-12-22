const dict = {};

$(document).ready(function () {
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
      $('.amenities h4').text($(this).attr('data-name'));
    } else {
      delete dict[$(this).attr('data-id')];
      $('.amenities h4').text('');
    }
  });
});

const API_URL = 'http://0.0.0.0:5001/api/v1/status';
  $.get(API_URL, function (data, response) {
    if (response === 'success' && data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
