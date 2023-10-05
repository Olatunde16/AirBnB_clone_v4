$(document).ready(function () {
    // Initialize a variable to store selected Amenity IDs
    var selectedAmenities = {};

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
});
