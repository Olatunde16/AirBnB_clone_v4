$(document).ready(function() {
  const amenities = [];
  const amenitiesName = [];
  console.log('hi')
  $('li :checkbox').change(function() {
    if (this.checked) {
      amenities.push($(this).attr('data-id'));
      amenitiesName.push($(this).attr('data-name'));
    } else {
      amenities.splice($.inArray($(this).attr('data-id'), amenities), 1);
      amenitiesName.splice($.inArray($(this).attr('data-name'), amenitiesName), 1);
    }
    $('.amenities h4').html(amenitiesName.join(', '));
  });

  apiUrl = 'http://127.0.0.1:5001/api/v1/status/';
  console.log('hello')
  $.get(apiUrl, function(data) {
    console.log(data.status, 'status')
      if (data.status === 'OK') {
      $('div#api_status').addClass('available');
      console.log('added')
    } else {
      $('div#api_status').removeClass('available');
      console.log('removed')
    }
  })
});
