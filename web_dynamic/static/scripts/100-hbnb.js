$(document).ready(function () {
  const amenity_check = {};
  const state_check = {};
  const city_check = {};
  $(document).on('change', ".amenities input[type='checkbox']", function () {
    if (this.checked) {
      amenity_check[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenity_check[$(this).data('id')];
    }
    const amenity_list = Object.values(amenity_check);
    if (amenity_list.length > 0) {
      $('div.amenities > h4').text(amenity_list.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations input[id='statecheck']", function () {
    if (this.checked) {
      state_check[$(this).data('id')] = $(this).data('name');
    } else {
      delete state_check[$(this).data('id')];
    }
    const state_list = Object.values(state_check);
    if (state_list.length > 0) {
      $('div.locations > h4').text(state_list.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations input[id='citycheck']", function () {
    if (this.checked) {
      city_check[$(this).data('id')] = $(this).data('name');
    } else {
      delete city_check[$(this).data('id')];
    }
    const city_list = Object.values(city_check);
    if (city_list.length > 0) {
      $('div.locations > h4').text(city_list.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (result, textStatus) {
    if (textStatus === 'success') {
      if (result.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedroom</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div><div class="user"><b>Owner: </b>' + place.owner + '</div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
  $('button:contains("Search")').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(amenity_check), 'states': Object.keys(state_check), 'cities': Object.keys(city_check)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedroom</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div><div class="user"><b>Owner: </b>' + place.owner + '</div><div class="description">' + place.description + '</div></article>');
        }
      }
    }); 
  });
});
