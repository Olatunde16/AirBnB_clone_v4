$(document).ready(function() {
    // Creating an empty dictionary to hold amenities with their status
    let amenities = {};

    // Listening for changes on checkboxes
    $("input[type=checkbox]").change(function() {
        let amenityId = $(this).data('id');
        if ($(this).is(':checked')) {
            amenities[amenityId] = true;
        } else {
            delete amenities[amenityId];
        }

        // Update the list of amenities in the h4 tag
        let amenitiesList = Object.keys(amenities).join(", ");
        $('.amenities h4').text(amenitiesList);
    });
});
