$('document').ready(function () {
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  let selectedAmenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      selectedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete selectedAmenities[$(this).attr('data-id')];
    }
    if (Object.values(selectedAmenities).length === 0) {
      $('.selectedAmenities H4').html('&nbsp;');
    } else {
      $('.selectedAmenities H4').text(Object.values(selectedAmenities).join(', '));
    }
  });
});
