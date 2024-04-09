$(document).ready(function () {
    const checkingAmenities = {};
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            checkingAmenities[this.dataset.id] = this.dataset.name;
        } else {
            delete checkingAmenities[this.dataset.id];
        }

        const amenityNames = Object.values(checkingAmenities);
        $('div.amenities h4').text(amenityNames.join(', '));
    });

    console.log("Checking API status...");
    $.ajax({
        url: 'http://localhost:5001/api/v1/status/',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.status === 'OK') {
                $('div#api_status').addClass('available');
            } else {
                $('div#api_status').removeClass('available');
            }
        },
        error: function() {
            $('div#api_status').removeClass('available');
            console.error("Failed to load resource: Check the URL and server status.");
        }
    });

    console.log("Fetching places...");
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (response) {
            console.log("Received places data:", response);
            if (response.length === 0) {
                console.log("No places found.");
                return;
            }
            response.forEach(function (place) {
                console.log("Processing place:", place.name);
                var html = '<article>' +
                    '<div class="headline">' +
                    '<div class="place_name">' +
                    '<h2>' + place.name + '</h2>' +
                    '</div>' +
                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="max_guest">' +
                    '<div class="guest_icon"></div>' +
                    '<p>' + place.max_guest + ' Guests</p>' +
                    '</div>' +
                    '<div class="number_rooms">' +
                    '<div class="bed_icon"></div>' +
                    '<p>' + place.number_rooms + ' Bedroom</p>' +
                    '</div>' +
                    '<div class="number_bathrooms">' +
                    '<div class="bath_icon"></div>' +
                    '<p>' + place.number_bathrooms + ' Bathroom</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="user"><b>Owner</b>: ' + place.user_first_name + ' ' + place.user_last_name + '</div>' +
                    '<div class="description">' + place.description + '</div>' +
                    '</article>';
                $('.places').append(html);
                console.log("Appended place to DOM:", place.name);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching places:", error);
        }
    });
});
