const ch = [];

$(document).ready(function () {
  $('li input').click(function () {
    if($(this).is(':checked')) {
      let tmp = $(this).attr('data-name');
      ch.push($(this).attr('data-name'));
      $('.amenities h4').text(ch.join(", "));
    }
    else {
      for (let i = 0; i < ch.length; i++) {
        if (ch[i] === $(this).attr('data-name')) {
          ch.splice(i, 1);
        }
      }
      if (ch !== undefined && ch.length > 0) {
        $('.amenities h4').text(ch.join(", "));
      }
      else {
        $('.amenities h4').text('\xa0');
      }
    }
  });
  $.get("http://0.0.0.0:5001/api/v1/status/", function(data){
    if (data === 'OK'){
      $('div#api_status').addClass('available');
    }else{
      $('div#api_status').removeClass('available');
    }
  });
});
