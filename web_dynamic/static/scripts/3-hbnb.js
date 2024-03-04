$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(data) {
            // Loop through the result and create article tags for each place
            $.each(data, function(index, place) {
                var article = '<article>' +
                                  '<div class="title_box">' +
                                      '<h2>' + place.name + '</h2>' +
                                      '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                  '</div>' +
                                  '<div class="information">' +
                                      '<div class="max_guest">' + place.max_guest + ' Guests</div>' +
                                      '<div class="number_rooms">' + place.number_rooms + ' Rooms</div>' +
                                      '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div>' +
                                  '</div>' +
                              '</article>';
                $('section.places').append(article);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
