/* global $ */
// Wait for page DOM to load
$(document).ready(function () {
    // Initialize object/dictionary 'amenities' to store amenities
    const amenities = {};
  
    // Listen for checkbox input changes
    $('input[type="checkbox"]').change(function () {
      // Retrieve amenityID and amenityName from the checkbox 'ID' attribute
      const amenityID = $(this).data('id');
      const amenityName = $(this).data('name');
      // If checked:
      if (this.checked) {
        // Attach amenityID to its corresponding name
        amenities[amenityID] = amenityName;
      } else {
        delete amenities[amenityID]; // Remove ID from object
      }
      // Add amenityNames that are stored in dict into single string
      const updatedAmenities = Object.values(amenities).join(', ');
      // Updates all h4 elements associated with amenities
      $('.amenities h4').text(updatedAmenities);
    });

    const apiURL = 'http://localhost:5001/api/v1/status/';
    // Request API status
    $.get(apiURL, function(data) {
        console.log(data);
        if (data.status === 'OK') {
            // If API is running, change color of api_status on webpage
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
