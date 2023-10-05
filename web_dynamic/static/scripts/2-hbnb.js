$(document).ready(function () {
    // Initialize a variable to store selected Amenity IDs
    var selectedAmenities = {};
    var dataURL = 'http://0.0.0.0:5001/api/v1/status/';

    // Listen for changes on checkboxes
    $('input[type="checkbox"]').change(function () {
        // Check if the checkbox is checked
        if ($(this).prop('checked')) {
            // Get Amenity ID and name from data attributes
            var amenityId = $(this).data('id');
            var amenityName = $(this).data('name');

            // Store Amenity ID in the selectedAmenities object
            selectedAmenities[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove Amenity ID from the selectedAmenities object
            var amenityId = $(this).data('id');
            delete selectedAmenities[amenityId];
        }

        // Update the <h4> tag inside the div Amenities with the list of Amenities checked
        var amenityList = Object.values(selectedAmenities).join(', ');
        $('div.Amenities h4').text(amenityList);
    });


    $.get(dataURL, function (data, textStatus) {
        let apistatusDiv = $('div#api_status');
        console.log(textStatus);
        if (textStatus === 'success') {
            apistatusDiv.addClass('available');
        }
        else {
            apistatusDiv.removeClass('available');
        }
    })    
});
