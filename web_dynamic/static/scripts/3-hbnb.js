$(document).ready(function () {
  const amenities = {};

  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }

    const amenitiesList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify({}), (data) => {
    const sectionPlaces = $('section.places');

    data.forEach(place => {
      const article = `<article><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${place.number_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div></div><div class="description">${place.description}</div></article>`;
      sectionPlaces.append(article);
    });
  }).fail((error) => {
    console.error('Error fetching places:', error);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    const apiStatus = $('div#api_status');

    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
});
