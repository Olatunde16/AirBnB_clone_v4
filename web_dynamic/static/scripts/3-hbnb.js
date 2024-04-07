$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
	 const template = `<article>
        <div class="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">
        ${place.price_by_night} Dollars
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <br />
        ${place.max_guest} Guest Maximum
          </div>
          <div class="number_rooms">
        <br />
        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <br />
        ${place.number_bathrooms} Bathrooms
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`;
      $('section.places').append(template);
      }
    }
  });
