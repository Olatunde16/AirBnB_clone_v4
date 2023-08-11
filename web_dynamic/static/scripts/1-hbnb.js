
#!/usr/bin/node 

$(document).ready(function() {
    const amenityIds = {}; // To store selected amenity IDs

    // Listen for changes on each input checkbox tag
    $('.amenity-checkbox').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).prop('checked')) {
            amenityIds[amenityId] = amenityName; // Add to the selected amenities
        } else {
            delete amenityIds[amenityId]; // Remove from the selected amenities
        }

        // Update the h4 tag with the list of selected amenities
        const selectedAmenities = Object.values(amenityIds).join(', ');
        $('.amenities h4').text('Amenities: ' + selectedAmenities);
    });
});
