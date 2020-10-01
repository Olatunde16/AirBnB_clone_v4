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

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
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
    headers: { "Content-Type": "application/json" },
    dataType: 'json',
    success: function (data) {
      $('section.places').empty();
      for (let key in data) {
        let html = 
        '<article>\
            <div class="title_box"><h2>' + data[key].name + '</h2>\
            <div class="price_by_night">' +
               data[key].price_by_night 
            + '</div></div>\
            <div class="information">\
                <div class="max_guest">' +
                  data[key].max_guest  
                + ' Guests</div>\
                <div class="number_rooms">' +
                  data[key].number_rooms  
                + ' Rooms</div>\
                <div class="number_bathrooms">' +
                  data[key].number_bathrooms  
                + ' Bathrooms</div>\
            </div>\
            <div class="description">\
                <p>' + data[key].description + '</p>\
            </div>\
        </article>';
        $('section.places').append(html);
      }
    }
  });

  $('button').click(function () {
  $.ajax({ 
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    data: JSON.stringify({amenities: Object.keys(amenitiesIds)}),
    headers: { "Content-Type": "application/json" },
    dataType: 'json',
    success: function (data) {
      $('section.places').empty();
      for (let key in data) {
        let html = 
        '<article>\
            <div class="title_box"><h2>' + data[key].name + '</h2>\
            <div class="price_by_night">' +
               data[key].price_by_night 
            + '</div></div>\
            <div class="information">\
                <div class="max_guest">' +
                  data[key].max_guest  
                + ' Guests</div>\
                <div class="number_rooms">' +
                  data[key].number_rooms  
                + ' Rooms</div>\
                <div class="number_bathrooms">' +
                  data[key].number_bathrooms  
                + ' Bathrooms</div>\
            </div>\
            <div class="description">\
                <p>' + data[key].description + '</p>\
            </div>\
        </article>';
        $('section.places').append(html);
      }
    }
  }); 
  });
});
