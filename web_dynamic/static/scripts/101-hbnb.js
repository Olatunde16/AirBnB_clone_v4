/* global $ */
const amenities = {}; // Declare amenities object outside the $(document).ready() function
const states = {}; // Variable Dictionary to store State IDs
const cities = {}; // Variable Dictionary to store City IDs

$(document).ready(function () {
  function updateAmenities () {
    const amenityList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenityList);
  }

  function updateLocations () {
    const stateList = Object.values(states).join(', ');
    const cityList = Object.values(cities).join(', ');
    $(' .locations h4').text(stateList);
    $(' .locations h4').text(cityList);
  }

  $('input[type="checkbox"]').change(function () {
    const itemId = $(this).data('id');
    const itemType = $(this).data('type');
    const itemName = $(this).data('name');

    if ($(this).is(':checked')) {
      if (itemType === 'amenity') {
        amenities[itemId] = itemName;
      } else if (itemType === 'state') {
        states[itemId] = itemName;
      } else if (itemType === 'city') {
        cities[itemId] = itemName;
      }
    } else {
      if (itemType === 'amenity') {
        delete amenities[itemId];
      } else if (itemType === 'states') {
        delete states[itemId];
      } else if (itemType === 'cities') {
        delete cities[itemId];
      }
    }

    updateAmenities();
    updateLocations();
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $('button').click(function () {
    const amenityIds = Object.keys(amenities); // Use the existing amenities variable here
    const stateIds = Object.keys(states);
    const cityIds = Object.keys(cities);

    const requestData = {
      amenities: amenityIds,
      states: stateIds,
      cities: cityIds
    };

    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (data) {
        $(' .places').empty();

        for (const place of data) {
          const article = $('<article></article>');

          const titleBox = $('<div class="title_box"></div>');
          titleBox.append($('<h2></h2>').text(place.name));
          titleBox.append($('<div class="price_by_night"></div>').text('$' + place.price_by_night));
          article.append(titleBox);

          const information = $('<div class="information"></div>');
          information.append($('<div class="max_guest"></div>').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
          information.append($('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
          information.append($('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
          article.append(information);

          article.append($('<div class="description"></div>').text(place.description));

          $('.places').append(article);
        }
      }
    });
  });
});

$('span').click(function () {
  const reviewsText = $(this).text();

  if (reviewsText === 'hide') {
    $('.review').remove();
    $(this).text('Show');
  } else {
    $.get('http://0.0.0.0:5001/api/v1/places_search/', function (data) {
      for (const place of data) {
        for (const review of place.reviews) {
          const reviewElement = $('<div class="review"></div>');
          reviewElement.append($('<h3></h3>').text(review.user));
          reviewElement.append($('<p></p>').text(review.text));
          $('.reviews').append(reviewElement);
        }
      }
      $(this).text('Hide');
    });
  }
});
