$(document).ready(function () {
  const checkboxes = $('input[type=checkbox][data-name]');
  let enabled = [];
  let names = [];

  checkboxes.change(function () {
    enabled = checkboxes
      .filter(':checked')
      .map(function () {
        return this.dataset.id;
      })
      .get();
    names = checkboxes
      .filter(':checked')
      .map(function () {
        return this.nextSibling.wholeText;
      })
      .get();
    let text = '';
    for (const nam in names) {
      text += names[nam];
      if (nam < names.length - 1) {
        text += ', ';
      }
    }
    $('.amenities h4').html(text);
  });
});

$(document).ready(function () {
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

$(document).ready(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append(
          '<article>' + '<div class="title_box">' + '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night"> $' + place.price_by_night + '</div>' +
          '</div>' + '<div class="information">' +
          '<div class="max_guest">' + place.max_guest +
          (place.max_guest !== 1 ? ' Guests</div>' : ' Guest</div>') +
          '<div class="number_rooms">' + place.number_rooms +
          (place.number_rooms !== 1 ? ' Bedrooms</div>' : ' Bedroom</div>') +
          '<div class="number_bathrooms">' + place.number_bathrooms +
          (place.number_bathrooms !== 1 ? ' Bathrooms</div>' : ' Bathroom</div>') +
          '</div>' + '<div class="user">' + '</div>' +
          '<div class="description">' + place.description +
          '</div>' + '</article>'
        );
      }
    }
  });
});
