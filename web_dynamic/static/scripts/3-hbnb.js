$(document).ready(function () {
  const amenities = [];
  const amenitiesName = [];
  console.log('hi');
  $('li :checkbox').change(function () {
    if (this.checked) {
      amenities.push($(this).attr('data-id'));
      amenitiesName.push($(this).attr('data-name'));
    } else {
      amenities.splice($.inArray($(this).attr('data-id'), amenities), 1);
      amenitiesName.splice($.inArray($(this).attr('data-name'), amenitiesName), 1);
    }
    $('.amenities h4').html(amenitiesName.join(', '));
  });

  let url = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}',
    success: function (places) {
      $.get('http://0.0.0.0:5001/api/v1/users/', function (users) {
        for (const place of places) {
          const user = users.filter(user => {
            return user.id === place.user_id;
          })[0];
          $('.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b>Owner:</b> ${user.first_name} ${user.last_name}
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`);
        }
      });  
    }
  });
});
