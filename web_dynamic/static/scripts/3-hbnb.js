$(document).ready(function() {
  $(document).ready(function() {
    // Creating an empty dictionary to hold amenities with their status
    let amenities = {};

    // Listening for changes on checkboxes
    $("input[type=checkbox]").change(function() {
      let amenityId = $(this).data('data-id');
      if ($(this).is(':checked')) {
        amenities[amenityId] = true;
      } else {
        delete amenities[amenityId];
      }

      // Update the list of amenities in the h4 tag
      let amenitiesList = Object.keys(amenities).join(", ");
      $('.amenities h4').text(amenitiesList);
    });

    let url = "http://0.0.0.0:5001/api/v1/places_search/";
    $.get(url, function(data) {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });

    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function(data) {
        const placesSection = $('.places');
        // Loop through the places data and create article tags
        data.forEach(place => {
          const article = $('<article></article>');
          article.html(`
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Rooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">${place.description}</div>
          `);
          placesSection.append(article);
        });
      },
      error: function(xhr, status, error) {
        console.error('Error fetching places:', error);
      }
    });
  });
});
