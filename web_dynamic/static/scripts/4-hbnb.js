#!/usr/bin/node
/*
JavaScript script that load hbnb page
*/
const amenitiesChecked = [];
const amenitiesCheckedId = [];
document.addEventListener('DOMContentLoaded', (event) => {
  window.$('input:checkbox').change(function () {
    const cbName = $(this).attr('data-name');
    const cbId = $(this).attr('data-id');
    if (window.$(this).is(':checked')) {
      amenitiesChecked.push(cbName);
      amenitiesCheckedId.push(cbId);
    } else {
      delete amenitiesChecked.pop(cbName);
      delete amenitiesCheckedId.pop(cbId);
    }
    $('.amenities h4').html(amenitiesChecked.join(', '));
  });

  $.get('http://127.0.0.1:5002/api/v1/status/', function (data, testStatus) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').remove('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5002/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      for (const [, value] of Object.entries(response)) {
        const bathrooms = (`${value.number_bathrooms}` > 1 ? 'Bathrooms' : 'Bathroom');
        const guests = (`${value.max_guest}` > 1 ? 'Guests' : 'Guest');
        const rooms = (`${value.number_rooms}` > 1 ? 'Rooms' : 'Room');
        const render = `<article>
                <div class="title_box">
                    <h2>${value.name}</h2>
                    <div class="price_by_night">$${value.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${value.max_guest} ${guests}</div>
                        <div class="number_rooms">${value.number_rooms} ${rooms}</div>
                        <div class="number_bathrooms">${value.number_bathrooms} ${bathrooms}</div>
                </div>
                <div class="description">
                    ${value.description}
                    </div>
                </article>`;
        $('.places').append(render);
      }
    }
  });

  $("button").click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5002/api/v1/places_search',
      data: JSON.stringify({ amenities: amenitiesCheckedId }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (response) {
        $('SECTION.places').empty();
        for (const [, value] of Object.entries(response)) {
          const bathrooms = (`${value.number_bathrooms}` > 1 ? 'Bathrooms' : 'Bathroom');
          const guests = (`${value.max_guest}` > 1 ? 'Guests' : 'Guest');
          const rooms = (`${value.number_rooms}` > 1 ? 'Rooms' : 'Room');
          const render = `<article>
                  <div class="title_box">
                      <h2>${value.name}</h2>
                      <div class="price_by_night">$${value.price_by_night}</div>
                  </div>
                  <div class="information">
                      <div class="max_guest">${value.max_guest} ${guests}</div>
                          <div class="number_rooms">${value.number_rooms} ${rooms}</div>
                          <div class="number_bathrooms">${value.number_bathrooms} ${bathrooms}</div>
                  </div>
                  <div class="description">
                      ${value.description}
                      </div>
                  </article>`;
          $('SECTION.places').append(render);
        }
      }
    })
  })
});
