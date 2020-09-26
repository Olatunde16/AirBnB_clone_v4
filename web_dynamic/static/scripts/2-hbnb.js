const amenities = {};

$(document).ready(function () {
  $('input').each(function () {
    checkAndAppend(this);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  }, 'json');
});

function checkAndAppend (inp) {
  $(inp).click(function () {
    if ($(inp).prop('checked')) {
      amenities[$(inp).data('id')] = $(inp).data('name');
      console.log(amenities);
    } else {
      delete amenities[$(inp).data('id')];
    }
    $('div.amenities h4').html(Object.values(amenities).join(', '));
    if (Object.values(amenities).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    }
  });
}
