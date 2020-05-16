document.addEventListener('DOMContentLoaded', function () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      let numberBaths = '';
      let numberGuests = '';
      let numberRooms = '';
      for (const place of data) {
        if (`${place.number_bathrooms}` > 1) {
          numberBaths = 'Bathrooms';
        } else {
          numberBaths = 'Bathroom';
        }
        if (`${place.max_guest}` > 1) {
          numberGuests = 'Guests';
        } else {
          numberGuests = 'Guest';
        }
        if (`${place.number_rooms}` > 1) {
          numberRooms = 'Rooms';
        } else {
          numberRooms = 'Room';
        }
        const cont = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} ${numberGuests}</div>
            <div class="number_rooms">${place.number_rooms} ${numberRooms}</div>
            <div class="number_bathrooms">${place.number_bathrooms} ${numberBaths}</div>
          </div>
          <div class="description">
            ${place.description};
          </div>
        </article>`;
        $('SECTION.places').append(cont);
      }
    }
  });
});
