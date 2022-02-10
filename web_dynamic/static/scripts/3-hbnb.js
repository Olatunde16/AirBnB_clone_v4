const $ = window.jQuery;
const listAmenities = {};
window.onload = async function () {
  await amenitiesList();
  selectAmenities();
  apiAvailabe();
  placesList();
};

async function apiAvailabe () {
  $.get('http://172.24.177.23:5001/api/v1/status/', function (data, status) {
    console.log(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
}

// states

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
      const response = await fetch('http://172.24.177.23:5001/api/v1/amenities');
      const data = await response.json();
      const aminitiesTemplate = amenitiesLayer(data);
      $('.popover').html(aminitiesTemplate);
  } catch(e) {
      console.error(e);
  }
}

function amenitiesLayer(amenities) {
  return amenities.reduce((acumulator, amenity) => `
  ${acumulator}
  <li><input type="checkbox" style="padding-left: 10px;" data-id="${amenity.id}" data-name="${amenity.name}">${amenity.name}</li>
  `, '');
}

// places

async function placesList () {
  try {
  const headersRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  }
  const response = await fetch('http://172.24.177.23:5001/api/v1/places_search/', headersRequest);
  const data = await response.json();
  placeLayer(data);
  } catch(e) {
    console.error(e);
  }
}

function placeLayer (places) {
  console.log(places);
  return places.reduce( async (acumulator, place) => `
  ${acumulator}
  <article>
      <h2>${ place.name }</h2>
      <div class="price_by_night">
          ${place.price_by_night}
      </div>
      <div class="information">
          <div class="max_guest">
              ${place.max_guest}
          </div>
          <div class="number_rooms">
              ${place.number_rooms}
          </div>
          <div class="number_bathrooms">
              ${place.number_bathrooms}
          </div>
      </div>
      <div class="user">
          <b>Owner:</b> ${await userName(place)}
      </div>
      <div class="description">
          <p>${place.description}</p>
      </div>

      <div class="amenities">
          <h2>Amenities</h2>
          <ul>
              ${amenitiesAvailables(await amenitiesFromPlace(place.id))}
          </ul>
          <div class=reviews>
              <h2>2 Reviews</h2>
              <ul>
                  <li>
                      ${reviewsForPlace(await reviewsFromPlace(place.id))}
                      <h3>From Bob Dylan the 27th January 2017</h3>
                      <p>Runshi is an epic host. Nothing more I can say. 5 star!</p>
                  </li>
                  <li>
                      <h3>From Connor the 4th January 2017</h3>
                      <p>Highly recommended!</p>
                  </li>
              </ul>
          </div>
      </div>
  </article>
  `, '')
}


async function userName (place) {
  const response = await fetch('http://172.24.177.23:5001/api/v1/users/' + place.user_id);
  return (await response.json()).name
}


// amenities in place

async function amenitiesFromPlace (placeId) {
  const response = await fetch('http://172.24.177.23:5001/api/v1/places/' + placeId +'/amenities');
  return (await response.json())
}

function amenitiesAvailables (amenities) {
  return amenities.reduce((acumulator, amenity) => `
  ${acumulator}
  <li class="${amenity.name}">${amenity.name}</li>
  `, '');
}

// reviews in place

async function reviewsFromPlace (placeId) {
  const response = await fetch('http://172.24.177.23:5001/api/v1/places/' + placeId +'/reviews');
  return (await response.json())
}

function reviewsForPlace (reviews) {
  return reviews.reduce((acumulator, review) => console.log(review));
}
