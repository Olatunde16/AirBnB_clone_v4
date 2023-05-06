$(document).ready(function () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') { $('div#api_status').addClass('available'); } else { $('div#api_status').removeClass('available'); }
  });
});
