const amenitiesDict = {};

$(document).ready(function () {
  $('input').click(function () {
    if ($(this).is(':checked')) {
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesDict[$(this).attr('data-id')];
    }
    if (Object.keys(amenitiesDict).length > 2) {
      const lista = Object.values(amenitiesDict);
      const mystr = lista[0] + ', ' + lista[1] + ', ' + lista[2] + '...';
      $('.amenities h4').text(mystr);
    } else {
      $('.amenities h4').text(Object.values(amenitiesDict).join(', '));
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
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    data: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    success: function (data) {
      $('section.places').empty();
      for (const key in data) {
        const plural = [' Guests', ' Bedrooms', ' Bathrooms', 'None'];
        const userNm = ['None ', 'None'];
        const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + data[key].user_id;
        $.get(userUrl, function (data2) {
          if (data2.first_name != null) {
            userNm[0] = userNm[data2.first_name];
          } if (data2.last_name != null) {
            userNm[1] = userNm[data2.last_name];
          }
        });
        if (data[key].max_guest === 1) {
          plural[0] = ' Guest';
        }
        if (data[key].number_rooms === 1) {
          plural[1] = ' Bedroom';
        }
        if (data[key].number_bathrooms === 1) {
          plural[2] = ' Bathroom';
        }
        if (data[key].description != null) {
          plural[3] = data[key].description;
        }
        const Places = '<article>' +
        '<div class="title_box"><h2>' + data[key].name + '</h2>' +
            '<div class="price_by_night">' + '$' + data[key].price_by_night + '</div>' +
        '</div>' +
        '<div class="information">' +
            '<div class="max_guest">' + data[key].max_guest + plural[0] + '</div>' +
                '<div class="number_rooms">' + data[key].number_rooms + plural[1] + '</div>' +
                '<div class="number_bathrooms">' + data[key].number_bathrooms + plural[2] + '</div>' +
        '</div>' +
        '<div class="user">' +
                '<b>Owner:</b>' + userNm[0] + userNm[1] +
            '</div>' +
            '<div class="description">' +
            plural[3] +
            '</div>' +
        '</article>';
        $('section.places').append(Places);
      }
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'post',
      data: JSON.stringify({ amenities: Object.keys(amenitiesDict) }),
      headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: function (data) {
        $('section.places').empty();
        for (const key in data) {
          const plural = [' Guests', ' Bedrooms', ' Bathrooms', 'None'];
          const userNm = ['None ', 'None'];
          const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + data[key].user_id;
          $.get(userUrl, function (data2) {
            if (data2.first_name != null) {
              userNm[0] = userNm[data2.first_name];
            } if (data2.last_name != null) {
              userNm[1] = userNm[data2.last_name];
            }
          });
          if (data[key].max_guest === 1) {
            plural[0] = ' Guest';
          }
          if (data[key].number_rooms === 1) {
            plural[1] = ' Bedroom';
          }
          if (data[key].number_bathrooms === 1) {
            plural[2] = ' Bathroom';
          }
          if (data[key].description != null) {
            plural[3] = data[key].description;
          }
          const Places = '<article>' +
          '<div class="title_box"><h2>' + data[key].name + '</h2>' +
              '<div class="price_by_night">' + '$' + data[key].price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
              '<div class="max_guest">' + data[key].max_guest + plural[0] + '</div>' +
                  '<div class="number_rooms">' + data[key].number_rooms + plural[1] + '</div>' +
                  '<div class="number_bathrooms">' + data[key].number_bathrooms + plural[2] + '</div>' +
          '</div>' +
          '<div class="user">' +
                  '<b>Owner:</b>' + userNm[0] + userNm[1] +
              '</div>' +
              '<div class="description">' +
              plural[3] +
              '</div>' +
          '</article>';
          $('section.places').append(Places);
        }
      }
    });
  });
});
