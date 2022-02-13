const $ = window.jQuery;
const fullJson = {};
const listAmenities = {};
const listStates = {};
const listCities = {};
const localhost = 'http://localhost:5001/api/v1/';

window.onload = async function () {
  apiAvailabe();
  await statesList();
  await amenitiesList();
  selectAmenities();
  selectStates();
  selectCities();
  clickEvent();
  buildJson();
  placesList();
};

function clickEvent () {
  $(':button').click(function () { buildJson(); });
}

function buildJson () {
  fullJson.states = Object.keys(listStates);
  fullJson.cities = Object.keys(listCities);
  fullJson.amenities = Object.keys(listAmenities);
  placesList();
}

async function apiAvailabe () {
  $.get(localhost + 'status', function (data, status) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
}

// selectors functions

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

function selectStates () {
  $('.state input[type=checkbox]').change(function () {
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      listStates[id] = $(this).attr('data-name');
    } else {
      delete listStates[id];
    }
    $('.locations h4').text(Object.values(listStates).join(', '));
  });
}

function selectCities () {
  $('.city input[type=checkbox]').change(function () {
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      listCities[id] = $(this).attr('data-name');
    } else {
      delete listCities[id];
    }
  });
}

// list functions

async function statesList () {
  try {
    const response = await fetch(localhost + 'states/');
    const data = await response.json();
    const statesTemplate = await stateLayer(data);
    $('.locations .popover').html(statesTemplate);
  } catch (e) {
    console.error(e);
  }
}

async function citiesList (id) {
  const response = await fetch(localhost + '/states/' + id + '/cities');
  const cities = await response.json();
  return cities.reduce((acumulator, city) => `
  ${acumulator}
  <li class="city"><input type="checkbox" style="padding-left: 10px;" data-id="${city.id}" data-name="${city.name}">${city.name}</li>
  `, '');
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

async function placesList () {
  try {
    const headersRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fullJson)
    };
    const response = await fetch(localhost + 'places_search/', headersRequest);
    const data = await response.json();
    const placesTemplate = await placeLayer(data);
    $('.container .places').html('<h1>Places</h1>' + placesTemplate);
  } catch (e) {
    console.error(e);
  }
}

// layers functions

async function stateLayer (states) {
  const stateList = [];
  for (let i = 0; i < states.length; i++) {
    stateList.push(`<li><h2 class="state"><input type="checkbox" style="padding-left: 10px;" data-id="${states[i].id}" data-name="${states[i].name}">${states[i].name}</h2></li>
    <li>
    <ul>
        ${await citiesList(states[i].id)}
      </ul>
    </li>`);
  }
  return stateList.join('');
}

function amenitiesLayer (amenities) {
  return amenities.reduce((acumulator, amenity) => `
  ${acumulator}
  <li><input type="checkbox" style="padding-left: 10px;" data-id="${amenity.id}" data-name="${amenity.name}">${amenity.name}</li>
  `, '');
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

// function to get a user

const users = {};
$.getJSON(localhost + '/users', (data) => {
  for (const el of data) {
    users[el.id] = el.first_name + ' ' + el.last_name;
  }
});
