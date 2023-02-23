let amen = [];
$(document).ready(function () {
  $('INPUT[type=checkbox]').click(function () {
    if (this.checked) {
      amen.push($(this).data('name'));
    } else {
      amen.splice(amen.indexOf($(this).data('name')), 1);
    }
    $('.amenities h4').text(amen.join(', '));
  });
});

$.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
