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

    // Request status
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  // Request with
  $.ajax({
    type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(`
        <article>
        <div class="title_box">
          <h2>${data[i].name}</h2>
          <div class="price_by_night">$${data[i].price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${data[i].max_guest}</div>
                <div class="number_rooms">${data[i].number_rooms}</div>
                <div class="number_bathrooms">${data[i].number_bathrooms}</div>
        </div>
        <div class="user">
      </article>
        `)};
      }
      });

      $('button').click(function () {
        $('section.places').empty();
        $.ajax({
          type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({amenities: Object.keys(amenities)}),
            success: function(data) {
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                $('section.places').append(`
                <article>
          <div class="title_box">
            <h2>${data[i].name}</h2>
            <div class="price_by_night">$${data[i].price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${data[i].max_guest}</div>
                  <div class="number_rooms">${data[i].number_rooms}</div>
                  <div class="number_bathrooms">${data[i].number_bathrooms}</div>
          </div>
          <div class="user">
        </article>
              `)};
      }});
      })
});