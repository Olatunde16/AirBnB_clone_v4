window.addEventListener('load', function () {
    // Select some Amenities to be comfortable!
    $.ajax('http://0.0.0.0:5001/api/v1/places_search/').done(function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      });
    const amenity = {};
    const city = {};
    const state = {};
    const locate = {};
    $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      amenity[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenity[$(this).data('id')];
    }
    let lst = Object.values(amenity);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(amenity).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      state[$(this).data('id')] = $(this).data('name');
      locate[$(this).data('id')] = $(this).data('name');
    } else {
      delete state[$(this).data('id')];
      delete locate[$(this).data('id')];
    }
    let lst = Object.values(locate);
    if (lst.length > 0) {
      $('div.locations > h4').text(lst.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      city[$(this).data('id')] = $(this).data('name');
      locate[$(this).data('id')] = $(this).data('name');
    } else {
      delete city[$(this).data('id')];
      delete locate[$(this).data('id')];
    }
    let lst = Object.values(locate);
    if (lst.length > 0) {
      $('div.locations > h4').text(lst.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });

  //Fetch places
  $('.filters button').click(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function (data) {
    for (const place of data) {
      const template = `<article>
        <div class="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">
        $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
        ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article> <!-- End 1 PLACE Article -->`;
      $('section.places').append(template);
    }
  });
});
