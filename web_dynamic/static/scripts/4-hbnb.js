$(document).ready(function(){
    // Function to handle button click event
    $('#apply_filters').click(function(){
        // Array to store checked amenities
        var amenities = [];
        
        // Loop through each checkbox and add checked amenities to the array
        $('input[type=checkbox]:checked').each(function(){
            amenities.push($(this).data('id'));
        });
        
        // Make a POST request with the list of checked amenities
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: "application/json",
            data: JSON.stringify({ amenities: amenities }),
            success: function(data) {
                // Clear existing places
                $('section.places').empty();
                
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
});
