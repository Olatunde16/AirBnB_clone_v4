#!/usr/bin/nodejs
$(document).ready(function() {
    var selectedAmenities = {};

    $('.amenity').change(function() {
        var amenityId = $(this).val();

        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = true;
        } else {
            delete selectedAmenities[amenityId];
        }

        updateAmenitiesList();
    });

    function updateAmenitiesList() {
        var amenitiesList = Object.keys(selectedAmenities).map(function(amenityId) {
            return "Amenity " + amenityId;
        }).join(", ");

        $('#Amenities h4').text("Amenities: " + amenitiesList);
    }
});