// declares a constant variable $
const $ = window.$;
// sets up a function that will be executed when the HTML document has finished loading
$(document).ready(function () {
  const amenities = {};
  // This event will be triggered whenever the user checks or unchecks a checkbox
  $('INPUT[type="checkbox"]').change(function () {
    // is checked, the code adds a new property to the amenities
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // checkbox is not checked, code removes the corresponding property
      delete amenities[$(this).attr('data-id')];
    }
    // selects H4 inside an element with class amenities and sets its text to the values
    // of the properties on the amenities object, joined by a comma and a space.
    $('.amenities H4').text(Object.values(amenities).join(', '));

  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
