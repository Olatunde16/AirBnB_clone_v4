// Simple JS Script to change state of checkboxes.

// Age old question. Do we display ALL the data in our database,
// And then minimize data when searched? The more data we have,
// The slower it is to load... 

// I went ahead and decided to go with, load all data, because
// otherwise the user will sit here thinking we don't have data...

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

function loadPlaces(amenities = {}) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(amenities), 
      success: function(places) { 
        const placesSection = $('.places'); 
        placesSection.empty();
        $.each(places, function(index, place) { 
          const article = `<article>
                            <div class="title_box">
                              <h2>${place.name}</h2>
                              <div class="price_by_night">\$${place.price_by_night}</div>
                            </div>

                            <div class="information">
                              <div class="max_guest">${place.max_guest} Guests</div>
                              <div class="number_rooms">${place.number_rooms} Rooms</div>
                              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                            </div>
                            <div class="description">${place.description}</div>
                          </article>`;
          placesSection.append(article);
        });
      }
    });
  }

  // Initially load all places so user doesn't think our
  // AirBnB isn't loading.
  loadPlaces();

  // Event listener for checkboxes
  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenitiesChecked[$(this).data('id')];
    }
  });

// Event listener for the search button
  $('button').click(function() {
    loadPlaces({amenities: Object.keys(amenitiesChecked)});
  });
});