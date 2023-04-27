#!/usr/bin/node

$(document).ready(function() {
    $.ajax(
        {
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: function (data) {
                console.log("API CHECK")
                if (data.status === 'OK') {
                    console.log("available")
                    $('#api_status').toggleClass('unavailable available');
                } 
            }
        }
    );

    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });
});
