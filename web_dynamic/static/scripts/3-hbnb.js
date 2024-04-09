$(document).ready(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      data.forEach(function (place) {
        const article = `<article>
                                  <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                  </div>
                                  <div class="information">
                                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                  </div>
                                  <div class="user">
                                    <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                                  </div>
                                  <div class="description">
                                    ${place.description}
                                  </div>
                                </article>`;
        $('section.places').append(article);
      });
    }
  });
});
