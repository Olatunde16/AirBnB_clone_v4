$(document).ready(function () {
  const dict = {};
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');
  const $statusIndicator = $('div#api_status');
  const statusUri = 'http://0.0.0.0:5001/api/v1/status/';

  $amenitiesCheck.click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).data('id')] = $(this).data('name');
      $selectedAmenities.text(Object.values(dict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete dict[$(this).data('id')];
      $selectedAmenities.text(Object.values(dict).join(', '));
    }
  });

  $.ajax({
    url: statusUri,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $statusIndicator.addClass('available');
      } else {
        $statusIndicator.removeClass('available');
      }
    }
  });
});
