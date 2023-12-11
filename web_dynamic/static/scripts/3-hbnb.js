$(document).ready(function () {
  const $statusIcon = $('div#api_status');
  const statusCheckUrl = 'http://localhost:5001/api/v1/status/';
  const placesSearchUrl = 'http://localhost:5001/api/v1/places_search/';
  const $placesSectionTag = $('section.places');

  function newMaxGuests (guests) {
    if (guests !== 1) {
      return `<div class="max_guest">${guests} Guests</div>`;
    }

    return `<div class="max_guest">${guests} Guest</div>`;
  }

  function newRooms (rooms) {
    if (rooms !== 1) {
      return `<div class="number_rooms">${rooms} Bedrooms</div>`;
    }

    return `<div class="number_rooms">${rooms} Bedroom</div>`;
  }

  function newBathrooms (bathrooms) {
    if (bathrooms !== 1) {
      return `<div class="number_bathrooms">${bathrooms} Bathrooms</div>`;
    }

    return `<div class="number_bathrooms">${bathrooms} Bathroom</div>`;
  }

  function newArticleTitle (title, priceByNight) {
    return `<div class="title_box">
              <h2>${title}</h2>
              <div class="price_by_night">
                $${priceByNight}
              </div>
            </div>`;
  }

  function newArticleInfo (guests, rooms, bathrooms) {
    const placeMaxGuests = newMaxGuests(guests);
    const placeMaxRooms = newRooms(rooms);
    const placeMaxBathrooms = newBathrooms(bathrooms);
    return `<div class="information">
              ${placeMaxGuests}
              ${placeMaxRooms}
              ${placeMaxBathrooms}
            </div>`;
  }

  function newArticleDescription (description) {
    return `<div class="description">
              ${description}
            </div>`;
  }

  function newPlace (place) {
    const thisArticleTitle = newArticleTitle(place.name, place.price_by_night);
    const thisArticleInf = newArticleInfo(place.max_guest, place.number_rooms, place.number_bathrooms);
    const thisArticleDesc = newArticleDescription(place.description);
    return `<article>
              ${thisArticleTitle}
              ${thisArticleInf}
              ${thisArticleDesc}
            </article>`;
  }

  let amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });

  $.ajax({
    url: statusCheckUrl,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $statusIcon.addClass('available');
      } else {
        $statusIcon.removeClass('available');
      }
    }
  });

  $.ajax({
    url: placesSearchUrl,
    type: 'POST',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; ++i) {
        $placesSectionTag.append(newPlace(data[i]));
      }
    }
  });
});