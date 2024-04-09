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
});
