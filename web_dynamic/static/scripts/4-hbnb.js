$(document).ready(() => {
  var checkAmenities = {};
  $(':checkbox').click(function () {
    if ($(this).prop('checked') === true) {
      checkAmenities[$(this).data('id')] = $(this).data('name');
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    } else if ($(this).prop('checked') === false) {
      delete checkAmenities[$(this).data('id')];
      $('.amenities h4').text(Object.values(checkAmenities).join(', '));
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (item of data) {
        let guest = '';
        let numberRooms = '';
        let numberBath = '';
        let description = '';
        if (item['max_guest'] != 1) {
          guest = 'Guests';
        } else {
          guest = 'Guest';
        }
        if (item['number_rooms'] != 1) {
          numberRooms = 'Bedrooms';
        } else {
          numberRooms = 'Bedroom';
        }
        if (item['number_bathrooms'] != 1) {
          numberBath = 'Bathrooms';
        } else {
          numberBath = 'Bathroom';
        }
        if(item['description']) {
          description = item['description'];
        } else {
          description = '';
        }
        $('.places').append(

        `
      <article>
        <div class="title_box">
          <h2>${item['name']}</h2>
          <div class="price_by_night">$${item['price_by_night']}</div>
        </div>
        <div class="information">
          <div class="max_guest">${item['max_guest']} ${guest}</div>
                <div class="number_rooms">${item['number_rooms']} ${numberRooms}</div>
                <div class="number_bathrooms">${item['number_bathrooms']} ${numberBath}</div>
        </div>
          <div class="description">${description}</div>
      </article>
        `)
      }
    }
  });

  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({'amenities': Object.keys(checkAmenities)}),
      success: function (data) {
        for (item of data) {
          let guest = '';
          let numberRooms = '';
          let numberBath = '';
          let description = '';
          if (item['max_guest'] != 1) {
            guest = 'Guests';
          } else {
            guest = 'Guest';
          }
          if (item['number_rooms'] != 1) {
            numberRooms = 'Bedrooms';
          } else {
            numberRooms = 'Bedroom';
          }
          if (item['number_bathrooms'] != 1) {
            numberBath = 'Bathrooms';
          } else {
            numberBath = 'Bathroom';
          }
          if(item['description']) {
            description = item['description'];
          } else {
            description = '';
          }
          $('.places').append(
          `
        <article>
          <div class="title_box">
            <h2>${item['name']}</h2>
            <div class="price_by_night">$${item['price_by_night']}</div>
          </div>
          <div class="information">
            <div class="max_guest">${item['max_guest']} ${guest}</div>
                  <div class="number_rooms">${item['number_rooms']} ${numberRooms}</div>
                  <div class="number_bathrooms">${item['number_bathrooms']} ${numberBath}</div>
          </div>
            <div class="description">${description}</div>
        </article>
          `)
        }
      }
    });
  
  });





});
