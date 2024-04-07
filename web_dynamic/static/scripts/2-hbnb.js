$(document).ready(function() {
  $(document).ready(function() {
    // Creating an empty dictionary to hold amenities with their status
    let amenities = {};

    // Listening for changes on checkboxes
    $("input[type=checkbox]").change(function() {
        let amenityId = $(this).data('data-id');
        if ($(this).is(':checked')) {
            amenities[amenityId] = true;
        } else {
            delete amenities[amenityId];
        }

        // Update the list of amenities in the h4 tag
        let amenitiesList = Object.keys(amenities).join(", ");
        $('.amenities h4').text(amenitiesList);
    }); 

    let url = "http://0.0.0.0:5001/api/v1/status/";
    $.get(url, function(data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });
});
