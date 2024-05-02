$(document).ready(init);

function init () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });
  $.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus)
  {
      if (textStatus === 'success') {
          $("#api_status").addClass("available");
          $("#api_status").removeAttr("id")
      }
  });
}