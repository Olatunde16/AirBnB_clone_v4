document.addEventListener('DOMContentLoaded', function () {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5001/api/v1/status/',
    complete: function (e) {
      if (e.status === 200) {
        console.log('Entro en 200');
        $('DIV#api_status').addClass('available');
      } else {
        console.log('Error no entro');
        $('DIV#api_status').removeClass('available');
      }
    }
  });
});
