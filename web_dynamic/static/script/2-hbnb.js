let amenitiesIds = {};

$(document).ready(function(){
  $('input[type="checkbox"]').click(function(){
    if($(this).is(":checked")){
      amenitiesIds[$(this).attr("data-id")] = $(this).attr("name");
    }
    else {
      delete amenitiesIds[$(this).attr("data-id")];
    }
      $('.amenities h4').text(Object.values(amenitiesIds).join(', '));
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
})
