$(document).ready(function () {
  const checkedAmenities = {};

  $('input').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    method: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $.post({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: '{}',
    success: function (res) {
      const placesSection = $('section.places').empty();

      res.forEach(place => {
        const article = $('<article>').addClass('place');

        const titleBox = $('<div>').addClass('title_box');
        titleBox.append(
          $('<h2>').text(place.name),
          $('<div>').addClass('price_by_night').text('$' + place.price_by_night)
        );

        const information = $('<div>').addClass('information');
        information.append(
          $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')),
          $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')),
          $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''))
        );

        const description = $('<div>').addClass('description').html(place.description);

        article.append(titleBox, information, description);
        placesSection.append(article);
      });
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
