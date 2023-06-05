$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  const aList = [];
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      aList.push($(this).parent().text());
    } else if ($(this).is(':not(:checked)')) {
      aList.pop($(this).parent().text());
    }
    console.log(aList);
    $('.amenities h4').text(aList.join(', '));
  });
});

$(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      console.log(data);
      if (data['status'] === 'OK') {
        $('DIV#api_status').addClass('available');
      }
    }
  });
});
