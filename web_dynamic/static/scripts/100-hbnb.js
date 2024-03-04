dy(function(){
    // Variable to store checked states
    var checkedStates = {};
    
    // Variable to store checked cities
    var checkedCities = {};
    
    // Function to handle checkbox changes
    $('input[type=checkbox]').change(function(){
        var id = $(this).data('id');
        var name = $(this).data('name');
        
        // Check if checkbox belongs to a state or city
        if ($(this).parent().parent().hasClass('states')) {
            if ($(this).is(':checked')) {
                checkedStates[id] = name;
            } else {
                delete checkedStates[id];
            }
        } else if ($(this).parent().parent().hasClass('cities')) {
            if ($(this).is(':checked')) {
                checkedCities[id] = name;
            } else {
                delete checkedCities[id];
            }
        }
        
        // Update Locations h4 tag with list of checked states and cities
        var locations = '';
        $.each(checkedStates, function(id, name){
            locations += name + ', ';
        });
        $.each(checkedCities, function(id, name){
            locations += name + ', ';
        });
        locations = locations.slice(0, -2); // Remove trailing comma and space
        $('div.locations h4').text(locations);
    });
    
    // Function to handle button click event
    $('#apply_filters').click(function(){
        // Combine checked states and cities
        var filters = {
            amenities: [], // Assume amenities are already handled in another script
            states: checkedStates,
            cities: checkedCities
        };
        
        // Make a POST request with the list of checked amenities, states, and cities
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            contentType: "application/json",
            data: JSON.stringify(filters),
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
