$(document).ready(function () {
  const amenitiesName = [];
  const checkedAmenities = [];
  $('li :checkbox').change(function () {
    if (this.checked) {
      amenitiesName.push(this.getAttribute('data-name'))
      checkedAmenities.push(this.getAttribute('data-id'))
    } else {
      amenitiesName.splice(amenitiesName.indexOf(this.getAttribute('data-name')), 1)
      checkedAmenities.splice(checkedAmenities.indexOf(this.getAttribute('data-id')))
    }
    $('.amenities h4').html(amenitiesName.join(', '));
    console.log(amenitiesName, checkedAmenities)
  });

  const apiUrl = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(apiUrl, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}',
    success: function (places) {
      $.get('http://127.0.0.1:5001/api/v1/users/', function (users) {
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

  $('button').on('click', function () {
    $('.places > article').remove();
    $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function (data) {
        $.get('http://127.0.0.1:5001/api/v1/users/', function (users) {
          for (const place of data) {
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
          </article>`);}
        })
      }})
  });

});
