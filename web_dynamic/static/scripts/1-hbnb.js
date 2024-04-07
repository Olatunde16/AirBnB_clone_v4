/* global $ */
// Wait for page DOM to load
$(document).ready(function () {
  // Initialize object/dictionary 'amenities' to store amenities
  const amenities = {};

  // Listen for checkbox input changes
  $('input[type="checkbox"]').change(function () {
    // Retrieve amenityID from the checkbox 'ID' attribute
    const amenityID = $(this).data('id');
    // If checked:
    if (this.checked) {
      amenities[amenityID] = true; // Store ID in object
    } else {
      delete amenities[amenityID]; // Remove ID from object
    }
    // Add amenityIDs that are stored as keys in dict into single string
    const updatedAmenities = Object.keys(amenities).join(', ');
    // Updates all h4 elements associated with amenities
    $('.amenities h4').text(updatedAmenities);
  });
});
