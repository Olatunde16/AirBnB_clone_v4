document.ready(function () {
  const HOST = 'http://127.0.0.1:5001';
  const amenities = {};
  const cities = {};
  const states = {};

  $('ul li input[type="checkbox"]').bind('change', (e) => {
    const element = e.target;
    let ct;
    switch (element.id) {
      case 'state_filter':
        ct = states;
        break;
      case 'city_filter':
        ct = cities;
        break;
      case 'amenity_filter':
        ct = amenities;
        break;
    }
    if (element.checked) {
      ct[element.dataset.name] = element.dataset.id;
    } else {
      delete ct[element.dataset.name];
    }
    if (element.id === 'amenity_filter') {
      $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
    } else {
      $('.locations h4').text(
        Object.keys(Object.assign({}, states, cities)).sort().join(', ')
      );
    }
  });

  // get status of API
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // fetch data about places
  $.post({
    url: `${HOST}/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      data.forEach((place) =>
        $('section.places').append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? 's' : ''
					}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? 's' : ''
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? 's' : ''
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
        )
      );
    },
    dataType: 'json'
  });

  // search places
  $('.filters button').bind('click', searchPlace);
  searchPlace();
});
