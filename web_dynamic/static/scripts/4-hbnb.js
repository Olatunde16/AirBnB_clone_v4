const $ = window.jQuery;
const listAmenities = {};
const localhost = 'http://35.196.129.80:5001/api/v1/';
window.onload = async function () {
  await amenitiesList();
  selectAmenities();
  apiAvailabe();
  placesList();
};

async function apiAvailabe () {
  $.get(localhost + 'status', function (data, status) {
    console.log(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
}

const users = {};
$.getJSON(localhost + '/users', (data) => {
  for (const el of data) {
    users[el.id] = el.first_name + ' ' + el.last_name;
  }
});

// amenities

function selectAmenities () {
  $('div.amenities input[type=checkbox]').change(function () {
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      listAmenities[id] = $(this).attr('data-name');
    } else {
      delete listAmenities[id];
    }
    $('.amenities h4').text(Object.values(listAmenities).join(', '));
  });
}

async function amenitiesList () {
  try {
    const response = await fetch(localhost + 'amenities/');
    const data = await response.json();
    const aminitiesTemplate = amenitiesLayer(data);
    $('.amenities .popover').html(aminitiesTemplate);
  } catch (e) {
    console.error(e);
  }
}

function amenitiesLayer (amenities) {
  return amenities.reduce((acumulator, amenity) => `
  ${acumulator}
  <li><input type="checkbox" style="padding-left: 10px;" data-id="${amenity.id}" data-name="${amenity.name}">${amenity.name}</li>
  `, '');
}

async function placesList () {
  try {
    const headersRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    };
    const response = await fetch(localhost + 'places_search/', headersRequest);
    const data = await response.json();
    const placesTemplate = await placeLayer(data);
    $('.container .places').html('<h1>Places</h1>' + placesTemplate);
  } catch (e) {
    console.error(e);
  }
}

function placeTitle () {
  const title = ['<h1>Places</h1>'];
  return title.reduce((acumulator, one) => `
  ${acumulator}
  ${one}
  `);
}

function placeLayer (places) {
  return places.reduce((acumulator, place) => `
  ${acumulator}
  <article>
      <h2>${place.name}</h2>
      <div class="price_by_night">
          $ ${place.price_by_night}
      </div>
      <div class="information">
          <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
          </div>
          <div class="number_rooms">
              ${place.number_rooms} Room${place.number_rooms !== 1 ? 's' : ''}
          </div>
          <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
          </div>
      </div>
      <div class="user">
          <b>Owner:</b> ${(users[place.user_id])}
      </div>
      <div class="description">
          <p>${place.description}</p>
      </div>
  </article>
  `, '');
}
