$(function () {
  const AmenitiesChecked = {};
  $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      AmenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete AmenitiesChecked[$(this).data('id')];
    }
    const Objs = Object.values(AmenitiesChecked);
    console.log(Object.values(AmenitiesChecked));
    if (Objs) {
      $('.amenities > h4').text(Object.values(AmenitiesChecked).join(', '));
    } else {
      $('.amenities > h4').html('&nbsp;');
    }
  });
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  const users = {};
  $.getJSON('http://172.23.179.134:5001/api/v1/users', (data) => {
    for (const usr of data) {
      users[usr.id] = usr.first_name + ' ' + usr.last_name;
      console.log(users);
    }
  });
  $.ajax({
    url: `http://${window.location.hostname}:5001/api/v1/places_search`,
    type: 'POST',
    data: JSON.stringify(AmenitiesChecked),
    contentType: 'application/json',
    success: data => {
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
          <div class="image_guest"></div>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(template);
      }
    }
  });
  $(':button').click(function () {
    $('.places > article').remove();
    $.ajax({
      url: `http://${window.location.hostname}:5001/api/v1/places_search`,
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(AmenitiesChecked) }),
      contentType: 'application/json',
      success: data => {
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
          <div class="image_guest"></div>
    <br />
    ${place.max_guest} Guests
        </div>
          <div class="number_rooms">
          <div class="img_room"></div>
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    <br />
    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
        <div class="img_bathrooms"></div>
    <br />
    ${place.number_bathrooms} Bathroom
        </div>
      </div>
    <!-- USER -->
    <div class="user">
    <p><b>Owner: </b>${users[place.user_id]}</p>
    </div>
      <div class="description">
        ${place.description}
      </div>
    </article> <!-- End 1 PLACE Article -->`;
          $('section.places').append(template);
        }
      }
    });
  });
});
