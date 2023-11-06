$(document).ready(function () {
  const amenities = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities[this.dataset.name] = this.dataset.id;
      $('.amenities h4').text(Object.keys(amenities).join(', '));
    } else {
      delete amenities[this.dataset.name];
    }
    if (Object.keys(amenities).length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
    }
  });
});

$.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
