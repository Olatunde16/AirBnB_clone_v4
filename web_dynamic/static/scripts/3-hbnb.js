// Simple JS Script to change state of checkboxes.

$(document).ready(function(){
  let amenitiesChecked = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
    // Join the names of the checked amenities and update the h4 tag
    $('.amenities h4').text(Object.values(amenitiesChecked).join(', '));
  });

//Get API Status
$.get('http://0.0.0.0:5001/api/v1/status/', (response) => {
  if (response.status === "OK") {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
}).fail(() => {
  $('div#api_status').removeClass('available');
});

// Request for places search
// Kind of low key want to change this to localhost rather than 0.0.0.0 ???
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  dataType: 'json',
  contentType: 'application/json',
  data: JSON.stringify({}), 
  success: function(places) { 
    const placesSection = $('.places'); 
    $.each(places, function(index, place) { 
      const article = `<article>
                        <div class="title_box">
                        <h2>${place.name}</h2>
                        <div>Price: $${place.price_by_night}</div>
                        </div>
                        <div class="information">
                          <div class="max_guest">${place.max_guest} Guests</div>
                          <div class="number_rooms">${place.number_rooms} Rooms</div>
                          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                        </div>
                        <div class="description">Description: ${place.description}</div>
                        </article>`;
      placesSection.append(article);
    });
  }
});
});