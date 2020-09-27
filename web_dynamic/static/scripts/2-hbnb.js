$(document).ready(init);

function init () {
  const ListAmenity = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      ListAmenity[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete ListAmenity[$(this).attr('data-name')];
    }
    const names = Object.keys(ListAmenity);
    $('.amenities h4').text(names.sort().join(', '));
  });
}

// Check API status and update status in the header

const url = 'http://0.0.0.0:5001/api/v1/status/';
$get(url, function (data, status) {
  console.log(data);
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
