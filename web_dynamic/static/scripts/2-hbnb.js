$(document).ready(function () {
  const checkAmen = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkAmen[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkAmen[$(this).data('id')];
    }
    const amenList = [];
    for (const key in checkAmen) {
      amenList.push(checkAmen[key]);
    }
    $('.amenities h4').text(amenList.join(', '));
  });
});
$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
