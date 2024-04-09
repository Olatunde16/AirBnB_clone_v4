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
document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    const apiStatus = document.querySelector('#api_status');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'OK') {
                apiStatus.classList.add('available');
            } else {
                apiStatus.classList.remove('available');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});